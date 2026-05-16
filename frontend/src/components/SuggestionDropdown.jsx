export default function SuggestionDropdown({ title, items, visible, onPick, accent = 'coral', emptyLabel = 'No suggestions available right now.' }) {
  if (!visible) {
    return null;
  }

  const accentClasses = accent === 'aqua'
    ? 'border-aqua/20 bg-aqua/5 text-aqua'
    : 'border-coral/20 bg-coral/5 text-coral';

  return (
    <div className="animate-fade-up absolute left-0 right-0 top-[calc(100%+0.55rem)] z-20 rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-panel backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-2 px-2">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${accentClasses}`}>
          Suggestions
        </span>
      </div>
      <div className="space-y-2">
        {items.length ? (
          items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPick(item)}
              className="flex w-full items-center justify-between rounded-2xl border border-transparent bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-200 hover:bg-white hover:text-ink"
            >
              <span className="truncate">{item}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Use</span>
            </button>
          ))
        ) : (
          <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">{emptyLabel}</p>
        )}
      </div>
    </div>
  );
}
