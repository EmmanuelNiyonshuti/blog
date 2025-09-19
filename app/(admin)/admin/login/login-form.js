'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { API_BASE_URL } from '@/lib/api';

const LoginForm = () => {
  console.log("loggin form......");
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      if (response.status === 429){
          setTimeout(() => {
            router.push('/');
            router.refresh();
          }, 1000);
      }
      if (response.ok) {
        const data = await response.json();
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 100);
        
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Login</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">new idea, thought in mind! Login👇</p>
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="emmanuel@example.com"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l1.809 1.81A11.237 11.237 0 0 0 1.715 12.03a.75.75 0 0 0 0 .94C3.29 15.44 6.93 19.5 12 19.5a10.89 10.89 0 0 0 4.58-1.01l2.89 2.89a.75.75 0 1 0 1.06-1.06L3.53 2.47ZM12 18c-4.37 0-7.52-3.58-8.93-6a9.9 9.9 0 0 1 3.03-3.37l2.2 2.2A4.5 4.5 0 0 0 12 16.5c.73 0 1.42-.17 2.03-.48l1.1 1.1A9.38 9.38 0 0 1 12 18Zm0-3a3 3 0 0 1-2.96-2.53l4.43 4.43A2.99 2.99 0 0 1 12 15Zm0-10.5c4.37 0 7.52 3.58 8.93 6-.577 1.019-1.377 2.115-2.34 3.13l-1.073-1.073a9.78 9.78 0 0 0 2.044-2.057C18.71 8.56 15.07 4.5 10 4.5c-1.11 0-2.15.2-3.1.56l1.17 1.17A10.89 10.89 0 0 1 12 6c.73 0 1.42.17 2.03.48l-1.1-1.1A9.38 9.38 0 0 0 12 4.5Z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 5.25c-6.38 0-10 6.03-10 6.75s3.62 6.75 10 6.75 10-6.03 10-6.75-3.62-6.75-10-6.75Zm0 11.25a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
  )
}

export default LoginForm