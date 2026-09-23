import { ICompetition, CompetitionStatus } from '../models/Competition';

export interface ComputedCompetitionDetails {
  computedStatus: CompetitionStatus | 'REGISTRATION_FULL';
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
}

export const computeCompetitionStatus = (
  competition: ICompetition,
  referenceDate: Date = new Date()
): ComputedCompetitionDetails => {
  const now = referenceDate.getTime();
  const regStart = new Date(competition.registrationStart).getTime();
  const regDeadline = new Date(competition.registrationDeadline).getTime();
  const subStart = new Date(competition.submissionStart).getTime();
  const subEnd = new Date(competition.submissionEnd).getTime();
  const resultDate = new Date(competition.resultDate).getTime();

  const spotsLeft = Math.max(0, competition.maxParticipants - competition.registeredParticipants);
  const isFull = spotsLeft <= 0;

  const hasRegistrationStarted = now >= regStart;
  const hasRegistrationEnded = now > regDeadline;
  const hasSubmissionStarted = now >= subStart;
  const hasSubmissionEnded = now > subEnd;
  const isCompleted = now >= resultDate;

  let computedStatus: CompetitionStatus | 'REGISTRATION_FULL' = 'REGISTRATION_OPEN';

  if (isCompleted) {
    computedStatus = 'COMPLETED';
  } else if (hasRegistrationEnded && !hasSubmissionEnded) {
    computedStatus = 'LIVE';
  } else if (isFull && !hasRegistrationEnded) {
    computedStatus = 'REGISTRATION_FULL';
  } else if (hasRegistrationEnded) {
    computedStatus = 'REGISTRATION_CLOSED';
  } else if (!hasRegistrationStarted) {
    computedStatus = 'UPCOMING';
  } else {
    computedStatus = 'REGISTRATION_OPEN';
  }

  const isRegistrationOpen =
    hasRegistrationStarted && !hasRegistrationEnded && !isFull;

  const isSubmissionOpen =
    hasSubmissionStarted && !hasSubmissionEnded;

  // Countdown seconds until registration deadline (0 if already passed)
  const registrationCountdownSeconds = Math.max(0, Math.floor((regDeadline - now) / 1000));

  return {
    computedStatus,
    spotsLeft,
    isFull,
    isRegistrationOpen,
    isSubmissionOpen,
    hasRegistrationStarted,
    hasRegistrationEnded,
    hasSubmissionStarted,
    hasSubmissionEnded,
    isCompleted,
    registrationCountdownSeconds
  };
};
