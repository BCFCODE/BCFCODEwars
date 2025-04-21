"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { ReactNode } from "react";
import getQueryClient from "./queryClient";

interface Props {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
