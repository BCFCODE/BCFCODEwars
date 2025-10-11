import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ChampionsPagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className='mt-4 flex items-center justify-center gap-2'>
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='group flex items-center gap-1 rounded-lg border border-[var(--royal-gold)]/30 px-3 py-1.5 text-sm font-semibold text-[var(--royal-gold)] transition-all duration-300 hover:bg-[var(--royal-gold)]/20 hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] disabled:cursor-not-allowed disabled:opacity-40'
      >
        <ChevronLeft
          className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5'
          strokeWidth={2.3}
        />
        <span>Prev</span>
      </button>

      {/* Page Numbers */}
      <div className='flex items-center gap-1'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative flex h-8 w-8 items-center justify-center rounded-md border text-sm font-semibold transition-all duration-300 ${
              page === currentPage
                ? 'scale-[1.05] border-[var(--royal-gold)] bg-[var(--royal-gold)]/25 text-[var(--royal-gold)] shadow-[0_0_10px_rgba(255,215,0,0.4)]'
                : 'text-foreground border-[var(--royal-gold)]/20 hover:scale-[1.1] hover:text-[var(--royal-gold)] hover:shadow-[0_0_8px_rgba(255,215,0,0.2)]'
            }`}
          >
            {page}
            {page === currentPage && (
              <span className='absolute inset-0 animate-pulse rounded-md border border-[var(--royal-gold)]/50 opacity-60' />
            )}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='group flex items-center gap-1 rounded-lg border border-[var(--royal-gold)]/30 px-3 py-1.5 text-sm font-semibold text-[var(--royal-gold)] transition-all duration-300 hover:bg-[var(--royal-gold)]/20 hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] disabled:cursor-not-allowed disabled:opacity-40'
      >
        <span>Next</span>
        <ChevronRight
          className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5'
          strokeWidth={2.3}
        />
      </button>
    </div>
  );
}
