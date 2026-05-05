// src/components/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gray-50">
      <div className="font-heading font-bold text-8xl text-navy-200 mb-4">404</div>
      <h1 className="font-heading font-bold text-2xl text-navy-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 font-body mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">← Go to Homepage</Link>
    </div>
  );
}
