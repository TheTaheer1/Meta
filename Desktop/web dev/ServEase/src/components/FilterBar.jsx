import React from 'react';

const FilterBar = ({ filters, onFilterChange, sortBy, onSortChange }) => {
  return (
    <div className="flex flex-wrap gap-6 md:gap-10 items-end bg-gradient-to-r from-blue-50 via-white to-emerald-50 p-6 rounded-2xl shadow-lg border border-emerald-100 mb-8">
      {/* Rating Filter */}
      <div className="flex flex-col min-w-[120px]">
        <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
          <span className="text-yellow-500">★</span> Min Rating
        </label>
        <select
          className="border rounded px-2 py-1 focus:ring-emerald-400"
          value={filters.rating}
          onChange={e => onFilterChange({ rating: Number(e.target.value) })}
        >
          <option value={0}>All</option>
          <option value={3}>3★ and above</option>
          <option value={4}>4★ and above</option>
          <option value={4.5}>4.5★ and above</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col min-w-[180px]">
        <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
          <span className="text-emerald-600 font-bold">₹</span> Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="border rounded px-2 py-1 w-20 focus:ring-emerald-400"
            min={0}
            value={filters.priceRange[0]}
            onChange={e => onFilterChange({ priceRange: [Number(e.target.value), filters.priceRange[1]] })}
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            className="border rounded px-2 py-1 w-20 focus:ring-emerald-400"
            min={0}
            value={filters.priceRange[1]}
            onChange={e => onFilterChange({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
          />
        </div>
      </div>

      {/* Availability Filter */}
      <div className="flex flex-col min-w-[120px]">
        <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
          <span className="text-green-500">●</span> Availability
        </label>
        <div className="flex items-center gap-2 h-[34px]">
          <input
            type="checkbox"
            checked={filters.availableNow}
            onChange={e => onFilterChange({ availableNow: e.target.checked })}
            className="accent-emerald-500 w-4 h-4"
          />
          <span className="text-gray-700 text-sm">Available Now</span>
        </div>
      </div>

      {/* Sorting */}
      <div className="flex flex-col min-w-[180px]">
        <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
          <span className="text-blue-500">⇅</span> Sort By
        </label>
        <select
          className="border rounded px-2 py-1 focus:ring-emerald-400"
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
        >
          <option value="ratingHighLow">Rating: High → Low</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
