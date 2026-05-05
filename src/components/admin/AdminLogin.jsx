// src/components/admin/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_CREDENTIALS, SCHOOL } from '../../config/constants';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple credential check (for production use Firebase Auth instead)
    setTimeout(() => {
      if (
        form.username === ADMIN_CREDENTIALS.username &&
        form.password === ADMIN_CREDENTIALS.password
      ) {
        sessionStorage.setItem('adminAuth', 'true');
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid username or password.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 page-enter">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-navy-900 text-2xl" />
          </div>
          <h1 className="font-heading font-bold text-white text-2xl">Admin Panel</h1>
          <p className="text-navy-300 text-sm font-body mt-1">{SCHOOL.fullName}</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="font-heading font-bold text-navy-900 text-xl mb-6 text-center">
            Sign In to Continue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="label" htmlFor="username">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handle}
                  required
                  placeholder="Enter admin username"
                  className="input-field pl-9"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  id="password"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={handle}
                  required
                  placeholder="Enter password"
                  className="input-field pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400 font-body">
            Restricted access — authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
