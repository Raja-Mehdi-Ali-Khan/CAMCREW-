export const Button = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`join-crew-button inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-[3.25rem] sm:px-6 sm:py-3 sm:text-sm ${className || ""}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
