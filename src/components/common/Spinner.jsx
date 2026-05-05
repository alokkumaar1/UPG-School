// src/components/common/Spinner.jsx
export default function Spinner({ size = 'md', text = '' }) {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeMap[size]} rounded-full border-navy-200 border-t-navy-800 animate-spin`}
      />
      {text && <p className="text-sm text-gray-500 font-body">{text}</p>}
    </div>
  );
}
