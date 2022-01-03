import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { FirebaseApp, FirebaseOptions } from '@firebase/app';
import { Database } from '@firebase/database';
import { IMongoEntity } from '@/models/entity';

export default class Firebase {
  readonly app: FirebaseApp;
  public database: Database;

  public constructor(firebaseConfig: FirebaseOptions) {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
  }
}
