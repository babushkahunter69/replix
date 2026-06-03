import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ── auth helpers ──────────────────────────────────────────────────────────────
export async function signUp(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    isPro: false,
    usageCount: 0,
    savedBiz: "",
    createdAt: new Date().toISOString(),
  });
  return cred.user;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  const ref  = doc(db, "users", cred.user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: cred.user.email,
      isPro: false,
      usageCount: 0,
      savedBiz: "",
      createdAt: new Date().toISOString(),
    });
  }
  return cred.user;
}

export function signOutUser() {
  return signOut(auth);
}

export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}

// ── firestore helpers ─────────────────────────────────────────────────────────
export async function getUserData(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { uid, ...snap.data() } : null;
}

export async function incrementUsage(uid) {
  await updateDoc(doc(db, "users", uid), { usageCount: increment(1) });
}

export async function saveBizName(uid, savedBiz) {
  await updateDoc(doc(db, "users", uid), { savedBiz });
}

// ── response history ──────────────────────────────────────────────────────────
export async function saveResponse(uid, entry) {
  await addDoc(collection(db, "users", uid, "history"), {
    ...entry,
    createdAt: new Date().toISOString(),
  });
}

export async function getHistory(uid, max = 30) {
  const q = query(
    collection(db, "users", uid, "history"),
    orderBy("createdAt", "desc"),
    limit(max)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
