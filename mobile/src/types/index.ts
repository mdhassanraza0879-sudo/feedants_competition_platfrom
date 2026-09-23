export type CompetitionStatus =
  | 'UPCOMING'
  | 'REGISTRATION_OPEN'
  | 'REGISTRATION_CLOSED'
  | 'LIVE'
  | 'COMPLETED'
  | 'REGISTRATION_FULL';

export interface IJudge {
  name: string;
  role: string;
  experience: string;
  avatarUrl: string;
  introVideoUrl?: string;
}

export interface IJudgingParameter {
  parameter: string;
  weightage: number;
  description?: string;
}

export interface ICompetition {
  _id: string;
  title: string;
  category: string;
  type: string;
  certificateProvided: boolean;
  prizePool: number;
  entryFee: number;
  maxParticipants: number;
  registeredParticipants: number;
  registrationStart: string;
  registrationDeadline: string;
  submissionStart: string;
  submissionEnd: string;
  resultDate: string;
  judge: IJudge;
  about: string;
  judgingParameters: IJudgingParameter[];
  rules: string[];
  eligibility: string[];
  status: CompetitionStatus;
  disclaimer: string;
  referralLink: string;
  referralReward: number;
  computed?: {
    computedStatus: CompetitionStatus;
    spotsLeft: number;
    isFull: boolean;
    isRegistrationOpen: boolean;
    isSubmissionOpen: boolean;
    hasRegistrationStarted: boolean;
    hasRegistrationEnded: boolean;
    hasSubmissionStarted: boolean;
    hasSubmissionEnded: boolean;
    isCompleted: boolean;
    registrationCountdownSeconds: number;
  };
}

export interface IWinner {
  _id: string;
  competitionId: string;
  userName: string;
  position: string;
  prizeAmount?: number;
  videoThumbnail: string;
  videoUrl?: string;
  avatarUrl?: string;
  likesCount?: number;
}

export interface IReward {
  _id: string;
  competitionId: string;
  rank: number;
  title: string;
  amount: number;
  icon?: string;
}

export interface IReview {
  _id: string;
  competitionId?: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  competitionTitle?: string;
  createdAt: string;
}

export interface ISubmission {
  _id: string;
  competitionId: string;
  userId: string;
  title: string;
  videoUrl: string;
  description?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED';
  submittedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  referralCode?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: any;
}
