import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShieldCheck, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Provider-specific fields
  const [experience, setExperience] = useState('');
  const [field, setField] = useState('');
  // Hourly rates for each field
  const fieldRates = {
    Plumbing: 450,
    Electrician: 470,
    Cleaning: 490,
    Carpentry: 510,
    Painting: 530,
    Gardening: 550,
    Other: 450
  };
  const hourlyRate = field ? fieldRates[field] : '';
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let extra = {};
      if (role === 'provider') {
        if (!experience || !field) {
          toast.error('Please fill all provider details.');
          setIsLoading(false);
          return;
        }
        extra = { experience, hourlyRate, field };
      }
      await signup(email, password, name, role, extra);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed up with Google!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Google sign-up failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 bg-linear-to-b from-primary-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <ShieldCheck className="text-primary-600" size={28} />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-500 text-center mb-8">Join ServEase today</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50/50"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50/50"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-600 focus:outline-none bg-transparent hover:bg-gray-100 rounded transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am registering as a:</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" value="user" checked={role === 'user'} onChange={() => setRole('user')} className="peer sr-only"/>
                  <div className="text-center px-4 py-2 rounded-lg border-2 border-gray-200 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700 font-medium transition-all">
                    Customer
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" value="provider" checked={role === 'provider'} onChange={() => setRole('provider')} className="peer sr-only"/>
                  <div className="text-center px-4 py-2 rounded-lg border-2 border-gray-200 peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700 font-medium transition-all">
                    Provider
                  </div>
                </label>
              </div>
            </div>

            {/* Provider extra fields */}
            {role === 'provider' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                  <input
                    type="number"
                    min="0"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50/50"
                    placeholder="e.g. 5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Expertise</label>
                  <select
                    value={field}
                    onChange={e => setField(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50/50"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    readOnly
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                    placeholder="Hourly rate will be set automatically"
                  />
                </div>
                <div className="text-green-700 text-sm font-semibold mt-2 text-center">
                  You will earn ₹{hourlyRate || '___'} per hour as a {field || '___'} provider.
                </div>
              </>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg py-2 mt-2 shadow hover:shadow-md transition text-gray-700 font-medium"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <span onClick={() => navigate('/login')} className="text-primary-600 font-medium cursor-pointer hover:underline">Log In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
