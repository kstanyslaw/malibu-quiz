import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { OneQuestionAnswer, PersonalInfo, Question, StoredAnswers, UserAnswers } from '@common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private readonly firestore: Firestore = inject(Firestore);
  collection: CollectionReference ;

  constructor() {
    this.collection = collection(this.firestore, 'answers');
  }

  async addUserAnswers(questionIds: string[]) {
    const personalInfo: PersonalInfo = JSON.parse(localStorage.getItem('personalInfo') as string);
    const userAnswers: UserAnswers = {
      personalInfo: personalInfo,
      results: questionIds.map(id => {
        const answerInString = localStorage.getItem(id);
        const answerObject: StoredAnswers = JSON.parse(answerInString as string);
        return {
          questionId: id,
          ...answerObject
        }
      })
    };
    const newUserAnswers = await addDoc(this.collection, <UserAnswers> userAnswers);
    return newUserAnswers;
  }

  saveAnswerLS(question: Question, answer: string | string[]) {
    const value: StoredAnswers = {
      questionType: question.type,
      questionTitle: question.title,
      answer: answer
    }
    if(!!question?.options) {
      value.questionOptions = question.options;
    }
    localStorage.setItem(question.id as string, JSON.stringify(value));
  }

  savePersonalInfoLS(name: string, phone: string) {
    const value = { name, phone };
    localStorage.setItem('personalInfo', JSON.stringify(value));
  }

  saveCurrentIndex(currentQuestionIndex: number) {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
  }

  saveQuizCompletedState() {
    localStorage.setItem('quizCompleted', true.toString());
  }
}
