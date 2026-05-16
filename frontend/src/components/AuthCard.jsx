export default function AuthCard({ title, subtitle, eyebrow = 'PulseBoard Access', footer, badge, children }) {
  return (
    <div className="panel animate-fade-up overflow-hidden lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative overflow-hidden bg-ink bg-auth-grid px-8 py-10 text-white sm:px-10 lg:px-12">
        <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-coral/25 blur-3xl" />
        <div className="absolute bottom-8 right-0 h-36 w-36 rounded-full bg-aqua/20 blur-3xl" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.28em] text-coral">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-200">{subtitle}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Fast Access</p>
              <p className="mt-2 font-display text-2xl">JWT secured</p>
              <p className="mt-2 text-sm text-slate-300">Move from sign-in to feed in a single step.</p>
            </div>
            <div className="animate-float rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Discovery Ready</p>
              <p className="mt-2 font-display text-2xl">Suggestions live</p>
              <p className="mt-2 text-sm text-slate-300">Helpful prompts for usernames, email, and identity setup.</p>
            </div>
          </div>

          {badge ? (
            <div className="mt-8 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm">
              {badge}
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-6 px-8 py-8 sm:px-10 sm:py-10">
        {children}
        {footer ? <div className="border-t border-slate-100 pt-6">{footer}</div> : null}
      </div>
    </div>
  );
}
