import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ 
  title = 'Error', 
  message, 
  onRetry,
  className = '' 
}) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            {title}
          </h3>
          {message && (
            <p className="text-sm text-red-700 mb-3">
              {message}
            </p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm text-red-800 font-medium hover:text-red-900 underline focus:outline-none"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
