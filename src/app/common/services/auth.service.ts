import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
  authState,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly afAuth: Auth,
    private readonly router: Router
  ) {
    afAuth = getAuth();
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.afAuth, email, password);
      this.router.navigate(['/dashboard']);
      return userCredential
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  getCurrentUser(): Observable< User | null > {
    return authState(this.afAuth);
  }
}
