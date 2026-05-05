// src/components/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmission } from '../../hooks/useAdmission';
import { SCHOOL, ADMISSION } from '../../config/constants';
import { formatTimestamp } from '../../utils/helpers';
import { generateReceipt as downloadReceipt } from '../../utils/generateReceipt';
import Spinner from '../common/Spinner';
import {
  FaSignOutAlt, FaFilter, FaSearch, FaDownload,
  FaUsers, FaCheckCircle, FaTimesCircle, FaEye,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

// Status badge helper
function StatusBadge({ status }) {
  return status === 'Paid'
    ? <span className="badge-paid">✓ Paid</span>
    : <span className="badge-unpaid">✗ Unpaid</span>;
}

// Application detail modal
function AppModal({ app, onClose }) {
  if (!app) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-navy-800 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-navy-300 text-xs mb-1">Application ID</p>
              <p className="font-mono font-bold text-lg">{app.applicationId}</p>
            </div>
            <button onClick={onClose} className="text-navy-300 hover:text-white text-xl">✕</button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            ['Student Name', app.studentName],
            ['Date of Birth', app.dob],
            ['Gender', app.gender],
            ['Class', `Class ${app.class}`],
            ['Father\'s Name', app.fatherName],
            ['Mother\'s Name', app.motherName],
            ['Mobile', `+91 ${app.mobile}`],
            ['Address', app.address],
            ['Payment ID', app.paymentId || 'N/A'],
            ['Payment Status', app.paymentStatus],
            ['Applied On', formatTimestamp(app.createdAt)],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4 border-b border-gray-100 pb-3 last:border-0">
              <span className="w-36 text-xs font-semibold text-gray-500 flex-shrink-0 pt-0.5">{label}</span>
              <span className="text-sm text-gray-900">{value || '—'}</span>
            </div>
          ))}

          {/* Documents */}
          {app.documentURLs && Object.keys(app.documentURLs).length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Documents</p>
              <div className="space-y-2">
                {Object.entries(app.documentURLs).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-navy-700 hover:text-navy-900 underline"
                  >
                    📄 {key.replace(/([A-Z])/g, ' $1').trim()}
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => downloadReceipt(app)}
            className="w-full btn-primary flex items-center justify-center gap-2 mt-4"
          >
            <FaDownload /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { loading, fetchApplications } = useAdmission();
  const [apps, setApps] = useState([]);
  const [filterClass, setFilterClass] = useState('');
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin/login');
    } else {
      loadApplications();
    }
  }, []);

  const loadApplications = async (cls = '') => {
    const data = await fetchApplications(cls);
    setApps(data);
  };

  const handleFilter = (cls) => {
    setFilterClass(cls);
    loadApplications(cls);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    toast('Logged out successfully.', { icon: '👋' });
    navigate('/admin/login');
  };

  // Stats
  const totalPaid   = apps.filter((a) => a.paymentStatus === 'Paid').length;
  const totalUnpaid = apps.filter((a) => a.paymentStatus !== 'Paid').length;

  // Search filter (client-side)
  const filtered = apps.filter((a) =>
    !search ||
    a.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    a.applicationId?.toLowerCase().includes(search.toLowerCase()) ||
    a.mobile?.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-100 page-enter">
      {/* Top bar */}
      <div className="bg-navy-900 text-white px-4 sm:px-6 py-4 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="font-heading font-bold text-lg">{SCHOOL.name} — Admin</h1>
          <p className="text-navy-300 text-xs font-body">Admission Management Dashboard</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: apps.length, icon: FaUsers, color: 'bg-navy-800' },
            { label: 'Paid', value: totalPaid, icon: FaCheckCircle, color: 'bg-emerald-600' },
            { label: 'Unpaid', value: totalUnpaid, icon: FaTimesCircle, color: 'bg-red-500' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card flex items-center gap-4">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="text-white text-xl" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-navy-900">{value}</p>
                <p className="text-sm text-gray-500 font-body">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, application ID, or mobile…"
                className="input-field pl-9 text-sm"
              />
            </div>

            {/* Class filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" size={14} />
              <select
                value={filterClass}
                onChange={(e) => handleFilter(e.target.value)}
                className="input-field text-sm w-40"
              >
                <option value="">All Classes</option>
                {ADMISSION.classes.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => { setSearch(''); handleFilter(''); }}
              className="btn-secondary text-sm px-4"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden p-0">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-bold text-navy-900 text-lg">
              Applications ({filtered.length})
            </h2>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Spinner size="lg" text="Loading applications…" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400 font-body">
              <p className="text-4xl mb-3">📭</p>
              <p>No applications found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead className="bg-gray-50">
                  <tr>
                    {['#', 'App ID', 'Student Name', 'Class', 'Mobile', 'Payment', 'Date', 'Action'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((app, i) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3 font-mono text-xs text-navy-700">{app.applicationId}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{app.studentName}</td>
                      <td className="px-4 py-3 text-gray-600">Class {app.class}</td>
                      <td className="px-4 py-3 text-gray-600">+91 {app.mobile}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={app.paymentStatus} />
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {formatTimestamp(app.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="flex items-center gap-1 text-navy-700 hover:text-navy-900 font-semibold text-xs border border-navy-200 hover:border-navy-400 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <FaEye size={11} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      <AppModal app={selectedApp} onClose={() => setSelectedApp(null)} />
    </div>
  );
}
