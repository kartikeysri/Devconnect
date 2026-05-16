import { useId } from 'react';

export default function PasswordField({ label, value, onChange, visible, onToggle, placeholder, helperText, className = '' }) {
  const inputId = useId();

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className="field-with-icon"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {helperText ? <p className="mt-2 text-xs text-slate-500">{helperText}</p> : null}
    </label>
  );
}
