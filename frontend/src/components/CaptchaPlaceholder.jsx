export default function CaptchaPlaceholder() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-4 transition duration-300 hover:border-coral/50 hover:bg-white">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm ring-1 ring-slate-100">
          <span className="animate-pulseborder rounded-xl bg-sun/15 px-2 py-1">?</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-800">CAPTCHA placeholder</p>
              <p className="mt-1 text-sm text-slate-500">Replace this block with your real CAPTCHA provider before production launch.</p>
            </div>
            <div className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
              Verification
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full w-full animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,rgba(255,122,89,0.18),rgba(78,205,196,0.34),rgba(255,122,89,0.18))]" />
          </div>
        </div>
      </div>
    </div>
  );
}
