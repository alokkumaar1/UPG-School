// src/components/form/Step1Student.jsx
import { ADMISSION } from '../../config/constants';

export default function Step1Student({ data, onChange, errors }) {
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="font-heading font-bold text-2xl text-navy-900 mb-1">Student Details</h2>
        <p className="text-gray-500 text-sm font-body">Enter the student's personal information below.</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="label" htmlFor="studentName">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="studentName"
          name="studentName"
          type="text"
          value={data.studentName}
          onChange={handle}
          placeholder="Enter student's full name (as in documents)"
          className={`input-field ${errors.studentName ? 'input-error' : ''}`}
        />
        {errors.studentName && (
          <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="label" htmlFor="dob">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={data.dob}
          onChange={handle}
          max={new Date().toISOString().split('T')[0]}
          className={`input-field ${errors.dob ? 'input-error' : ''}`}
        />
        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="label">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4 flex-wrap">
          {['Male', 'Female', 'Other'].map((g) => (
            <label
              key={g}
              className={`flex items-center gap-2 cursor-pointer px-5 py-3 rounded-lg border-2 transition-all duration-150 font-body text-sm ${
                data.gender === g
                  ? 'border-navy-700 bg-navy-50 text-navy-800 font-semibold'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={g}
                checked={data.gender === g}
                onChange={handle}
                className="accent-navy-800"
              />
              {g}
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
      </div>

      {/* Class */}
      <div>
        <label className="label" htmlFor="class">
          Class Applying For <span className="text-red-500">*</span>
        </label>
        <select
          id="class"
          name="class"
          value={data.class}
          onChange={handle}
          className={`input-field ${errors.class ? 'input-error' : ''}`}
        >
          <option value="">-- Select Class --</option>
          {ADMISSION.classes.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
      </div>

      {/* Info note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 font-body">
        <strong>Note:</strong> Ensure that the student's name and date of birth match exactly
        with the Birth Certificate / Aadhar Card.
      </div>
    </div>
  );
}
