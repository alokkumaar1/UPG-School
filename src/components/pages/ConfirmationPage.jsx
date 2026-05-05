// src/components/pages/ConfirmationPage.jsx
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaHome, FaPrint } from 'react-icons/fa';
import { SCHOOL, ADMISSION } from '../../config/constants';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { generateReceipt } from '../../utils/generateReceipt';

function InfoRow({ label, value }) {
  return (
    <div className="flex py-3 border-b border-gray-100 last:border-0">
      <span className="w-40 text-sm font-semibold text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-900 font-body font-medium">{value || '—'}</span>
    </div>
  );
}

export default function ConfirmationPage() {
  const { state } = useLocation();

  // Guard: if user lands here directly without state
  if (!state || !state.applicationId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
        <FaCheckCircle className="text-gray-300" size={60} />
        <h2 className="font-heading font-bold text-2xl text-gray-600">No Application Found</h2>
        <p className="text-gray-500 font-body">
          Please apply first from the admission form.
        </p>
        <Link to="/admission" className="btn-primary">
          Apply for Admission
        </Link>
      </div>
    );
  }

  const { applicationId, applicationData: app } = state;

  const handleDownloadReceipt = () => {
    generateReceipt({ ...app, applicationId });
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      {/* Success header */}
      <div className="bg-emerald-600 text-white py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <FaCheckCircle className="mx-auto text-5xl mb-4 opacity-90" />
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
            Application Submitted!
          </h1>
          <p className="text-emerald-100 font-body">
            Your admission application has been received successfully.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Application ID */}
        <div className="card bg-navy-50 border-navy-200 text-center mb-6">
          <p className="text-sm text-gray-500 font-body mb-1">Your Application ID</p>
          <p className="font-mono font-bold text-2xl text-navy-900 tracking-wider">
            {applicationId}
          </p>
          <p className="text-xs text-gray-400 mt-2 font-body">
            Save this ID for future reference and document verification.
          </p>
        </div>

        {/* Application details card */}
        <div className="card mb-6">
          <h2 className="font-heading font-bold text-xl text-navy-900 mb-4">Application Details</h2>

          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Student</p>
            <InfoRow label="Student Name" value={app.studentName} />
            <InfoRow label="Date of Birth" value={formatDate(app.dob)} />
            <InfoRow label="Gender" value={app.gender} />
            <InfoRow label="Class Applied" value={`Class ${app.class}`} />
          </div>

          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Parent</p>
            <InfoRow label="Father's Name" value={app.fatherName} />
            <InfoRow label="Mother's Name" value={app.motherName} />
            <InfoRow label="Mobile" value={`+91 ${app.mobile}`} />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Payment</p>
            <InfoRow label="Amount Paid" value={formatCurrency(ADMISSION.fee)} />
            <InfoRow label="Payment ID" value={app.paymentId || 'N/A'} />
            <div className="flex py-3">
              <span className="w-40 text-sm font-semibold text-gray-500 flex-shrink-0">Status</span>
              <span className="badge-paid text-sm">{app.paymentStatus || 'Paid'}</span>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="card bg-amber-50 border-amber-200 mb-6">
          <h3 className="font-heading font-bold text-amber-900 text-lg mb-3">📋 What's Next?</h3>
          <ol className="space-y-2 font-body text-sm text-amber-800 list-decimal list-inside">
            <li>Download and print the admission receipt below.</li>
            <li>Visit the school on a working day with <strong>original documents</strong>.</li>
            <li>Carry photo ID proof of parent/guardian.</li>
            <li>Admission confirmed only after document verification.</li>
          </ol>
          <p className="mt-3 text-xs text-amber-700">
            School Address: {SCHOOL.address}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <FaDownload /> Download Receipt (PDF)
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <FaPrint /> Print Page
          </button>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900 font-semibold">
            <FaHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
