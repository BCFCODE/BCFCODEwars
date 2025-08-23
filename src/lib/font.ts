import {
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Inter,
  Mulish,
  Noto_Sans_Mono,
  Montserrat
} from 'next/font/google';

import { cn } from '@/lib/utils';

// Base font configuration for Geist (sans-serif)
const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '700']
});

// Mono font configuration for Geist_Mono
const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700']
});

// Instrument Sans configuration (corrected weights)
const fontInstrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400', '500', '600', '700'] // Removed 800, added 500
});

// Noto Sans Mono configuration
const fontNotoMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-mono',
  display: 'swap',
  weight: ['400', '700']
});

// Mulish configuration
const fontMullish = Mulish({
  subsets: ['latin'],
  variable: '--font-mullish',
  display: 'swap',
  weight: ['300', '400', '700']
});

// Inter configuration
const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '700']
});

// Montserrat configuration
const fontMontserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  preload: true,
  adjustFontFallback: true,
  fallback: ['sans-serif']
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInstrument.variable,
  fontNotoMono.variable,
  fontMullish.variable,
  fontInter.variable,
  fontMontserrat.variable
);
