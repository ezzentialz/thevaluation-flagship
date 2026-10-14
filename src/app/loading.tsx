export default function Loading() {
  return (
    <div className="fixed inset-0 bg-brand-navy flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-2 border-brand-accent/20 rotate-45 rounded-lg animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 border-2 border-brand-accent/40 rotate-45 rounded-lg animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-brand-accent font-display text-2xl font-bold">V</span>
          </div>
        </div>
        <div className="text-white/60 text-sm uppercase tracking-[0.3em]">
          The Valuation
        </div>
        <div className="w-32 h-0.5 bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 bg-brand-accent animate-pulse" />
        </div>
      </div>
    </div>
  );
}