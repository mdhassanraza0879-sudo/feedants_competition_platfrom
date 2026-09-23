import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import competitionRoutes from './routes/competitionRoutes';
import registrationRoutes from './routes/registrationRoutes';
import submissionRoutes from './routes/submissionRoutes';
import userRoutes from './routes/userRoutes';
import seedRoutes from './routes/seedRoutes';
import { Competition } from './models/Competition';
import { seedDatabase } from './seeds/seedData';

const app: Application = express();

// 1. Core Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Request Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// 3. Health & API Root
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Feedants Competition API'
  });
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'Feedants Competition Platform API',
    version: '1.0.0',
    documentation: '/api/competitions',
    health: '/health'
  });
});

// 4. Mount API Routes
app.use('/api/competitions', competitionRoutes);
app.use('/api/competitions/:id', registrationRoutes);
app.use('/api/competitions/:id', submissionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seed', seedRoutes);

// 5. 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// 6. Centralized Error Handler
app.use(errorHandler);

// 7. Initialize Database & Start Server
const startServer = async () => {
  try {
    await connectDB();

    // Check if database needs auto-seeding
    const competitionCount = await Competition.countDocuments();
    if (competitionCount === 0) {
      console.log('📦 Database is empty. Automatically seeding with default Feedants competition data...');
      await seedDatabase();
    }

    app.listen(ENV.PORT, () => {
      console.log(`
🚀 =======================================================
   FEEDANTS COMPETITION API SERVER RUNNING
   Port:        ${ENV.PORT}
   Environment: ${ENV.NODE_ENV}
   Health:      http://localhost:${ENV.PORT}/health
   API:         http://localhost:${ENV.PORT}/api/competitions
   Seed:        http://localhost:${ENV.PORT}/api/seed
=======================================================
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
