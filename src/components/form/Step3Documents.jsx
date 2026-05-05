// src/components/form/Step3Documents.jsx
import { useRef } from 'react';
import { FaUpload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { formatFileSize, isImageFile, isPdfOrImage } from '../../utils/helpers';

function UploadField({ id, label, hint, accept, file, onChange, error, validator }) {
  const ref = useRef();

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      if (!validator(f)) {
        alert(`Invalid file type for "${label}". ${hint}`);
        return;
      }
      onChange(f);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const f = e.dataTransfer.files[0];
    if (f) {
      if (!validator(f)) {
        alert(`Invalid file type for "${label}". ${hint}`);
        return;
      }
      onChange(f);
    }
  };

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label} <span className="text-red-500">*</span>
      </label>

      <div
        className={`upload-zone ${error ? 'border-red-400 bg-red-50' : file ? 'border-emerald-400 bg-emerald-50' : ''}`}
        onClick={() => ref.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
        onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
        onDrop={handleDrop}
      >
        <input
          ref={ref}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />

        {file ? (
          <div className="flex items-center justify-center gap-3 text-emerald-700">
            <FaCheckCircle size={20} className="text-emerald-500" />
            <div className="text-left">
              <p className="font-semibold text-sm">{file.name}</p>
              <p className="text-xs text-emerald-600">{formatFileSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="ml-2 text-red-500 hover:text-red-700"
              title="Remove file"
            >
              <FaTimesCircle />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <FaUpload size={24} />
            <p className="text-sm font-semibold text-gray-600">
              Click or drag file here to upload
            </p>
            <p className="text-xs">{hint}</p>
          </div>
        )}
      </div>

      {/* Image preview */}
      {file && file.type.startsWith('image/') && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="h-24 rounded-lg border border-gray-200 object-cover"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function Step3Documents({ data, onChange, errors }) {
  const handle = (field) => (file) => onChange({ ...data, [field]: file });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-heading font-bold text-2xl text-navy-900 mb-1">Document Upload</h2>
        <p className="text-gray-500 text-sm font-body">
          Upload clear scans or photos of the required documents.
        </p>
      </div>

      <UploadField
        id="studentPhoto"
        label="Student Passport Photo"
        hint="JPG, PNG — max 2MB"
        accept="image/*"
        file={data.studentPhoto}
        onChange={handle('studentPhoto')}
        error={errors.studentPhoto}
        validator={isImageFile}
      />

      <UploadField
        id="birthCertificate"
        label="Birth Certificate"
        hint="JPG, PNG, or PDF — max 5MB"
        accept="image/*,application/pdf"
        file={data.birthCertificate}
        onChange={handle('birthCertificate')}
        error={errors.birthCertificate}
        validator={isPdfOrImage}
      />

      <UploadField
        id="marksheet"
        label="Previous Class Marksheet / Transfer Certificate"
        hint="JPG, PNG, or PDF — max 5MB (not required for Class 1)"
        accept="image/*,application/pdf"
        file={data.marksheet}
        onChange={handle('marksheet')}
        error={errors.marksheet}
        validator={isPdfOrImage}
      />

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 font-body">
        <strong>⚠️ Important:</strong> Uploaded documents must be clear and legible. Blurry or
        cropped documents may result in rejection. Original documents will be verified at the
        time of physical admission.
      </div>
    </div>
  );
}
