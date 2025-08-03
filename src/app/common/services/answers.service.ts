import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { UserAnswers } from '@common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private readonly firestore: Firestore = inject(Firestore);
  collection: CollectionReference ;

  constructor() {
    this.collection = collection(this.firestore, 'answers');
  }

  async addUserAnswers(userAnswers: UserAnswers) {
    const newUserAnswers = await addDoc(this.collection, <UserAnswers> userAnswers);
    return newUserAnswers;
  }

  saveToLS(key: string, value: any) {
    localStorage.setItem(key, value);
  }
}
