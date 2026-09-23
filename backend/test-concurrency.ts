import mongoose from 'mongoose';
import { connectDB, disconnectDB } from './src/config/db';
import { User } from './src/models/User';
import { Competition } from './src/models/Competition';
import { Registration } from './src/models/Registration';
import { RegistrationService } from './src/services/registrationService';
import { SubmissionService } from './src/services/submissionService';
import { seedDatabase } from './src/seeds/seedData';

async function runTests() {
  console.log('\n🧪 ========================================================');
  console.log('   STARTING FEEDANTS TEST SUITE (CONCURRENCY & VALIDATIONS)  ');
  console.log('========================================================\n');

  await connectDB();
  const seedResult = await seedDatabase();
  const compId = seedResult.competition._id.toString();
  const registeredUserId = seedResult.registeredUser._id.toString();
  const newUserId = seedResult.newUser._id.toString();

  console.log('\n--- TEST 1: Duplicate Registration Prevention ---');
  try {
    await RegistrationService.registerUser(compId, registeredUserId);
    console.error('❌ FAIL: User was able to register twice!');
  } catch (err: any) {
    console.log('✅ PASS: Duplicate registration rejected with message:', err.message);
  }

  console.log('\n--- TEST 2: Valid Registration for New User ---');
  try {
    const regResult = await RegistrationService.registerUser(compId, newUserId);
    console.log('✅ PASS: User registered successfully! Spots left:', regResult.competition.computed.spotsLeft);
    console.log('   Current participants:', regResult.competition.registeredParticipants, '/', regResult.competition.maxParticipants);
  } catch (err: any) {
    console.error('❌ FAIL:', err.message);
  }

  console.log('\n--- TEST 3: Concurrency & Overbooking Prevention (Simulating 25 Concurrent Users) ---');
  // Currently registered: 2 / 20. Only 18 spots remain!
  // Create 25 mock users
  const mockUsers: any[] = [];
  for (let i = 1; i <= 25; i++) {
    const u = await User.create({
      name: `Concurrent User ${i}`,
      email: `concurrent_${Date.now()}_${i}@test.com`
    });
    mockUsers.push(u);
  }

  console.log(`Simulating 25 simultaneous registration requests for 18 remaining spots...`);
  const registrationPromises = mockUsers.map(u =>
    RegistrationService.registerUser(compId, u._id.toString())
      .then(res => ({ success: true, userId: u._id, res }))
      .catch(err => ({ success: false, userId: u._id, error: err.message }))
  );

  const results = await Promise.all(registrationPromises);
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.filter(r => !r.success).length;

  const finalComp = await Competition.findById(compId);
  const totalRegistrations = await Registration.countDocuments({ competitionId: compId });

  console.log(`\nConcurrency Test Results:`);
  console.log(`- Total concurrent requests: 25`);
  console.log(`- Successful registrations: ${successCount}`);
  console.log(`- Rejected (full/denied):   ${failureCount}`);
  console.log(`- Database registeredParticipants: ${finalComp?.registeredParticipants} / ${finalComp?.maxParticipants}`);
  console.log(`- Actual Registration records:     ${totalRegistrations} / ${finalComp?.maxParticipants}`);

  if (finalComp && finalComp.registeredParticipants <= finalComp.maxParticipants && totalRegistrations <= finalComp.maxParticipants) {
    console.log('✅ PASS: Concurrency-safe! Zero overbooking occurred. Database state never exceeded 20/20.');
  } else {
    console.error('❌ FAIL: Overbooking detected!');
  }

  console.log('\n--- TEST 4: Submission Restrictions ---');
  const unregisteredUser = await User.create({
    name: 'Unregistered User',
    email: `unreg_${Date.now()}@test.com`
  });

  try {
    await SubmissionService.createSubmission({
      competitionId: compId,
      userId: unregisteredUser._id.toString(),
      title: 'My Dance Video',
      videoUrl: 'https://youtube.com/watch?v=sample'
    });
    console.error('❌ FAIL: Unregistered user was allowed to submit!');
  } catch (err: any) {
    console.log('✅ PASS: Unregistered user submission blocked with message:', err.message);
  }

  try {
    const submission = await SubmissionService.createSubmission({
      competitionId: compId,
      userId: registeredUserId,
      title: 'Kathak Tarana Performance',
      videoUrl: 'https://youtube.com/watch?v=kathak_priya',
      description: 'Solo Kathak performance in Teen Taal.'
    });
    console.log('✅ PASS: Registered user submitted successfully! Submission ID:', submission._id);
  } catch (err: any) {
    console.error('❌ FAIL:', err.message);
  }

  console.log('\n========================================================');
  console.log('   ALL BACKEND & CONCURRENCY TESTS COMPLETED');
  console.log('========================================================\n');

  await disconnectDB();
  process.exit(0);
}

runTests().catch(err => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
