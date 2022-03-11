import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export type IFirestoreMessage = {
  fkey: string;
  text: string;
  creation_time: Timestamp;
};

class FirestoreMessage {
  constructor() {}

  async getAllMessages() {
    const q = query(
      collection(db, "messages"),
      orderBy("creation_time", "desc"),
      limit(20)
    );
    const snapshots = await getDocs(q);

    return snapshots.docs.map((s) => {
      return {
        fkey: s.id,
        ...s.data(),
      } as IFirestoreMessage;
    });
  }

  async addMessage(message: string) {
    await addDoc(collection(db, "messages"), {
      text: message,
      creation_time: new Date(),
    });
  }
}

export { FirestoreMessage };
