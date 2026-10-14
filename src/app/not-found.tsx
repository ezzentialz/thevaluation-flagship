import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 animate-grid"
          style={{
            backgroundImage: `linear-gradient(rgba(200,169,81,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="text-center max-w-md px-6 relative">
        <div className="text-9xl font-display font-bold text-gradient-gold mb-4">404</div>
        <h2 className="text-2xl text-white mb-4">ไม่พบหน้านี้</h2>
        <p className="text-white/60 mb-8">
          หน้าที่คุณกำลังมองหาไม่มีอยู่ในระบบ
        </p>
        <Link href="/" className="btn-primary inline-block">
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}