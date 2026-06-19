import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { User, UserRole } from "@/types/user.types";

const googleProvider = new GoogleAuthProvider();

// Crea el documento del usuario con rol en Firestore
async function createUserDocument(
  uid: string,
  email: string,
  displayName: string,
  role: UserRole = "customer",
): Promise<void> {
  await setDoc(doc(db, "users", uid), {
    uid,
    email,
    displayName,
    role,
    createdAt: new Date(),
  });
}

export async function register(
  email: string,
  password: string,
  displayName: string,
): Promise<FirebaseUser> {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(credential.user, { displayName });
  await createUserDocument(credential.user.uid, email, displayName);
  return credential.user;
}

export async function login(
  email: string,
  password: string,
): Promise<FirebaseUser> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function loginWithGoogle(): Promise<FirebaseUser> {
  const credential = await signInWithPopup(auth, googleProvider);

  // Se crea el documento del usuario en Firestore si entra por primera vez con Google
  const userDoc = await getDoc(doc(db, "users", credential.user.uid));
  if (!userDoc.exists()) {
    await createUserDocument(
      credential.user.uid,
      credential.user.email ?? "",
      credential.user.displayName ?? "Usuario",
    );
  }

  return credential.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function getUserData(uid: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) return null;
  return userDoc.data() as User;
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
