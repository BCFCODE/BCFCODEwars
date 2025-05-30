import { PropsWithChildren } from "react";
import GaugeContext from "./contexts";

export interface GaugeContextValue {
  email: string;
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
