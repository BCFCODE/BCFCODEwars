'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  const { resolvedTheme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <ClerkProvider
          appearance={{
            baseTheme: resolvedTheme === 'dark' ? dark : undefined
          }}
        >
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ClerkProvider>
      </ActiveThemeProvider>
    </QueryClientProvider>
  );
}
