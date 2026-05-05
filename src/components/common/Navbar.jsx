// src/components/common/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SCHOOL } from '../../config/constants';
import { FaBars, FaTimes, FaSchool } from 'react-icons/fa';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/admission', label: 'Apply Now' },
    { to: '/admin/login', label: 'Admin' },
  ];

  const isActive = (to) => pathname === to;

  return (
    <nav className="bg-navy-900 text-white shadow-lg sticky top-0 z-50">
      {/* Top ticker */}
      <div className="bg-saffron-500 text-navy-900 text-xs font-semibold py-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          &nbsp;&nbsp;🎓 Admissions Open for Session 2024-25 | Classes 1 to 12 |
          UPG+2 High School, Lawahikala, Dandai, Garhwa | Admission Fee: ₹550 only
          &nbsp;&nbsp;
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + School name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FaSchool className="text-navy-900 text-lg" />
            </div>
            <div className="leading-tight">
              <div className="font-heading font-bold text-sm sm:text-base leading-tight">
                {SCHOOL.name}
              </div>
              <div className="text-xs text-navy-200 font-body">
                Dandai, Garhwa, Jharkhand
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-semibold transition-colors duration-150 ${
                  isActive(to)
                    ? 'text-saffron-400 border-b-2 border-saffron-400 pb-0.5'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/admission"
              className="bg-saffron-500 hover:bg-saffron-600 text-navy-900 font-bold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Apply for Admission
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700 px-4 py-4 space-y-3 animate-slide-up">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`block text-sm font-semibold py-2 border-b border-navy-700 ${
                isActive(to) ? 'text-saffron-400' : 'text-gray-200'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/admission"
            onClick={() => setOpen(false)}
            className="block bg-saffron-500 text-navy-900 font-bold text-center py-2 rounded-lg mt-3"
          >
            Apply for Admission
          </Link>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </nav>
  );
}
