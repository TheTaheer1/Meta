// Delete booking
export const deleteBooking = async (bookingId) => {
  if (isMockMode) {
    await delay(400);
    let bookings = getStored('mindmatch_bookings', []);
    bookings = bookings.filter(b => b.id !== bookingId);
    setStored('mindmatch_bookings', bookings);
    return;
  }
  const bookingRef = doc(firestore, 'bookings', bookingId);
  await updateDoc(bookingRef, { deleted: true }); // Soft delete for Firestore
};
// Fetch all bookings (admin view)
export const fetchAllBookings = async () => {
  if (isMockMode) {
    await delay(500);
    return getStored('mindmatch_bookings', [])
      .filter(b => !b.deleted)
      .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }
  const q = query(collection(firestore, 'bookings'), orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(b => !b.deleted);
};
// Update booking details (edit)
export const updateBooking = async (bookingId, updates) => {
  if (isMockMode) {
    await delay(400);
    let bookings = getStored('mindmatch_bookings', []);
    bookings = bookings.map(b => b.id === bookingId ? { ...b, ...updates } : b);
    setStored('mindmatch_bookings', bookings);
    return;
  }
  const bookingRef = doc(firestore, 'bookings', bookingId);
  await updateDoc(bookingRef, updates);
};

// Cancel booking (set status to 'cancelled')
export const cancelBooking = async (bookingId) => {
  if (isMockMode) {
    await delay(400);
    let bookings = getStored('mindmatch_bookings', []);
    bookings = bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
    setStored('mindmatch_bookings', bookings);
    return;
  }
  const bookingRef = doc(firestore, 'bookings', bookingId);
  await updateDoc(bookingRef, { status: 'cancelled' });
};
import { db as firestore, isMockMode } from './firebase';
import { collection, addDoc, getDocs, updateDoc, doc, query, where, orderBy } from 'firebase/firestore';

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

const initialServices = [
  { id: '1', provider_id: '1', category: 'Plumbing', title: 'Expert Pipe Fixing', description: 'Quick and reliable plumbing services.', price_per_hour: 450, rating: 4.8 },
  { id: '2', provider_id: '1', category: 'Electrical', title: 'Home Wiring & Setup', description: 'Certified electrician for safe installations.', price_per_hour: 550, rating: 4.9 },
  { id: '3', provider_id: '1', category: 'Cleaning', title: 'Deep Home Cleaning', description: 'Sparkling clean home with eco-friendly products.', price_per_hour: 300, rating: 4.5 }
];

// -- SERVICES -- //
export const fetchServices = async () => {
  // Always return demo/mock data for development/demo
  await delay(300);
  return [
    { id: '1', provider_id: '1', category: 'Plumbing', title: 'Expert Pipe Fixing', description: 'Quick and reliable plumbing services.', price_per_hour: 450, rating: 4.8 },
    { id: '2', provider_id: '1', category: 'Electrical', title: 'Home Wiring & Setup', description: 'Certified electrician for safe installations.', price_per_hour: 550, rating: 4.9 },
    { id: '3', provider_id: '1', category: 'Cleaning', title: 'Deep Home Cleaning', description: 'Sparkling clean home with eco-friendly products.', price_per_hour: 300, rating: 4.5 }
  ];
};

// -- BOOKINGS -- //
export const createBooking = async (bookingData) => {
  if (isMockMode) {
    await delay(600);
    const bookings = getStored('mindmatch_bookings', []);
    // Ensure total_cost is always set for demo bookings
    const total_cost = typeof bookingData.total_cost === 'number' && !isNaN(bookingData.total_cost)
      ? bookingData.total_cost
      : 500; // Default demo value
    const newBooking = { id: crypto.randomUUID(), status: 'pending', created_at: new Date().toISOString(), ...bookingData, total_cost };
    setStored('mindmatch_bookings', [...bookings, newBooking]);
    return newBooking;
  }

  const enhancedData = { ...bookingData, status: 'pending', created_at: new Date().toISOString() };
  const docRef = await addDoc(collection(firestore, 'bookings'), enhancedData);
  return { id: docRef.id, ...enhancedData };
};

export const fetchUserBookings = async (userId) => {
  if (isMockMode) {
    await delay(500);
    const allBookings = getStored('mindmatch_bookings', []);
    return allBookings
      .filter(b => b.user_id === userId && !b.deleted)
      .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const q = query(collection(firestore, 'bookings'), where('user_id', '==', userId));
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(b => !b.deleted);
  return results.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
};

export const fetchProviderBookings = async (providerId) => {
  if (isMockMode) {
    await delay(500);
    const allBookings = getStored('mindmatch_bookings', []);
    return allBookings
      .filter(b => b.provider_id === providerId && !b.deleted)
      .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const q = query(collection(firestore, 'bookings'), where('provider_id', '==', providerId));
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return results.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
};

export const updateBookingStatus = async (bookingId, status) => {
  if (isMockMode) {
    await delay(400);
    let bookings = getStored('mindmatch_bookings', []);
    bookings = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    setStored('mindmatch_bookings', bookings);
    return;
  }

  const bookingRef = doc(firestore, 'bookings', bookingId);
  await updateDoc(bookingRef, { status });
};
