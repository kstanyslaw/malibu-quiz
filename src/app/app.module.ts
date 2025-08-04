import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDDovdZzVlQqH-I3_7hmwgO3T5sy-sKL-U",
      authDomain: "malibu-quiz.firebaseapp.com",
      databaseURL: "https://malibu-quiz-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "malibu-quiz",
      storageBucket: "malibu-quiz.firebasestorage.app",
      messagingSenderId: "907083750415",
      appId: "1:907083750415:web:84c925badbc6fe66c2977a",
      measurementId: "G-9W03XCWP72"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
