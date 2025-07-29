import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

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
    provideFirebaseApp(() => initializeApp({ projectId: "malibu-quiz",
    appId: "1:907083750415:web:2a6153ca3a6f9293c2977a",
    storageBucket: "malibu-quiz.firebasestorage.app",
    apiKey: "AIzaSyDDovdZzVlQqH-I3_7hmwgO3T5sy-sKL-U",
    authDomain: "malibu-quiz.firebaseapp.com",
    messagingSenderId: "907083750415",
    measurementId: "G-074TP22X2M" })),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent],
})
export class AppModule {}
