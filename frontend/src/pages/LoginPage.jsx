import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import AuthLayout from '../components/AuthLayout';
import PasswordField from '../components/PasswordField';

import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../services/errorService';

export default function LoginPage() {
  const { login, loading, sessionMessage, clearSessionMessage } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');

  const [captchaToken, setCaptchaToken] = useState('');

  const redirectTo = useMemo(
    () => location.state?.from?.pathname || '/feed',
    [location.state]
  );
  const recaptchaSiteKey =
    import.meta.env
      .VITE_RECAPTCHA_SITE_KEY;
  const captchaEnabled = Boolean(
    recaptchaSiteKey,
  );

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    clearSessionMessage();

    if (
      captchaEnabled &&
      !captchaToken
    ) {
      setError('Please complete CAPTCHA verification.');
      return;
    }

    try {
      await login({
        ...form,
        captchaToken,
      });

      navigate(redirectTo, { replace: true });
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to sign in right now.'
        )
      );
    }
  }

  useEffect(() => {
    document.title = 'Login | DevConnect';
  }, []);

  return (
    <AuthLayout>
      <div className="grid min-h-screen overflow-hidden rounded-[32px] border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#00002A] via-[#1A3F75] to-[#44A4CC] lg:flex lg:flex-col lg:justify-between px-10 py-10 text-white">

          {/* GLOW */}
          <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-[#44A4CC]/20 blur-3xl" />

          <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-[#44E6A9]/10 blur-3xl" />

          <div className="relative z-10">

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#1A3F75] shadow-lg">
                DC
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  DevConnect
                </h2>

                <p className="text-sm text-slate-200">
                  Developer Community Platform
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-20">

              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#44E6A9]">
                WELCOME BACK
              </p>

              <h1 className="mt-5 max-w-md text-5xl font-bold leading-tight tracking-tight">
                Continue building your developer journey.
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-200">
                Connect with developers, explore technical blogs,
                and continue learning modern technologies.
              </p>

            </div>

            {/* TAGS */}
            <div className="mt-10 flex flex-wrap gap-3">

              {[
                'React',
                'Spring Boot',
                'Docker',
                'Java',
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl"
                >
                  #{tag}
                </span>
              ))}

            </div>
          </div>

          {/* CARD */}
          <div className="relative z-10 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

            <p className="text-sm text-slate-200">
              Active developers this week
            </p>

            <div className="mt-3 flex items-end gap-3">

              <h3 className="text-4xl font-bold text-white">
                1.2K+
              </h3>

              <span className="mb-1 text-sm text-[#44E6A9]">
                ↗ Growing fast
              </span>

            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#44E6A9] to-[#44A4CC]" />

            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center bg-[#DCE8F2] px-8 py-10">

          <div className="w-full max-w-md">

            {/* HEADER */}
            <div className="space-y-2">

              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                SIGN IN
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-[#00002A]">
                Welcome back
              </h2>

              <p className="text-sm leading-7 text-slate-600">
                Continue your journey with DevConnect.
              </p>

            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/40 bg-white/80 px-5 py-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition hover:bg-white"
            >
              <span className="text-lg">
                G
              </span>

              Continue with Google
            </button>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-300" />

              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                or
              </span>

              <div className="h-px flex-1 bg-slate-300" />
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* USERNAME */}
              <label className="block">

                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Email or Username
                </span>

                <input
                  className="field"
                  value={form.username}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  placeholder="name@example.com"
                  autoComplete="username"
                />
              </label>

              {/* PASSWORD */}
              <PasswordField
                label="Password"
                value={form.password}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    password: value,
                  }))
                }
                visible={showPassword}
                onToggle={() =>
                  setShowPassword((current) => !current)
                }
                placeholder="Enter your password"
              />

              {/* CAPTCHA */}
              {captchaEnabled ? (
                <div className="flex justify-center pt-2">

                  <ReCAPTCHA
                    sitekey={recaptchaSiteKey}
                    onChange={(token) =>
                      setCaptchaToken(token)
                    }
                  />

                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-4 py-3 text-sm text-slate-500">
                  CAPTCHA is optional for this deployment and has not been configured.
                </div>
              )}

              {/* MESSAGE */}
              {sessionMessage ? (
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {sessionMessage}
                </p>
              ) : null}

              {/* ERROR */}
              {error ? (
                <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              ) : null}

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#1A3F75] px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#00002A]"
                disabled={loading}
              >
                {loading
                  ? 'Signing in...'
                  : 'Enter DevConnect'}
              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 border-t border-slate-200 pt-6">

              <p className="text-sm text-slate-600">

                New to DevConnect?{' '}

                <Link
                  to="/register"
                  className="font-semibold text-[#1A3F75] transition hover:text-[#00002A]"
                >
                  Create account
                </Link>

              </p>

            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
