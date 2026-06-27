export const PatientFooter = () => {
  return (
    <footer className="border-t border-line bg-paper/50 mt-12 py-6 px-4 md:px-10 pb-28 md:pb-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 text-xs text-ink-soft md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary-dark font-display">Medivita</span>
          <span>&mdash; Rekam Medis Jalan. &copy; 2026. All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a href="/pasien/pengaturan-privasi" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
          <span className="text-line">|</span>
          <a href="#" className="hover:text-primary transition-colors">Ketentuan Layanan</a>
          <span className="text-line">|</span>
          <a href="#" className="hover:text-primary transition-colors">Pusat Bantuan</a>
        </div>
      </div>
    </footer>
  );
};
