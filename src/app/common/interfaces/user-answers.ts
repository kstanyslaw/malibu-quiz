export interface UserAnswers {
  userResultId?: string;
  createdAt: Date;
  personalInfo: PersonalInfo;
  results: OneQuestionAnswer[]
}

export interface PersonalInfo {
  name: string;
  phone: string;
}

export interface OneQuestionAnswer {
    questionId: string;
    questionType: string;
    questionTitle: string;
    questionOptions?: string [];
    answer: string | string[];
  }
