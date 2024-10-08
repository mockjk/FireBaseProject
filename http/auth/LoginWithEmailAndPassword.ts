import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBaseConfig";

interface User {
  email: string;
  password: string;
}

/**
* Login Function - Return FireBase Session
*
* @param {user} User Object contains email and password
* 
*/
export default async function tryLoginWithEmailAndPassword(user: User) {
  try {
    const response = await signInWithEmailAndPassword(auth, user.email, user.password)
    return response;
  } catch (err: any) {
    console.error(err);
  }
}
