import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import MarketingShell from '../components/MarketingShell';

const homeHighlights = [
  {
    title: 'Write technical blogs',
    description:
      'Publish tutorials, implementation notes, engineering lessons, and practical advice other developers can use.',
  },
  {
    title: 'Showcase serious projects',
    description:
      'Share your stack, roadmap, live demos, and the decisions behind the work you are proud to ship.',
  },
  {
    title: 'Learn with community context',
    description:
      'Move through articles, learning tracks, and shared feedback without bouncing between disconnected tools.',
  },
];

export default function HomePage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00002A] via-[#1A3F75] to-[#44A4CC] text-white">
        <div className="absolute left-[-100px] top-[-100px] h-80 w-80 rounded-full bg-[#44A4CC]/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#44E6A9]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#44E6A9]">
              DevConnect Community
            </p>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
              Learn, build, and share with developers who are actually shipping.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">
              DevConnect is a modern platform for technical writing, project showcasing,
              collaborative learning, and developer community growth.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#1A3F75] shadow-xl transition hover:-translate-y-1 hover:bg-slate-100"
              >
                Join DevConnect
              </Link>

              <Link
                to="/articles"
                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
              >
                Explore Articles
              </Link>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-4xl font-bold text-white">120+</p>
                <p className="mt-2 text-sm text-slate-200">Active developers</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-4xl font-bold text-white">45+</p>
                <p className="mt-2 text-sm text-slate-200">Technical blogs</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-4xl font-bold text-white">15+</p>
                <p className="mt-2 text-sm text-slate-200">Learning tracks</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="rounded-3xl bg-white/92 p-7 text-slate-900 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A3F75] text-lg font-bold text-white">
                  AS
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                    Community Spotlight
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-[#00002A]">
                    Ava shared a full build journal for her latest platform release.
                  </h2>
                </div>
              </div>

              <p className="mt-6 leading-8 text-slate-700">
                Just wrapped up JWT authentication, profile discovery, and a polished
                public landing experience. Sharing the roadmap, architecture notes, and
                lessons learned with the DevConnect community.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-bold text-[#00002A]">42</p>
                  <p className="mt-1 text-sm text-slate-600">Likes</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-bold text-[#00002A]">12</p>
                  <p className="mt-1 text-sm text-slate-600">Comments</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-bold text-[#00002A]">8</p>
                  <p className="mt-1 text-sm text-slate-600">Collaborators joined</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1A3F75]">
            Why DevConnect
          </p>

          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#00002A]">
            Built for modern developers
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {homeHighlights.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-[32px] border border-white/40 bg-white/70 p-8 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="inline-flex rounded-full bg-[#DCE8F2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                Core experience
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold text-[#00002A]">
                {feature.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-[#CFE0EE] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1A3F75]">
                Why Teams Stay
              </p>

              <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[#00002A]">
                One place for writing, learning, project momentum, and developer visibility.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              DevConnect gives developers a cleaner way to grow in public without splitting
              their work across too many disconnected platforms.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Public proof of work',
                description:
                  'Show the work behind your ideas with technical writing, launch notes, and visible progress updates.',
              },
              {
                title: 'Better learning loops',
                description:
                  'Move from reading to practice faster by keeping tutorials, feedback, and community discussion close together.',
              },
              {
                title: 'Meaningful developer reach',
                description:
                  'Grow your network through projects, useful insights, and collaboration instead of shallow posting.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/70 bg-white/80 p-7 shadow-panel backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1A3F75]">
                  Core value
                </p>

                <h3 className="mt-4 font-display text-2xl font-bold text-[#00002A]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        <div className="rounded-[36px] bg-[#00002A] px-6 py-12 text-white shadow-2xl sm:px-10 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#44E6A9]">
                Community Driven
              </p>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Connect with developers, learn faster, and grow together.
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-slate-200">
                DevConnect brings technical writing, project sharing, community feedback,
                and guided learning into one experience that feels connected.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/community"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#1A3F75] transition hover:bg-slate-100"
              >
                Visit Community
              </Link>

              <Link
                to="/developers"
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Explore Developers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
