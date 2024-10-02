import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../FireBaseConfig";

interface User {
  email: string;
  password: string;
}

export default async function tryLoginWithEmailAndPassword(user: User) {
  try {
    const auth = getAuth(app);
    const response = await signInWithEmailAndPassword(auth, user.email, user.password)
    return response;
  } catch (err: any) {
    console.error(err);
  }
}
