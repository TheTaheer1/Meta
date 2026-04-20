import React, { useEffect, useState } from 'react';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import ProviderInfoModal from '../components/ProviderInfoModal';

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchProviders() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const all = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProviders(all.filter(u => u.role === 'provider'));
    }
    fetchProviders();
  }, []);

  const handleEdit = (provider) => {
    setSelectedProvider(provider);
    setShowModal(true);
  };

  const handleSave = async (info) => {
    if (!selectedProvider) return;
    const userRef = doc(db, 'users', selectedProvider.id);
    await updateDoc(userRef, info);
    setShowModal(false);
    setSelectedProvider(null);
    // Refresh list
    const querySnapshot = await getDocs(collection(db, 'users'));
    const all = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProviders(all.filter(u => u.role === 'provider'));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Providers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map(provider => (
          <div key={provider.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-lg">{provider.name || provider.email}</div>
                <div className="text-gray-500 text-sm">{provider.email}</div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-1.5 rounded font-semibold hover:bg-blue-600 transition"
                onClick={() => handleEdit(provider)}
              >
                Edit
              </button>
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              <div>Field: <span className="font-semibold">{provider.field || 'N/A'}</span></div>
              <div>Experience: <span className="font-semibold">{provider.experience || 'N/A'} yrs</span></div>
              <div>Rate: <span className="font-semibold">₹{provider.hourlyRate || 'N/A'}/hr</span></div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ProviderInfoModal
          onSave={handleSave}
          initial={selectedProvider}
        />
      )}
    </div>
  );
};

export default AdminProviders;
