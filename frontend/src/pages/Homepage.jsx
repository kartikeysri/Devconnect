
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function DevConnectHomePage() {
  const features = [
    {
      title: 'Write Technical Blogs',
      description:
        'Publish tutorials, coding insights, development experiences, and engineering discussions.',
      icon: '📝',
    },
    {
      title: 'Showcase Projects',
      description:
        'Share your applications, GitHub repositories, and portfolio work with the developer community.',
      icon: '🚀',
    },
    {
      title: 'Learn Together',
      description:
        'Explore modern technologies, trending tools, and real-world development practices.',
      icon: '💡',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#DCE8F2] text-slate-900">

      {/* NAVBAR */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-white/20 bg-[#DCE8F2]/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A3F75] text-lg font-bold text-white shadow-lg">
              DC
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#00002A]">
                DevConnect
              </h1>

              <p className="text-xs text-slate-600">
                Tech Blogging & Learning Platform
              </p>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden items-center gap-8 lg:flex">
            {[
              'Articles',
              'Developers',
              'Projects',
              'Learning',
              'Community',
            ].map((item) => (
              <button
                key={item}
                className="text-sm font-medium text-slate-700 transition hover:text-[#1A3F75]"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="rounded-xl px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/60"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-[#1A3F75] px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-[#00002A]"
            >
              Join now
            </Link>

          </div>
        </div>
      </motion.header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00002A] via-[#1A3F75] to-[#44A4CC] text-white">

        {/* GLOW */}
        <div className="absolute left-[-100px] top-[-100px] h-80 w-80 rounded-full bg-[#44A4CC]/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#44E6A9]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#44E6A9]">
              DEVCONNECT COMMUNITY
            </p>

            <h1 className="mt-6 max-w-2xl text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
              Learn. Build. Share.
              <span className="block text-[#44E6A9]">
                Grow with developers worldwide.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">
              DevConnect is a modern platform for developers to write technical blogs,
              showcase projects, learn new technologies, and connect with the tech community.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/register"
                className="rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#1A3F75] shadow-xl transition hover:-translate-y-1 hover:bg-slate-100"
              >
                Join DevConnect
              </Link>

              <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/20">
                Explore Articles
              </button>

            </div>

            {/* STATS */}
            <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-8">

              <div>
                <p className="text-4xl font-bold text-white">
                  120+
                </p>

                <p className="mt-2 text-sm text-slate-200">
                  Active developers
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold text-white">
                  45+
                </p>

                <p className="mt-2 text-sm text-slate-200">
                  Technical blogs
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold text-white">
                  15+
                </p>

                <p className="mt-2 text-sm text-slate-200">
                  Learning tracks
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >

            <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">

              <div className="rounded-3xl bg-white/90 p-6 text-slate-900 shadow-xl backdrop-blur-xl">

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A3F75] text-lg font-bold text-white">
                    AS
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Ava Stone
                    </h3>

                    <p className="text-sm text-slate-500">
                      Full Stack Developer
                    </p>
                  </div>

                </div>

                <p className="mt-5 leading-8 text-slate-700">
                  Just completed JWT authentication using Spring Boot and React 🚀
                  Building DevConnect into a modern developer platform.
                </p>

                <div className="mt-6 flex items-center gap-6 border-t border-slate-100 pt-5 text-sm text-slate-500">
                  <span>👍 42 Likes</span>
                  <span>💬 12 Comments</span>
                  <span>↗ Share</span>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1A3F75]">
            WHY DEVCONNECT
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#00002A]">
            Built for modern developers
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {features.map((feature) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={feature.title}
              className="rounded-[32px] border border-white/40 bg-white/70 p-8 shadow-lg backdrop-blur-xl transition hover:shadow-2xl"
            >

              <div className="text-5xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#00002A]">
                {feature.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {feature.description}
              </p>

            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="bg-[#CFE0EE] py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">

            {/* LEFT */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1A3F75]">
                COMMUNITY DRIVEN
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#00002A] lg:text-5xl">
                Connect with developers,
                learn faster and grow together.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-700">
                DevConnect helps developers discover learning resources,
                share technical insights, collaborate on projects,
                and build a strong professional presence online.
              </p>

            </div>

            {/* RIGHT */}
            <div className="grid gap-6">

              <div className="rounded-[32px] bg-gradient-to-br from-[#1A3F75] to-[#44A4CC] p-[1px] shadow-2xl">

                <div className="rounded-[31px] bg-white/90 p-8 backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-500">
                        Weekly Community Growth
                      </p>

                      <h3 className="mt-2 text-4xl font-bold text-[#00002A]">
                        +245%
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-[#44A4CC]/10 px-4 py-3 text-[#1A3F75]">
                      📈
                    </div>

                  </div>

                  <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-100">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '78%' }}
                      transition={{ duration: 1.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#1A3F75] to-[#44A4CC]"
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/20 bg-[#DCE8F2] py-16">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_auto_auto_auto]">

          {/* BRAND */}
          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A3F75] text-lg font-bold text-white shadow-lg">
                DC
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#00002A]">
                  DevConnect
                </h3>

                <p className="text-sm text-slate-600">
                  Tech Blogging & Learning Platform
                </p>
              </div>

            </div>

            <p className="mt-6 max-w-md leading-8 text-slate-700">
              DevConnect is a modern developer platform focused on technical blogging,
              learning, networking, and project showcasing.
            </p>

          </div>

          {[
            {
              title: 'Platform',
              items: ['Articles', 'Projects', 'Developers', 'Learning'],
            },
            {
              title: 'Resources',
              items: ['Documentation', 'Community', 'Guides', 'Help Center'],
            },
            {
              title: 'Company',
              items: ['About', 'Privacy', 'Terms', 'Contact'],
            },
          ].map((section) => (
            <div key={section.title}>

              <h4 className="font-semibold text-[#00002A]">
                {section.title}
              </h4>

              <div className="mt-5 space-y-4">

                {section.items.map((item) => (
                  <button
                    key={item}
                    className="block text-sm text-slate-700 transition hover:text-[#1A3F75]"
                  >
                    {item}
                  </button>
                ))}

              </div>
            </div>
          ))}

        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/30 px-6 pt-8 text-sm text-slate-600">
          © 2026 DevConnect. Built for developers worldwide.
        </div>
      </footer>
    </div>
  );
}
