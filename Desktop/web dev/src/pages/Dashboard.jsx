import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Bookings from './Bookings';
import ProviderDashboard from './ProviderDashboard';

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user.name || user.email}
        </h1>
        <p className="text-gray-500 mb-8 capitalize">{user.role} Account</p>
      </div>
      {user.role === 'provider' ? <ProviderDashboard /> : <Bookings />}
    </div>
  );
}

export default Dashboard;
