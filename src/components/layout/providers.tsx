'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import { ActiveThemeProvider } from '../active-theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  // we need the resolvedTheme value to set the baseTheme for clerk based on the dark or light theme
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== undefined)
      window.__TANSTACK_QUERY_CLIENT__ = queryClient;
  }, []);

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
