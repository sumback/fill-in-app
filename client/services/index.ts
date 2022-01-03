import Http from './http';
import Firebase from './firebase';
import GamesService from './games-service';
import UserService from './user-service';
import QuestionCardService from './question-card-service';
import ResponseCardService from './response-card-service';

const httpService = new Http({
  baseURL: '/api/',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': import.meta.env.VITE_API_MONGO_KEY,
  },
});

const firebaseService = new Firebase({
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  databaseURL: String(import.meta.env.VITE_FIREBASE_DATABASE_URL),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
});

// RESTFULL MONGO API SERVICES
export const userService = new UserService(httpService);
export const questionCardService = new QuestionCardService(httpService);
export const responseCardService = new ResponseCardService(httpService);

// REALTIME FIREBASE API SERVICES
export const gamesService = new GamesService(firebaseService);
