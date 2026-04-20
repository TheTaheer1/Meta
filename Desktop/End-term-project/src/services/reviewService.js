import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, Timestamp, updateDoc, doc } from 'firebase/firestore';

export const addReview = async ({ providerId, userId, bookingId, rating, comment, userName }) => {
  const review = {
    providerId,
    userId,
    bookingId,
    rating,
    comment,
    userName,
    created_at: Timestamp.now(),
  };
  await addDoc(collection(db, 'reviews'), review);
  // Mark booking as reviewed
  if (bookingId) {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { reviewed: true });
  }
};

export const fetchProviderReviews = async (providerId) => {
  const q = query(collection(db, 'reviews'), where('providerId', '==', providerId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
