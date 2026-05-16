export default function AuthLayout({
  children,
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#DCE8F2] px-4 py-10 sm:px-6 lg:px-8">

      {/* GLOW 1 */}
      <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-[#44A4CC]/20 blur-3xl" />

      {/* GLOW 2 */}
      <div className="absolute bottom-[-140px] right-[-140px] h-[28rem] w-[28rem] rounded-full bg-[#44E6A9]/10 blur-3xl" />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl">
        {children}
      </div>
    </div>
  );
}