import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../../api/api';

export default function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState('');

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // =========================
  // LOGIN SUBMIT
  // =========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError('');
    setLoading(true);

    try {

      const response = await api.post(
        '/auth/login',
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      localStorage.setItem(
        'adminToken',
        token
      );

      localStorage.setItem(
        'adminData',
        JSON.stringify(response.data.admin)
      );

      navigate('/admin/dashboard');

    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        'Login failed'
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Login to access dashboard
          </p>

        </div>

        {/* ERROR */}

        {error && (

          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">

            {error}

          </div>

        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                id="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                required
                disabled={loading}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3.5 text-gray-500"
              >

                {showPassword
                  ? <EyeOff size={20} />
                  : <Eye size={20} />
                }

              </button>

            </div>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >

            {loading
              ? 'Logging in...'
              : 'Login'
            }

          </button>

        </form>

      </div>

    </div>
  );
}