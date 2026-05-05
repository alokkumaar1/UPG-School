// src/components/pages/AdmissionForm.jsx
// Multi-step admission form controller

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProgressBar from '../common/ProgressBar';
import Step1Student from '../form/Step1Student';
import Step2Parent from '../form/Step2Parent';
import Step3Documents from '../form/Step3Documents';
import Step4Review from '../form/Step4Review';
import { useAdmission } from '../../hooks/useAdmission';
import { isValidMobile } from '../../utils/helpers';
import { ADMISSION } from '../../config/constants';

// Initial empty form state
const INIT = {
  // Step 1
  studentName: '',
  dob: '',
  gender: '',
  class: '',
  // Step 2
  fatherName: '',
  motherName: '',
  mobile: '',
  address: '',
  // Step 3 (files)
  studentPhoto: null,
  birthCertificate: null,
  marksheet: null,
};

// Per-step validation
function validateStep(step, data) {
  const errs = {};

  if (step === 1) {
    if (!data.studentName.trim()) errs.studentName = 'Full name is required.';
    if (!data.dob) errs.dob = 'Date of birth is required.';
    if (!data.gender) errs.gender = 'Please select a gender.';
    if (!data.class) errs.class = 'Please select a class.';
  }

  if (step === 2) {
    if (!data.fatherName.trim()) errs.fatherName = "Father's name is required.";
    if (!data.motherName.trim()) errs.motherName = "Mother's name is required.";
    if (!data.mobile.trim()) {
      errs.mobile = 'Mobile number is required.';
    } else if (!isValidMobile(data.mobile)) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (!data.address.trim()) errs.address = 'Address is required.';
  }

  if (step === 3) {
    if (!data.studentPhoto) errs.studentPhoto = 'Student photo is required.';
    if (!data.birthCertificate) errs.birthCertificate = 'Birth certificate is required.';
    // Marksheet not mandatory for Class 1
    if (!data.marksheet && data.class !== '1') {
      errs.marksheet = 'Previous marksheet is required (not needed for Class 1).';
    }
  }

  return errs;
}

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INIT);
  const [errors, setErrors] = useState({});
  const { loading, submitAdmission } = useAdmission();
  const navigate = useNavigate();

  const totalSteps = 4;

  // Move to next step with validation
  const handleNext = () => {
    const errs = validateStep(step, formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fill all required fields correctly.');
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump to a specific step (from review page edit buttons)
  const handleGoToStep = (s) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final submit — called after Razorpay payment success
  const handleSubmit = async (paymentId) => {
    const result = await submitAdmission(formData, paymentId);
    if (result.success) {
      navigate('/confirmation', {
        state: {
          applicationId: result.applicationId,
          applicationData: { ...formData, ...result.applicationData, paymentId },
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      {/* Page header */}
      <div className="bg-navy-900 text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-saffron-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Session {ADMISSION.sessionYear}
          </p>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
            Online Admission Form
          </h1>
          <p className="text-navy-300 font-body text-sm">
            UPG+2 High School, Lawahikala, Dandai, Garhwa
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress bar */}
        <div className="card mb-8">
          <ProgressBar currentStep={step} />
        </div>

        {/* Form card */}
        <div className="card">
          {step === 1 && (
            <Step1Student data={formData} onChange={setFormData} errors={errors} />
          )}
          {step === 2 && (
            <Step2Parent data={formData} onChange={setFormData} errors={errors} />
          )}
          {step === 3 && (
            <Step3Documents data={formData} onChange={setFormData} errors={errors} />
          )}
          {step === 4 && (
            <Step4Review
              data={formData}
              onGoToStep={handleGoToStep}
              onSubmit={handleSubmit}
              submitting={loading}
            />
          )}

          {/* Navigation buttons (not shown on step 4 which has its own pay button) */}
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="btn-secondary px-8 disabled:opacity-30"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary px-8"
              >
                Next →
              </button>
            </div>
          )}

          {/* Back button on step 4 */}
          {step === 4 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="btn-secondary w-full"
              >
                ← Go Back & Edit
              </button>
            </div>
          )}
        </div>

        {/* Step counter */}
        <p className="text-center text-xs text-gray-400 mt-4 font-body">
          Step {step} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
