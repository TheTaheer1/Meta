import React from 'react';

const ProviderCard = ({ provider, selected, onSelect }) => {
  // Show price as 450 for Admin if missing
  let displayPrice = provider.price;
  if ((provider.name || '').toLowerCase() === 'admin' && (!displayPrice || displayPrice === 'N/A')) {
    displayPrice = 450;
  }
  return (
    <div className={`fade-in-card bg-gradient-to-br from-emerald-50 via-white to-blue-50 rounded-2xl shadow-lg border border-emerald-100 p-6 flex flex-col gap-2 transition-all hover:scale-[1.02] ${selected ? 'ring-2 ring-emerald-500' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="font-bold text-lg text-emerald-900 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: provider.availableNow ? '#10b981' : '#f59e42' }}></span>
          {provider.name || provider.email}
        </div>
        {provider.availableNow ? (
          <span className="ml-2 px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 font-semibold shadow">Available Now</span>
        ) : (
          <span className="ml-2 px-2 py-1 text-xs rounded bg-orange-100 text-orange-600 font-semibold shadow">Busy</span>
        )}
      </div>
      <div className="flex gap-3 text-gray-700 text-sm mb-2">
        <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> {provider.rating || 'N/A'}</span>
        <span className="flex items-center gap-1"><span className="text-emerald-600 font-bold">₹</span>{displayPrice || 'N/A'}</span>
        <span className="flex items-center gap-1"><span className="text-blue-500">⏳</span>{provider.experience} yrs</span>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {(provider.skills || ['Professional', 'Verified']).map((skill, i) => (
            <span key={i} className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-semibold shadow">{skill}</span>
          ))}
        </div>
        <div className="flex items-end h-12">
          <button
            className={`w-full px-4 py-2 rounded bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-lg hover:from-emerald-600 hover:to-blue-600 transition ${selected ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={onSelect}
            disabled={selected}
          >
            {selected ? 'Selected' : 'Select Provider'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
