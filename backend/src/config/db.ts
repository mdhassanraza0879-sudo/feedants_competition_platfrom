import mongoose from 'mongoose';
import { ENV } from './env';

let mongoMemoryServer: any = null;

export const connectDB = async (): Promise<void> => {
  try {
    if (ENV.MONGODB_URI === 'memory') {
      console.log('⚡ Using mongodb-memory-server (zero-config in-memory database)...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const uri = mongoMemoryServer.getUri();
      await mongoose.connect(uri);
      console.log(`✅ In-memory MongoDB connected successfully at ${uri}`);
      return;
    }

    // Try connecting to provided MONGODB_URI
    console.log(`Connecting to MongoDB at ${ENV.MONGODB_URI}...`);
    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // 5s timeout before falling back
    });
    console.log(`✅ MongoDB connected successfully to ${ENV.MONGODB_URI}`);
  } catch (error: any) {
    console.warn(`⚠️ Failed to connect to MongoDB URI (${ENV.MONGODB_URI}): ${error.message}`);
    console.log('🔄 Falling back to mongodb-memory-server so the backend runs seamlessly without manual MongoDB installation...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const uri = mongoMemoryServer.getUri();
      await mongoose.connect(uri);
      console.log(`✅ Fallback In-memory MongoDB connected successfully at ${uri}`);
    } catch (memError: any) {
      console.error('❌ Failed to initialize in-memory MongoDB:', memError);
      process.exit(1);
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
