import { inject, Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { addDoc, collection, collectionData, CollectionReference, Firestore, deleteDoc, doc } from "@angular/fire/firestore";
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
    return collectionData(this.collection).pipe(
      map(data => data as Question[]),
      take(1)
    );
  }

  async deleteQuestion(questionId: string) {
    try {
      const documentRef = doc(this.firestore, 'questions', questionId);
      await (documentRef);
    } catch (error) {
      throw error;
    }
  }
}
