import { PropsWithChildren } from "react";
import GaugeContext from "./contexts";

type NumberOfColumns = 1 | 2 | 3 | 4;
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type ColumnsPerBreakpoint = Record<Breakpoint, NumberOfColumns>;
export type FontSizePerBreakpoint = Record<Breakpoint, string>;

export interface GaugeContextValue {
  email: string;
  // index: number;
  // type: GaugeTypes;
  dimensions: {
    columnsPerBreakpoint: ColumnsPerBreakpoint;
    fontSizePerBreakpoint: FontSizePerBreakpoint;
  };
}

export interface GaugeProviderProps extends PropsWithChildren {
  context: GaugeContextValue;
}

/**
 * GaugeProvider wraps components with GaugeContext
 * and provides the required context value.
 */
const GaugeProvider = ({ children, context }: GaugeProviderProps) => {
  return (
    <GaugeContext.Provider value={context}>{children}</GaugeContext.Provider>
  );
};

export default GaugeProvider;
