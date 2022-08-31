import {
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  collection,
  query,
} from '@firebase/firestore';
import { Firestore, QueryConstraint } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
//-> The DBService is responsible for all communication between the applcaition and the Firestore Database
//-> All types within this class are Generic to allow any feature to interface with the database,
//-> using the same codebase as the rest of the application
export class DBService {
  //-> Injects the Firestore service
  constructor(private readonly firestore: Firestore) {}

  //-> Find all documents in a collection that matches the query
  async find<T>(coll: string, key: QueryConstraint) {
    // Creates a referance to the specified collection
    const collectionReference = collection(this.firestore, coll);
    //-> Fetches all documents that matches the query
    return await getDocs(query(collectionReference, key));
  }

  //-> Gets a specified document
  async get<T>(collection: string, id: string) {
    //-> Creates a referance to a document using the collection and id provided
    const documentReference = doc(this.firestore, `${collection}/${id}`);
    //-> Fetches the data and cast to the generic type
    return (await getDoc(documentReference)).data() as T;
  }

  //-> Creates a new document in the database
  create<T>(collection: string, item: T) {
    //-> Creates a reference to the document
    const documentReference = doc(
      this.firestore,
      `${collection}/${(item as any).id}`
    );

    //-> Sets the data for that document using its refrance
    return setDoc(documentReference, item);
  }

  //-> Updates a collection's documents
  update<T>(collection: string, item: T) {
    //-> Creates a reference to document that has been updated
    const documentReference = doc(
      this.firestore,
      `${collection}/${(item as any).id}`
    );
    //-> Updates the data for that document using its refrance, only editing the fields that differ
    return updateDoc(documentReference, { ...item });
  }

  //-> Deletes a collection document
  delete(collection: string, id: string) {
    //-> Creates a reference to the document
    const documentReference = doc(this.firestore, `${collection}/${id}`);
    //-> Deltes the document
    return deleteDoc(documentReference);
  }
}
