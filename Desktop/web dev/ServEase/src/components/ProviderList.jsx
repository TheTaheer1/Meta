import React, { useState } from 'react';
import useProviders from '../hooks/useProviders';
import FilterBar from './FilterBar';
import ProviderCard from './ProviderCard';

// Default filter/sort state
const defaultFilters = {
  rating: 0,
  priceRange: [0, 10000],
  availableNow: false,
};

const ProviderList = ({ service, onSelect }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('ratingHighLow');
  const [selectedProvider, setSelectedProvider] = useState(null);

  const { providers, loading } = useProviders({ service, filters, sortBy });

  const handleFilterChange = (newFilters) => setFilters(f => ({ ...f, ...newFilters }));
  const handleSortChange = (sort) => setSortBy(sort);
  const handleSelect = (provider) => {
    setSelectedProvider(provider.id);
    if (onSelect) onSelect(provider);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-3xl shadow-lg p-6 md:p-10 mt-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-900 mb-2 text-center tracking-tight">Select a Provider</h2>
      <p className="text-gray-600 text-center mb-6">Choose the best provider for your service. Filter by rating, price, or availability for a smarter booking experience!</p>
      <div className="mb-6">
        <FilterBar filters={filters} onFilterChange={handleFilterChange} sortBy={sortBy} onSortChange={handleSortChange} />
      </div>
      {loading ? (
        <div className="p-8 text-center text-gray-500 text-lg font-semibold animate-pulse">Loading providers...</div>
      ) : providers.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-lg font-semibold">No providers available for this service.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {providers.map(provider => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              selected={selectedProvider === provider.id}
              onSelect={() => handleSelect(provider)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderList;
