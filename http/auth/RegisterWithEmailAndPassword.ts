//@ts-nocheck

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FireBaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface User {
  name: string;
  email: string;
  password: string;
}

/**
 * Register Function - Return FireBase Session
 *
 * @param {user} User Object contains email and password
 *
 */
export default async function tryRegisterWithEmailAndPassword(user: User) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const createdUser = response.user;

    await setDoc(doc(db, "users", createdUser.uid), {
      name: user.name,
      email: user.email,
      createdAt: new Date(),
    });

    console.log("Deu certo!");
    return response;
  } catch (err: any) {
    console.error(err);
  }
}
