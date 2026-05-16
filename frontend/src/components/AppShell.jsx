import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Avatar from './Avatar';

export default function AppShell({
  title,
  subtitle,
  sidebar,
  children,
}) {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-[#DCE8F2]">

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/20 bg-[#DCE8F2]/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          {/* LEFT */}
          <div>

            <Link
              to="/feed"
              className="text-2xl font-bold tracking-tight text-[#00002A]"
            >
              DevConnect
            </Link>

            <p className="mt-1 text-sm text-slate-600">
              Developer platform for blogs, projects and learning.
            </p>

          </div>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/70 p-1 shadow-lg backdrop-blur-xl">

            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#1A3F75] text-white shadow-md'
                    : 'text-slate-700 hover:bg-white'
                }`
              }
            >
              Feed
            </NavLink>

            <NavLink
              to={`/profile/${user?.username}`}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#1A3F75] text-white shadow-md'
                    : 'text-slate-700 hover:bg-white'
                }`
              }
            >
              Profile
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
            >
              Logout
            </button>

          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">

        {/* CONTENT */}
        <div className="space-y-6">

          {/* HERO */}
          <section className="overflow-hidden rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <p className="mb-2 inline-flex rounded-full bg-[#1A3F75]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                  Developer Community
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-[#00002A] sm:text-4xl">
                  {title}
                </h1>

                {subtitle ? (
                  <p className="mt-2 max-w-2xl text-slate-600">
                    {subtitle}
                  </p>
                ) : null}

              </div>

              {user ? (
                <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#00002A] via-[#1A3F75] to-[#44A4CC] px-5 py-4 text-white shadow-xl">

                  <Avatar
                    src={user.profileImageUrl}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    username={user.username}
                    className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[22px] ring-1 ring-white/20"
                    fallbackClassName="bg-white/15 backdrop-blur-xl"
                    textClassName="text-lg font-bold text-white"
                  />

                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-200">
                      Signed In
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      @{user.username}
                    </p>

                    <p className="text-sm text-slate-200">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {children}
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          {sidebar}
        </aside>
      </main>
    </div>
  );
}
