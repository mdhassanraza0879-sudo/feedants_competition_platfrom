import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db';
import { User } from '../models/User';
import { Competition } from '../models/Competition';
import { Registration } from '../models/Registration';
import { Winner } from '../models/Winner';
import { Reward } from '../models/Reward';
import { Review } from '../models/Review';
import { Submission } from '../models/Submission';

export const seedDatabase = async () => {
  console.log('🌱 Starting database seeding for Feedants Competition Platform...');

  // Clear existing collections
  await Promise.all([
    User.deleteMany({}),
    Competition.deleteMany({}),
    Registration.deleteMany({}),
    Winner.deleteMany({}),
    Reward.deleteMany({}),
    Review.deleteMany({}),
    Submission.deleteMany({})
  ]);

  // 1. Create Sample Users
  const registeredUser = await User.create({
    name: 'Priya Patel',
    email: 'priya@feedants.com',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    referralCode: 'PRIYA10'
  });

  const newUser = await User.create({
    name: 'Rahul Sharma',
    email: 'rahul@feedants.com',
    phone: '+91 91234 56789',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    referralCode: 'RAHUL10'
  });

  console.log('✅ Users seeded:');
  console.log(`   - Registered User: ${registeredUser.name} (ID: ${registeredUser._id})`);
  console.log(`   - New User: ${newUser.name} (ID: ${newUser._id})`);

  // 2. Dates setup (Aligned with screenshot: 1d 06h 28m 32s countdown)
  const now = new Date();
  const registrationStart = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000); // 4 days ago
  // Exactly 1 day, 6 hours, 28 minutes, 32 seconds from now
  const registrationDeadline = new Date(
    now.getTime() + (1 * 24 * 3600 + 6 * 3600 + 28 * 60 + 32) * 1000
  );
  const submissionStart = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
  const submissionEnd = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000); // 8 days from now
  const resultDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

  // 3. Create Main Competition: Feedants Classical Dance
  const competition = await Competition.create({
    title: 'Feedants Classical Dance',
    category: 'Dance',
    type: 'Multi-Win',
    certificateProvided: true,
    prizePool: 1500,
    entryFee: 99,
    maxParticipants: 20,
    registeredParticipants: 1, // 1/20 Booked, Only 19 spots left!
    registrationStart,
    registrationDeadline,
    submissionStart,
    submissionEnd,
    resultDate,
    judge: {
      name: 'Hassan Raza',
      role: 'Professional Kathak Dancer',
      experience: '12+ Years of Experience',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    about:
      'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.\n\nWhether you specialize in Kathak, Bharatanatyam, Odissi, or Kuchipudi, this stage is designed for performers who want to elevate their craft and receive direct feedback from industry masters. Top performers receive cash prizes, verified digital certificates, and feature spotlights across Feedants platforms.',
    judgingParameters: [
      {
        parameter: 'Rhythm & Timing (Taal)',
        weightage: 30,
        description: 'Precision of footwork, rhythm synchronization, and mastery of tempo.'
      },
      {
        parameter: 'Choreography & Abhinaya',
        weightage: 30,
        description: 'Facial expressions, emotive depth, and storytelling through classical movements.'
      },
      {
        parameter: 'Costume & Presentation',
        weightage: 20,
        description: 'Authenticity of traditional classical attire, makeup, and stage demeanor.'
      },
      {
        parameter: 'Technical Precision (Mudra)',
        weightage: 20,
        description: 'Accuracy of hand gestures, postures, balance, and transitions.'
      }
    ],
    rules: [
      'Video duration must be between 2 to 5 minutes.',
      'Solo performances only. No group entries allowed.',
      'Original classical or semi-classical music must be used without copyright infringements.',
      'Continuous one-shot video recording without cuts or post-production video effects.',
      'Full body must remain visible in frame throughout the performance.',
      'Only contributions from paid participants will be considered for judging.'
    ],
    eligibility: [
      'Open to participants of all age groups worldwide.',
      'Both beginner and experienced classical dancers are welcome.',
      'Must register before the registration deadline.'
    ],
    status: 'REGISTRATION_OPEN',
    disclaimer: 'Only contributions from paid participants will be considered for judging.',
    referralLink: 'https://feedants.com/r/referral123',
    referralReward: 10
  });

  console.log(`✅ Competition created: ${competition.title} (ID: ${competition._id})`);

  // 4. Create Registration for Priya Patel (1 / 20 Booked)
  const registration = await Registration.create({
    userId: registeredUser._id,
    competitionId: competition._id,
    status: 'CONFIRMED',
    paymentStatus: 'COMPLETED',
    amountPaid: 99,
    transactionId: 'pay_demo_987654321',
    registeredAt: new Date(now.getTime() - 2 * 60 * 60 * 1000)
  });

  console.log(`✅ Initial registration created: ${registration._id}`);

  // 5. Create Previous Winners
  const winnersData = [
    {
      competitionId: competition._id,
      userName: 'Riya Shah',
      position: '1st Winner',
      prizeAmount: 550,
      videoThumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      likesCount: 142
    },
    {
      competitionId: competition._id,
      userName: 'Aarav Mehta',
      position: '1st Winner',
      prizeAmount: 550,
      videoThumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      likesCount: 98
    },
    {
      competitionId: competition._id,
      userName: 'Neha Verma',
      position: '2nd Winner',
      prizeAmount: 300,
      videoThumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      likesCount: 76
    },
    {
      competitionId: competition._id,
      userName: 'Ishita Chouhan',
      position: '3rd Winner',
      prizeAmount: 240,
      videoThumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
      likesCount: 64
    }
  ];
  await Winner.insertMany(winnersData);
  console.log('✅ Previous winners seeded (4 entries)');

  // 6. Create Rewards Breakdown (1st through 6th positions matching screenshot)
  const rewardsData = [
    { competitionId: competition._id, rank: 1, title: '1st Winner', amount: 550, icon: '🏆' },
    { competitionId: competition._id, rank: 2, title: '2nd Winner', amount: 300, icon: '🥈' },
    { competitionId: competition._id, rank: 3, title: '3rd Winner', amount: 240, icon: '🥉' },
    { competitionId: competition._id, rank: 4, title: '4th Winner', amount: 200, icon: '⭐' },
    { competitionId: competition._id, rank: 5, title: '5th Winner', amount: 130, icon: '⭐' },
    { competitionId: competition._id, rank: 6, title: '6th Winner', amount: 80, icon: '⭐' }
  ];
  await Reward.insertMany(rewardsData);
  console.log('✅ Rewards breakdown seeded (6 positions)');

  // 7. Create User Reviews
  const reviewsData = [
    {
      competitionId: competition._id,
      userName: 'Ananya Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      comment: 'Participating in Feedants dance competition was an incredible experience! The judging feedback from Hassan sir was genuinely insightful.',
      competitionTitle: 'Feedants Classical Dance'
    },
    {
      competitionId: competition._id,
      userName: 'Rohan Gupta',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 5,
      comment: 'Very smooth registration and prompt prize transfer directly via UPI. Highly recommended for aspiring artists!',
      competitionTitle: 'Feedants Classical Dance'
    },
    {
      competitionId: competition._id,
      userName: 'Sneha Iyer',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4,
      comment: 'Great platform for classical dancers. The community is very supportive and the digital certificate is verifiable.',
      competitionTitle: 'Feedants Classical Dance'
    }
  ];
  await Review.insertMany(reviewsData);
  console.log('✅ Reviews seeded (3 entries)');

  console.log('🎉 Seeding completed successfully!');
  return {
    competition,
    registeredUser,
    newUser
  };
};

if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      await disconnectDB();
      process.exit(0);
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    }
  })();
}
