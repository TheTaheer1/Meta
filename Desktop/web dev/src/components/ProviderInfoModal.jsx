import React, { useState } from 'react';

const fieldRates = {
  Plumbing: 450,
  Electrician: 470,
  Cleaning: 490,
  Carpentry: 510,
  Painting: 530,
  Gardening: 550,
  Other: 450
};

const ProviderInfoModal = ({ onSave, initial }) => {
  const [experience, setExperience] = useState(initial?.experience || '');
  const [field, setField] = useState(initial?.field || '');
  const hourlyRate = field ? fieldRates[field] : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!experience || !field) return;
    onSave({ experience, field, hourlyRate });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-center">Complete Your Provider Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Experience (years)</label>
            <input
              type="number"
              min="0"
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g. 5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Field of Expertise</label>
            <select
              value={field}
              onChange={e => setField(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select field</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrician">Electrician</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Painting">Painting</option>
              <option value="Gardening">Gardening</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hourly Rate (₹)</label>
            <input
              type="number"
              value={hourlyRate}
              readOnly
              className="block w-full px-3 py-2 border border-gray-200 bg-gray-100 text-gray-700 cursor-not-allowed"
              placeholder="Hourly rate will be set automatically"
            />
          </div>
          <div className="text-green-700 text-sm font-semibold mt-2 text-center">
            You will earn ₹{hourlyRate || '___'} per hour as a {field || '___'} provider.
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold mt-4">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProviderInfoModal;
