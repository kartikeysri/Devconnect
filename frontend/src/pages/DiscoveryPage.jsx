import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';

import MarketingShell from '../components/MarketingShell';
import { discoverySections } from '../data/discoverySections';

export default function DiscoveryPage({ sectionKey }) {
  const section = discoverySections[sectionKey];

  if (!section) {
    return <Navigate to="/" replace />;
  }

  return (
    <MarketingShell>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00002A] via-[#1A3F75] to-[#44A4CC] text-white">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#44A4CC]/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-140px] h-96 w-96 rounded-full bg-[#44E6A9]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#44E6A9]">
              {section.eyebrow}
            </p>

            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {section.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {section.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to={section.cta.primaryTo}
                className="rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-[#1A3F75] shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                {section.cta.primaryLabel}
              </Link>

              <Link
                to={section.cta.secondaryTo}
                className="rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
              >
                {section.cta.secondaryLabel}
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {section.stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65 }}
            className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="rounded-[28px] bg-white/92 p-7 text-slate-900 shadow-xl">
              <div className="inline-flex rounded-full bg-[#DCE8F2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                {section.label}
              </div>

              <h2 className="mt-5 font-display text-3xl font-bold text-[#00002A]">
                {section.heroCard.title}
              </h2>

              <div className="mt-6 space-y-4">
                {section.heroCard.items.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1A3F75] text-sm font-bold text-white">
                      0{index + 1}
                    </div>

                    <p className="pt-1 text-sm leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 leading-7 text-slate-600">{section.heroCard.footer}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
              What You Can Explore
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#00002A] sm:text-4xl">
              A stronger frontend experience for {section.label.toLowerCase()}.
            </h2>
          </div>

          <p className="max-w-2xl leading-8 text-slate-600">
            Each section is now a real page with a dedicated layout, clear content blocks,
            and working navigation from the public site.
          </p>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {section.spotlight.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="rounded-[30px] border border-white/60 bg-white/80 p-8 shadow-panel backdrop-blur"
            >
              <div className="inline-flex rounded-full bg-[#DCE8F2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3F75]">
                Spotlight
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold text-[#00002A]">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-[#CFE0EE] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] bg-gradient-to-br from-[#1A3F75] to-[#44A4CC] p-[1px] shadow-2xl">
            <div className="rounded-[29px] bg-white/90 p-8 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1A3F75]">
                Snapshot
              </p>

              <h2 className="mt-4 font-display text-3xl font-bold text-[#00002A]">
                Why this section matters
              </h2>

              <div className="mt-8 grid gap-5">
                {section.columns.map((column) => (
                  <div key={column.title} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <h3 className="font-display text-xl font-bold text-[#00002A]">
                      {column.title}
                    </h3>

                    <div className="mt-4 space-y-3">
                      {column.items.map((item) => (
                        <p key={item} className="text-sm leading-7 text-slate-600">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {section.timeline.map((item) => (
              <div
                key={item.title}
                className="rounded-[30px] border border-white/60 bg-white/80 p-7 shadow-panel backdrop-blur"
              >
                <div className="inline-flex rounded-full bg-[#E7F0F7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A3F75]">
                  {item.tag}
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-[#00002A]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">{item.description}</p>
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
                Next Step
              </p>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {section.cta.title}
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-slate-200">
                {section.cta.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to={section.cta.primaryTo}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#1A3F75] transition hover:bg-slate-100"
              >
                {section.cta.primaryLabel}
              </Link>

              <Link
                to={section.cta.secondaryTo}
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {section.cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
