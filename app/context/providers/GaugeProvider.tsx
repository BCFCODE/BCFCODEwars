import { PropsWithChildren } from "react";
import GaugeContext from "./contexts";
import { SxProps } from "@mui/material";

type NumberOfColumns = 1 | 2 | 3 | 4;
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type ColumnsPerBreakpoint = Record<Breakpoint, NumberOfColumns>;
export type SizePerBreakpoint = Record<Breakpoint, string>;

export interface GaugeContextValue {
  email: string;
  gaugeStyles?: {
    columnsPerBreakpoint: ColumnsPerBreakpoint;
    gaugeInnerTextSX: SxProps;
    gaugeFooterTextSX: SxProps;
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
