import axios from 'axios';
import { Platform } from 'react-native';
import { ICompetition, IWinner, IReward, IReview, ISubmission, IUser, ApiResponse } from '../types';

// Intelligent default URL:
// - Web / localhost: http://localhost:5000
// - Android Emulator: http://10.0.2.2:5000
// - Configurable via custom IP if testing on physical device
const getBaseUrl = (): string => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname || 'localhost';
    return `http://${hostname}:5000`;
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000';
  }
  return 'http://localhost:5000';
};

export const API_BASE_URL = getBaseUrl();

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const competitionService = {
  // Fetch all competitions
  async getCompetitions(): Promise<ICompetition[]> {
    const res = await apiClient.get<ApiResponse<ICompetition[]>>('/api/competitions');
    return res.data.data;
  },

  // Fetch single competition with dynamic status and user state
  async getCompetitionById(id: string, userId?: string): Promise<{
    competition: ICompetition;
    computed: any;
    isRegistered: boolean;
    registrationDetails?: any;
    userSubmission?: any;
  }> {
    const params = userId ? { userId } : {};
    const res = await apiClient.get<ApiResponse<any>>(`/api/competitions/${id}`, { params });
    return res.data.data;
  },

  // Fetch previous winners
  async getWinners(competitionId: string): Promise<IWinner[]> {
    const res = await apiClient.get<ApiResponse<IWinner[]>>(`/api/competitions/${competitionId}/winners`);
    return res.data.data;
  },

  // Fetch rewards breakdown
  async getRewards(competitionId: string): Promise<IReward[]> {
    const res = await apiClient.get<ApiResponse<IReward[]>>(`/api/competitions/${competitionId}/rewards`);
    return res.data.data;
  },

  // Fetch reviews
  async getReviews(competitionId?: string): Promise<IReview[]> {
    const url = competitionId ? `/api/competitions/${competitionId}/reviews` : '/api/competitions/reviews';
    const res = await apiClient.get<ApiResponse<IReview[]>>(url);
    return res.data.data;
  },

  // Concurrency-safe atomic registration
  async register(competitionId: string, userId: string, paymentMethod = 'RAZORPAY_DEMO') {
    const res = await apiClient.post<ApiResponse<any>>(`/api/competitions/${competitionId}/register`, {
      userId,
      paymentMethod
    });
    return res.data;
  },

  // Submit competition entry
  async submitEntry(competitionId: string, payload: {
    userId: string;
    title: string;
    videoUrl: string;
    description?: string;
  }): Promise<ISubmission> {
    const res = await apiClient.post<ApiResponse<ISubmission>>(`/api/competitions/${competitionId}/submissions`, payload);
    return res.data.data;
  },

  // Fetch user submission
  async getUserSubmission(competitionId: string, userId: string): Promise<{ hasSubmitted: boolean; submission?: ISubmission }> {
    const res = await apiClient.get<ApiResponse<{ hasSubmitted: boolean; submission?: ISubmission }>>(
      `/api/competitions/${competitionId}/submissions`,
      { params: { userId } }
    );
    return res.data.data;
  },

  // Fetch demo users for user switcher
  async getUsers(): Promise<IUser[]> {
    const res = await apiClient.get<ApiResponse<IUser[]>>('/api/users');
    return res.data.data;
  },

  // Seed / reset database
  async seedDatabase(): Promise<any> {
    const res = await apiClient.post<ApiResponse<any>>('/api/seed');
    return res.data.data;
  }
};
