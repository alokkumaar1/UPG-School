// src/components/common/ProgressBar.jsx
import { FaCheck } from 'react-icons/fa';

const STEPS = [
  { id: 1, label: 'Student Info' },
  { id: 2, label: 'Parent Info' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Review & Pay' },
];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="w-full px-2">
      <div className="flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-navy-700 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : isActive
                    ? 'bg-navy-800 border-navy-800 text-white shadow-lg scale-110'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isDone ? <FaCheck size={12} /> : step.id}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:block ${
                  isActive ? 'text-navy-800' : isDone ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: current step label */}
      <div className="mt-3 text-center sm:hidden">
        <span className="text-sm font-semibold text-navy-800">
          Step {currentStep}: {STEPS[currentStep - 1]?.label}
        </span>
      </div>
    </div>
  );
}
