'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ChampionsPagination({
  currentPage,
  totalPages,
  onPageChange
}: Props) {
  const MAX_VISIBLE = 7; // Always show 7 slots total (including dots)

  const getPages = () => {
    if (totalPages <= MAX_VISIBLE) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'dots')[] = [];

    const leftSibling = Math.max(currentPage - 1, 2);
    const rightSibling = Math.min(currentPage + 1, totalPages - 1);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      // Near start
      const visible = 5;
      const leftRange = Array.from({ length: visible }, (_, i) => i + 1);
      pages.push(...leftRange, 'dots', totalPages);
    } else if (showLeftDots && !showRightDots) {
      // Near end
      const rightRange = Array.from(
        { length: 5 },
        (_, i) => totalPages - 5 + i + 1
      );
      pages.push(1, 'dots', ...rightRange);
    } else {
      // Middle
      pages.push(
        1,
        'dots',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        'dots',
        totalPages
      );
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className='relative -mt-10 mb-5 flex items-center justify-center gap-2'>
      {/* Decorative glow */}
      <div className='absolute inset-0 -z-10 animate-pulse bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_70%)] blur-2xl' />

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='group flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--royal-gold)]/30 px-3 py-1.5 text-sm font-semibold text-[var(--royal-gold)] transition-all duration-300 hover:bg-[var(--royal-gold)]/20 hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] disabled:cursor-not-allowed disabled:opacity-40'
      >
        <ChevronLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5' />
        <span>Prev</span>
      </button>

      {/* Page Numbers */}
      <div className='flex items-center gap-1'>
        {pages.map((page, i) =>
          page === 'dots' ? (
            <span
              key={`dots-${i}`}
              className='flex h-8 w-8 items-center justify-center text-[var(--royal-gold)]/60'
            >
              <MoreHorizontal className='h-4 w-4 animate-pulse' />
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-sm font-semibold transition-all duration-300 ${
                page === currentPage
                  ? 'scale-[1.05] border-[var(--royal-gold)] bg-[var(--royal-gold)]/25 text-[var(--royal-gold)] shadow-[0_0_10px_rgba(255,215,0,0.4)]'
                  : 'text-foreground border-[var(--royal-gold)]/20 hover:scale-[1.1] hover:text-[var(--royal-gold)] hover:shadow-[0_0_8px_rgba(255,215,0,0.2)]'
              }`}
            >
              {page}
              {page === currentPage && (
                <span className='absolute inset-0 animate-pulse rounded-md border border-[var(--royal-gold)]/40 opacity-60' />
              )}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='group flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--royal-gold)]/30 px-3 py-1.5 text-sm font-semibold text-[var(--royal-gold)] transition-all duration-300 hover:bg-[var(--royal-gold)]/20 hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] disabled:cursor-not-allowed disabled:opacity-40'
      >
        <span>Next</span>
        <ChevronRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
      </button>
    </div>
  );
}
