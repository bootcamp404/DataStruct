import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({ projectId: "ng-task-19-7b92b", appId: "1:1026760612568:web:9f98f43637bd846cb795ad", storageBucket: "ng-task-19-7b92b.firebasestorage.app", apiKey: "AIzaSyCEyFpAbxajXqBfzZn0BdQxiZyElEpoEXE", authDomain: "ng-task-19-7b92b.firebaseapp.com", messagingSenderId: "1026760612568" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "ng-task-19-7b92b", appId: "1:1026760612568:web:9f98f43637bd846cb795ad", storageBucket: "ng-task-19-7b92b.firebasestorage.app", apiKey: "AIzaSyCEyFpAbxajXqBfzZn0BdQxiZyElEpoEXE", authDomain: "ng-task-19-7b92b.firebaseapp.com", messagingSenderId: "1026760612568" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideHttpClient(withInterceptors([])),
  TranslateModule.forRoot({
    defaultLanguage: 'es',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    }
  }).providers!]
};
