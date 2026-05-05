// src/components/common/Footer.jsx
import { Link } from 'react-router-dom';
import { SCHOOL } from '../../config/constants';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSchool } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* School info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-saffron-500 rounded-full flex items-center justify-center">
                <FaSchool className="text-navy-900 text-lg" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-sm leading-tight">
                  {SCHOOL.fullName}
                </div>
                <div className="text-xs text-gray-400">Govt. Senior Secondary School</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Established in {SCHOOL.established}, providing quality education to students
              from Class 1 to Class 12. Affiliated to {SCHOOL.affiliation}.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/admission', label: 'Apply for Admission' },
                { to: '/admin/login', label: 'Admin Panel' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-saffron-400 transition-colors duration-150"
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <FaMapMarkerAlt className="mt-0.5 text-saffron-400 flex-shrink-0" />
                {SCHOOL.address}
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaPhone className="text-saffron-400 flex-shrink-0" />
                {SCHOOL.phone}
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaEnvelope className="text-saffron-400 flex-shrink-0" />
                {SCHOOL.email}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {SCHOOL.fullName}. All rights reserved.</p>
          <p>Powered by Government of Jharkhand — Education Department</p>
        </div>
      </div>
    </footer>
  );
}
