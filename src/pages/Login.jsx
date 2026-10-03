import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import { set, KEYS } from '../utils/localStorage';

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@gstportal.com');
  const [password, setPassword] = useState('admin123');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const login = () => {
    if (
      email === 'admin@gstportal.com' &&
      password === 'admin123'
    ) {
      set(KEYS.auth, true);
      set(KEYS.user, { name: 'Admin User', email });
      nav('/dashboard');
    } else {
      setError(
        'Invalid demo credentials. Use admin@gstportal.com / admin123'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <div className="hidden bg-brand-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-700">
              G
            </div>
            GST Portal
          </div>

          <div className="mt-24 max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
              Return management workspace
            </p>
            <h1 className="mt-4 text-5xl font-black leading-tight">
              Manage GST returns with confidence.
            </h1>
            <p className="mt-6 text-blue-100">
              Upload, validate, monitor and report on your GST return
              records from one professional workspace.
            </p>
          </div>
        </div>

        <p className="text-sm text-blue-200">
          Frontend demo • No GSTN connection
        </p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white lg:mx-0">
              <ShieldCheck />
            </div>
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-slate-500">
              Sign in to your GST workspace
            </p>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
            <label className="mb-1 block text-sm font-semibold">
              Email / Username
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full border-gray-300 rounded-lg border p-3"
            />

            <label className="mb-1 block text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 pr-10"
              />
              <button
                className="absolute right-3 top-3 text-slate-400"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="my-4 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember Me
              </label>
              <button className="font-semibold text-brand-600">
                Forgot Password?
              </button>
            </div>

            <Button className="w-full" onClick={login}>
              Login
            </Button>

            {/* <Button
              variant="secondary"
              className="mt-2 w-full"
              onClick={() => {
                setEmail('admin@gstportal.com');
                setPassword('admin123');
                set(KEYS.auth, true);
                set(KEYS.user, {
                  name: 'Admin User',
                  email: 'admin@gstportal.com',
                });
                nav('/dashboard');
              }}
            >
              Demo Login
            </Button> */}

            {/* <p className="mt-4 text-center text-sm text-gray-600">
              Demo: admin@gstportal.com / admin123
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
 
