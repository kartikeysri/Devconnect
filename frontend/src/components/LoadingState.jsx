export default function LoadingState({
  label = 'Loading...',
}) {
  return (
    <div className="rounded-[30px] border border-white/20 bg-white/80 p-10 shadow-xl backdrop-blur-xl">

      <div className="flex flex-col items-center justify-center">

        {/* LOADER */}
        <div className="relative flex h-16 w-16 items-center justify-center">

          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A3F75]" />

          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1A3F75] to-[#44A4CC]" />

        </div>

        <p className="mt-6 text-sm font-medium text-slate-600">
          {label}
        </p>

      </div>
    </div>
  );
}