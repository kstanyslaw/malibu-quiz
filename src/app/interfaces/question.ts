export interface Question {
  id?: string;
  title: string;
  type: 'text' | 'radio' | 'checkbox';
  options?: string[];
  createdAt: Date;
  order: number;
}
