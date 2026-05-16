import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import Avatar from '../components/Avatar';
import AuthLayout from '../components/AuthLayout';

import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { getApiErrorMessage } from '../services/errorService';

const EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'icloud.com',
];

const COUNTRY_CODES = [
  { flag: '🇮🇳', code: '+91', country: 'India' },
  { flag: '🇺🇸', code: '+1', country: 'USA' },
  { flag: '🇬🇧', code: '+44', country: 'UK' },
];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  countryCode: '+91',
  mobile: '',
  profileImageUrl: '',
};

export default function RegisterPage() {
  const { register, loading } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState('');

  const [suggestions, setSuggestions] =
    useState({
      usernameSuggestions: [],
      emailSuggestions: [],
    });

  const [activeDropdown, setActiveDropdown] =
    useState(null);

  const hasSuggestionInputs = useMemo(
    () =>
      Boolean(
        form.firstName.trim() &&
          form.lastName.trim()
      ),
    [form.firstName, form.lastName]
  );

  useEffect(() => {
    document.title = 'Register | DevConnect';
  }, []);

  useEffect(() => {
    const firstName = form.firstName.trim();

    const lastName = form.lastName.trim();

    if (!firstName || !lastName) {
      setSuggestions({
        usernameSuggestions: [],
        emailSuggestions: [],
      });

      return;
    }

    const timerId = window.setTimeout(async () => {
      try {
        const { data } =
          await authService.getSuggestions({
            firstName,
            lastName,
          });

        setSuggestions({
          usernameSuggestions:
            data.usernameSuggestions || [],
          emailSuggestions:
            data.emailSuggestions || [],
        });
      } catch {
        setSuggestions({
          usernameSuggestions: [],
          emailSuggestions: [],
        });
      }
    }, 350);

    return () => window.clearTimeout(timerId);
  }, [form.firstName, form.lastName]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    try {
      await register({
        ...form,
        profileImageUrl:
          form.profileImageUrl.trim() || null,

        mobile: `${form.countryCode.replace(
          '+',
          ''
        )}${form.mobile.replace(/\D/g, '')}`,
      });

      navigate('/feed', {
        replace: true,
      });
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          'Unable to create your account right now.'
        )
      );
    }
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

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

            {/* HERO */}
            <div className="mt-20">

              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#44E6A9]">
                JOIN DEVCONNECT
              </p>

              <h1 className="mt-5 max-w-md text-5xl font-bold leading-tight tracking-tight">
                Create your developer identity.
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-200">
                Publish blogs, connect with developers,
                and showcase your technical journey.
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
              Developers joined this week
            </p>

            <div className="mt-3 flex items-end gap-3">

              <h3 className="text-4xl font-bold text-white">
                +245
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
        <div className="flex items-center justify-center bg-[#DCE8F2] px-8 py-8">

          <div className="w-full max-w-lg">

            {/* HEADER */}
            <div className="space-y-2">

              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                CREATE ACCOUNT
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-[#00002A]">
                Join DevConnect
              </h2>

              <p className="text-sm leading-7 text-slate-600">
                Build your developer presence and connect with the tech community.
              </p>

            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/40 bg-white/80 px-5 py-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition hover:bg-white"
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
              className="grid gap-4 sm:grid-cols-2"
            >

              {/* FIRST */}
              <Field
                label="First Name"
                value={form.firstName}
                onChange={(value) =>
                  updateField('firstName', value)
                }
                placeholder="Ava"
              />

              {/* LAST */}
              <Field
                label="Last Name"
                value={form.lastName}
                onChange={(value) =>
                  updateField('lastName', value)
                }
                placeholder="Stone"
              />

              {/* EMAIL */}
              <div className="relative sm:col-span-2">

                <Field
                  label="Email"
                  value={form.email}
                  onChange={(value) => {
                    updateField('email', value);

                    if (value.includes('@')) {
                      setActiveDropdown('email');
                    } else {
                      setActiveDropdown(null);
                    }
                  }}
                  placeholder="yourname@gmail.com"
                />

                {activeDropdown === 'email' &&
                  form.email.includes('@') && (
                    <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                      {(suggestions.emailSuggestions.length
                        ? suggestions.emailSuggestions
                        : EMAIL_DOMAINS.map((domain) => {
                            const username =
                              form.email.split('@')[0];

                            return `${username}@${domain}`;
                          })).map((suggestedEmail) => (
                        <button
                          key={suggestedEmail}
                          type="button"
                          onClick={() => {
                            updateField(
                              'email',
                              suggestedEmail,
                            );

                            setActiveDropdown(null);
                          }}
                          className="flex w-full items-center px-4 py-3 text-left text-sm transition hover:bg-slate-50"
                        >
                          {suggestedEmail}
                        </button>
                      ))}

                    </div>
                  )}
              </div>

              {/* USERNAME */}
              <div className="relative sm:col-span-2">

                <Field
                  label="Username"
                  value={form.username}
                  onChange={(value) =>
                    updateField('username', value)
                  }
                  placeholder="avastone"
                  onFocus={() =>
                    setActiveDropdown('username')
                  }
                />

                {hasSuggestionInputs &&
                  activeDropdown === 'username' &&
                  suggestions.usernameSuggestions.length > 0 && (
                    <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                      {suggestions.usernameSuggestions.map(
                        (item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              updateField(
                                'username',
                                item
                              );

                              setActiveDropdown(null);
                            }}
                            className="flex w-full items-center px-4 py-3 text-left text-sm transition hover:bg-slate-50"
                          >
                            {item}
                          </button>
                        )
                      )}

                    </div>
                  )}
              </div>

              {/* MOBILE */}
              <div className="sm:col-span-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Profile Picture URL
                    <span className="ml-2 text-slate-400">
                      Optional
                    </span>
                  </span>

                  <input
                    type="url"
                    className="field"
                    value={form.profileImageUrl}
                    onChange={(event) =>
                      updateField(
                        'profileImageUrl',
                        event.target.value,
                      )
                    }
                    placeholder="https://example.com/avatar.jpg"
                  />
                </label>

                <div className="mt-4 flex items-center gap-4 rounded-3xl border border-white/40 bg-white/70 px-4 py-4 shadow-sm backdrop-blur-xl">
                  <Avatar
                    src={form.profileImageUrl}
                    firstName={form.firstName}
                    lastName={form.lastName}
                    username={form.username}
                    className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-slate-200"
                    fallbackClassName="bg-gradient-to-br from-[#1A3F75]/10 via-white to-[#44A4CC]/20"
                    textClassName="text-lg font-bold text-[#00002A]"
                  />

                  <div>
                    <p className="font-semibold text-[#00002A]">
                      Profile preview
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Add a profile image now or keep the default initials avatar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">

                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Mobile Number
                </span>

                <div className="grid grid-cols-[120px_1fr] gap-3">

                  <div className="relative">

                    <select
                      value={form.countryCode}
                      onChange={(event) =>
                        updateField(
                          'countryCode',
                          event.target.value
                        )
                      }
                      className="field appearance-none pr-10"
                    >

                      {COUNTRY_CODES.map((item) => (
                        <option
                          key={`${item.country}-${item.code}`}
                          value={item.code}
                        >
                          {item.flag} {item.code}
                        </option>
                      ))}

                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                      ▼
                    </div>
                  </div>

                  <input
                    type="tel"
                    className="field"
                    value={form.mobile}
                    onChange={(event) =>
                      updateField(
                        'mobile',
                        event.target.value.replace(
                          /\D/g,
                          ''
                        )
                      )
                    }
                    placeholder="9876543210"
                    maxLength={15}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="sm:col-span-2">

                <label className="block">

                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </span>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={form.password}
                      onChange={(event) =>
                        updateField(
                          'password',
                          event.target.value
                        )
                      }
                      placeholder="Create password"
                      className="field w-full pr-14"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) =>
                            !current
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >

                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                    </button>
                  </div>
                </label>
              </div>

              {/* ERROR */}
              {error ? (
                <p className="sm:col-span-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              ) : null}

              {/* BUTTON */}
              <div className="sm:col-span-2 pt-1">

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#1A3F75] px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#00002A]"
                  disabled={loading}
                >
                  {loading
                    ? 'Creating account...'
                    : 'Create DevConnect Account'}
                </button>

              </div>
            </form>

            {/* FOOTER */}
            <div className="mt-7 border-t border-slate-200 pt-6">

              <p className="text-sm text-slate-600">

                Already have an account?{' '}

                <Link
                  to="/login"
                  className="font-semibold text-[#1A3F75] transition hover:text-[#00002A]"
                >
                  Sign in
                </Link>

              </p>

            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  onFocus,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        onFocus={onFocus}
        className="field"
      />

    </label>
  );
}
