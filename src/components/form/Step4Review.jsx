// src/components/form/Step4Review.jsx
import { ADMISSION, SCHOOL, RAZORPAY_KEY } from '../../config/constants';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { FaEdit, FaShieldAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

// A simple row in the review table
function ReviewRow({ label, value }) {
  return (
    <div className="flex py-2.5 border-b border-gray-100 last:border-0">
      <span className="w-44 text-sm font-semibold text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-900 font-body">{value || '—'}</span>
    </div>
  );
}

// Review section wrapper
function ReviewSection({ title, children, onEdit, stepIndex }) {
  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-bold text-navy-900 text-lg">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(stepIndex)}
          className="flex items-center gap-1.5 text-xs text-navy-700 hover:text-navy-900 font-semibold border border-navy-200 hover:border-navy-400 px-3 py-1.5 rounded-lg transition-colors"
        >
          <FaEdit size={11} /> Edit
        </button>
      </div>
      {children}
    </div>
  );
}

export default function Step4Review({ data, onGoToStep, onSubmit, submitting }) {
  const handlePay = () => {
    // Validate Razorpay key
    if (!RAZORPAY_KEY || RAZORPAY_KEY === 'rzp_test_placeholder') {
      toast.error('Razorpay key not configured. Check your .env file.');
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: ADMISSION.fee * 100, // amount in paise
      currency: ADMISSION.currency,
      name: SCHOOL.fullName,
      description: `Admission Fee — Class ${data.class} — Session ${ADMISSION.sessionYear}`,
      image: '/favicon.svg',
      prefill: {
        name: data.studentName,
        contact: data.mobile,
      },
      notes: {
        studentName: data.studentName,
        class: data.class,
        fatherName: data.fatherName,
      },
      theme: {
        color: '#00228e',
      },
      handler: function (response) {
        // Payment successful — response.razorpay_payment_id
        toast.success('Payment successful! Saving your application…');
        onSubmit(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          toast('Payment cancelled. You can retry.', { icon: 'ℹ️' });
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', () => {
      toast.error('Payment failed. Please try again.');
    });
    razorpay.open();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl text-navy-900 mb-1">Review & Pay</h2>
        <p className="text-gray-500 text-sm font-body">
          Review all details carefully before making payment. Click "Edit" to make changes.
        </p>
      </div>

      {/* Student details */}
      <ReviewSection title="Student Details" onEdit={onGoToStep} stepIndex={1}>
        <ReviewRow label="Full Name" value={data.studentName} />
        <ReviewRow label="Date of Birth" value={formatDate(data.dob)} />
        <ReviewRow label="Gender" value={data.gender} />
        <ReviewRow label="Class Applied For" value={`Class ${data.class}`} />
      </ReviewSection>

      {/* Parent details */}
      <ReviewSection title="Parent / Guardian Details" onEdit={onGoToStep} stepIndex={2}>
        <ReviewRow label="Father's Name" value={data.fatherName} />
        <ReviewRow label="Mother's Name" value={data.motherName} />
        <ReviewRow label="Mobile Number" value={`+91 ${data.mobile}`} />
        <ReviewRow label="Address" value={data.address} />
      </ReviewSection>

      {/* Documents */}
      <ReviewSection title="Documents Uploaded" onEdit={onGoToStep} stepIndex={3}>
        {[
          { label: 'Student Photo', file: data.studentPhoto },
          { label: 'Birth Certificate', file: data.birthCertificate },
          { label: 'Previous Marksheet', file: data.marksheet },
        ].map(({ label, file }) => (
          <div key={label} className="flex py-2.5 border-b border-gray-100 last:border-0 items-center">
            <span className="w-44 text-sm font-semibold text-gray-500 flex-shrink-0">{label}</span>
            {file ? (
              <span className="flex items-center gap-1.5 text-sm text-emerald-700 font-semibold">
                <FaCheckCircle className="text-emerald-500" />
                {file.name}
              </span>
            ) : (
              <span className="text-sm text-gray-400 italic">Not uploaded</span>
            )}
          </div>
        ))}
      </ReviewSection>

      {/* Payment summary */}
      <div className="card bg-navy-50 border-navy-200 mb-6">
        <h3 className="font-heading font-bold text-navy-900 text-lg mb-4">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-body">
            <span className="text-gray-600">Admission Fee (Session {ADMISSION.sessionYear})</span>
            <span className="font-semibold">{formatCurrency(ADMISSION.fee)}</span>
          </div>
          <div className="flex justify-between text-sm font-body">
            <span className="text-gray-600">Processing Fee</span>
            <span className="font-semibold text-emerald-600">₹0</span>
          </div>
          <div className="border-t border-navy-200 pt-2 flex justify-between font-bold text-base text-navy-900">
            <span>Total Payable</span>
            <span>{formatCurrency(ADMISSION.fee)}</span>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 font-body">
          <FaShieldAlt className="text-emerald-500 flex-shrink-0" />
          Payments are secured by Razorpay. We accept UPI, Credit/Debit Cards, and Net Banking.
        </div>
      </div>

      {/* Pay button */}
      <button
        type="button"
        onClick={handlePay}
        disabled={submitting}
        className="w-full btn-saffron flex items-center justify-center gap-3 py-4 text-base"
      >
        {submitting ? (
          <>
            <div className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
            Saving Application…
          </>
        ) : (
          <>
            <FaCreditCard size={18} />
            Proceed to Pay {formatCurrency(ADMISSION.fee)}
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-3 font-body">
        By clicking Pay, you agree to the school's admission terms and conditions.
      </p>
    </div>
  );
}
