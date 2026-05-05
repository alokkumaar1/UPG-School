// src/components/form/Step2Parent.jsx

export default function Step2Parent({ data, onChange, errors }) {
  const handle = (e) => onChange({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="font-heading font-bold text-2xl text-navy-900 mb-1">Parent / Guardian Details</h2>
        <p className="text-gray-500 text-sm font-body">Provide accurate contact information for official communication.</p>
      </div>

      {/* Father's Name */}
      <div>
        <label className="label" htmlFor="fatherName">
          Father's Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fatherName"
          name="fatherName"
          type="text"
          value={data.fatherName}
          onChange={handle}
          placeholder="Enter father's full name"
          className={`input-field ${errors.fatherName ? 'input-error' : ''}`}
        />
        {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
      </div>

      {/* Mother's Name */}
      <div>
        <label className="label" htmlFor="motherName">
          Mother's Name <span className="text-red-500">*</span>
        </label>
        <input
          id="motherName"
          name="motherName"
          type="text"
          value={data.motherName}
          onChange={handle}
          placeholder="Enter mother's full name"
          className={`input-field ${errors.motherName ? 'input-error' : ''}`}
        />
        {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName}</p>}
      </div>

      {/* Mobile Number */}
      <div>
        <label className="label" htmlFor="mobile">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">
            +91
          </span>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            value={data.mobile}
            onChange={handle}
            maxLength={10}
            placeholder="10-digit mobile number"
            className={`input-field pl-12 ${errors.mobile ? 'input-error' : ''}`}
          />
        </div>
        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        <p className="text-gray-400 text-xs mt-1 font-body">
          OTP and SMS notifications will be sent to this number.
        </p>
      </div>

      {/* Address */}
      <div>
        <label className="label" htmlFor="address">
          Residential Address <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows={4}
          value={data.address}
          onChange={handle}
          placeholder="House No., Village/Colony, Block, District, State, PIN"
          className={`input-field resize-none ${errors.address ? 'input-error' : ''}`}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>
    </div>
  );
}
