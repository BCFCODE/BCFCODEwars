import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const LinkButton = ({
  href,
  label,
  gradient,
  hoverGradient,
  focusRing
}: {
  href: string;
  label: string;
  gradient: string;
  hoverGradient: string;
  focusRing: string;
}) => (
  <Link
    href={href}
    className={`group relative inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:outline-none ${gradient} ${focusRing}`}
    aria-label={label}
  >
    <span
      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${hoverGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
    />
    <span className='relative flex items-center gap-2'>
      {label}
      <ArrowRightIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
    </span>
  </Link>
);
