import { auth, db } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Mock storage wrapper for Viva Fallback
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getStored = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    if (fallback) localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return JSON.parse(data);
};
const setStored = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const initialUsers = [
  { id: '1', email: 'provider@example.com', name: 'John Provider', role: 'provider', phone: '123-456-7890' },
  { id: '2', email: 'user@example.com', name: 'Jane User', role: 'user', phone: '098-765-4321' }
];


export const loginUser = async (email, password) => {
  // Real Firebase only
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
  const userData = userDoc.data();
  return { id: userCredential.user.uid, email, ...userData };
};

export const registerUser = async (email, password, name, role) => {
  // Real Firebase only
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = { email, name, role, created_at: new Date().toISOString() };
  await setDoc(doc(db, 'users', userCredential.user.uid), user);
  return { id: userCredential.user.uid, ...user };
};

export const logoutUser = async () => {
  // Real Firebase only
  await signOut(auth);
};

export const getCurrentUserMockFn = () => {
  if (!isMockMode) return null;
  const data = localStorage.getItem('mindmatch_auth');
  return data ? JSON.parse(data) : null;
};
