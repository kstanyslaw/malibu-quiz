export interface StoredAnswers {
  questionType: 'text' | 'radio' | 'checkbox';
  questionTitle: string;
  answer: string | string [];
  questionOptions?: string[];
}
