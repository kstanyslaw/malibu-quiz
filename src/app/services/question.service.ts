import { inject, Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  deleteDoc,
  updateDoc,
  getDoc,
  doc
} from "@angular/fire/firestore";
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly firestore: Firestore = inject(Firestore);
  collection: CollectionReference ;

  constructor() {
    this.collection = collection(this.firestore, 'questions');
  }

  async addQuestion(question: Question) {
    const newDocument = await addDoc(this.collection, <Question> question);
    return newDocument;
  }

  getQuestions() {
    return collectionData(this.collection, { idField: 'id' }).pipe(
      map(data => {
        return data as Question[];
      }),
      take(1)
    );
  }

  async deleteQuestion(questionId: string) {
    try {
      const documentRef = await doc(this.firestore, 'questions', questionId);
      await deleteDoc(documentRef);
    } catch (error) {
      throw error;
    }
  }

  async updateQuestion(question: Question, questionId: string) {
    try {
      const documentRef = await doc(this.firestore, 'questions', questionId);
      await updateDoc(documentRef, {...question});
      return await this.getQuestionById(questionId);
    } catch (error) {
      throw error;
    }
  }

  async getQuestionById(questionId: string): Promise<Question> {
    try {
      const documentRef = await doc(this.firestore, 'questions', questionId);
      return await getDoc(documentRef) as unknown as Question;
    } catch (error) {
      throw error;
    }
  }
}
