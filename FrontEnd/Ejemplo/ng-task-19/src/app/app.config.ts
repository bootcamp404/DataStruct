import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "ng-task-19-7b92b", appId: "1:1026760612568:web:9f98f43637bd846cb795ad", storageBucket: "ng-task-19-7b92b.firebasestorage.app", apiKey: "AIzaSyCEyFpAbxajXqBfzZn0BdQxiZyElEpoEXE", authDomain: "ng-task-19-7b92b.firebaseapp.com", messagingSenderId: "1026760612568" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "ng-task-19-7b92b", appId: "1:1026760612568:web:9f98f43637bd846cb795ad", storageBucket: "ng-task-19-7b92b.firebasestorage.app", apiKey: "AIzaSyCEyFpAbxajXqBfzZn0BdQxiZyElEpoEXE", authDomain: "ng-task-19-7b92b.firebaseapp.com", messagingSenderId: "1026760612568" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
