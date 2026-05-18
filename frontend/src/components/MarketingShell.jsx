import { Link, NavLink } from 'react-router-dom';

import { marketingNavItems } from '../data/discoverySections';

function navLinkClass(isActive) {
  return [
    'rounded-full px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-[#1A3F75] text-white shadow-lg'
      : 'text-slate-700 hover:bg-white/70 hover:text-[#1A3F75]',
  ].join(' ');
}

export default function MarketingShell({ children }) {
  return (
    <div className="min-h-screen bg-[#DCE8F2] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/30 bg-[#DCE8F2]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1A3F75] text-sm font-bold tracking-[0.24em] text-white shadow-lg">
                DC
              </div>

              <div>
                <p className="font-display text-xl font-bold text-[#00002A]">
                  DevConnect
                </p>

                <p className="text-xs text-slate-600">
                  Tech Blogging and Learning Platform
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {marketingNavItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/60"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-[#1A3F75] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#00002A]"
              >
                Join now
              </Link>
            </div>
          </div>

          <nav className="mt-4 flex gap-3 overflow-x-auto pb-1 lg:hidden">
            {marketingNavItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) => `${navLinkClass(isActive)} whitespace-nowrap`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/30 bg-[#DCE8F2] py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1A3F75] text-sm font-bold tracking-[0.24em] text-white shadow-lg">
                DC
              </div>

              <div>
                <p className="font-display text-xl font-bold text-[#00002A]">
                  DevConnect
                </p>

                <p className="text-sm text-slate-600">
                  Built for developers who learn, write, and ship in public.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-lg leading-8 text-slate-700">
              Discover articles, meet developers, share projects, follow learning tracks,
              and build momentum with a stronger community around your work.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-[#00002A]">
              Explore
            </h3>

            <div className="mt-5 space-y-3">
              {marketingNavItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className="block text-sm font-medium text-slate-700 transition hover:text-[#1A3F75]"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-[#00002A]">
              Start Here
            </h3>

            <div className="mt-5 space-y-3 text-sm font-medium text-slate-700">
              <Link to="/register" className="block transition hover:text-[#1A3F75]">
                Create account
              </Link>
              <Link to="/login" className="block transition hover:text-[#1A3F75]">
                Sign in
              </Link>
              <Link to="/feed" className="block transition hover:text-[#1A3F75]">
                Open member feed
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/40 px-5 pt-6 text-sm text-slate-600 sm:px-6">
          Copyright 2026 DevConnect. Built for developers worldwide.
        </div>
      </footer>
    </div>
  );
}
