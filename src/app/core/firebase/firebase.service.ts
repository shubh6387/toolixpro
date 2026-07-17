import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private app: FirebaseApp | null = null;
  private db: Firestore | null = null;

  constructor() {
    if (this.isBrowser && environment.firebase && environment.firebase.apiKey !== 'YOUR_API_KEY') {
      try {
        this.app = initializeApp(environment.firebase);
        this.db = getFirestore(this.app);
        console.log('Firebase initialized successfully.');
      } catch (err) {
        console.error('Firebase initialization failed:', err);
      }
    }
  }

  async addDocument(colName: string, data: any): Promise<any> {
    if (this.db) {
      try {
        const colRef = collection(this.db, colName);
        const docRef = await addDoc(colRef, {
          ...data,
          timestamp: new Date().toISOString()
        });
        return docRef.id;
      } catch (err) {
        console.error(`Error saving document to collection ${colName}:`, err);
        throw err;
      }
    } else {
      console.log(`[Firebase Mock] Collection: ${colName}, Data:`, data);
      return 'MOCK_ID_' + Math.random().toString(36).substring(2, 11);
    }
  }

  async submitFeedback(toolSlug: string, rating: number, comment: string): Promise<string> {
    return this.addDocument('feedback', { toolSlug, rating, comment });
  }

  async submitContact(name: string, email: string, subject: string, message: string): Promise<string> {
    return this.addDocument('contact', { name, email, subject, message, status: 'unread' });
  }

  async logAnalytics(event: string, toolSlug?: string, extraData?: any): Promise<string> {
    return this.addDocument('analytics', { event, toolSlug, ...extraData });
  }
}
