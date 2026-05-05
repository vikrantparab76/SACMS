// Assessment types

export interface QuestionScoring {
  unscoredPractice: boolean;
  penaltyPoints: number;
  checkAnswerButton: boolean;
  checkAnswerAttempts: number;
  scoringType: 'Exact match' | 'Partial match' | 'Partial match per response';
  enableAutoScoring: boolean;
  minimumPointsIfAttempted: number;
}

export interface QuestionLayout {
  style: 'Standard' | 'Block' | 'Horizontal' | 'Inline';
  numberOfColumns: number;
  orientation: 'Vertical' | 'Horizontal';
  fontSize: 'Small' | 'Normal' | 'Large' | 'Extra large';
  stemNumeration: 'Numerical' | 'Uppercase' | 'Lowercase' | 'None';
}

export interface QuestionExtras {
  acknowledgements: string;
  distractorRationale: string;
  rubricReference: string;
  stimulus: string;
  instructorStimulus: string;
  sampleAnswer: string;
}

export interface GeneratedQuestion {
  id: string;
  title: string;
  questionText: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  status: 'published' | 'draft' | 'review';
  points: number;
  scoringType: string;
  tags: string[];
  // Additional settings
  scoring?: QuestionScoring;
  layout?: QuestionLayout;
  extras?: QuestionExtras;
}

export interface AssessmentConfig {
  topic: string;
  questionType: string;
  questionCount: number;
  courseName: string;
  contentArea: string;
}
