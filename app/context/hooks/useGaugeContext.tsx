import GaugeContext from "@/app/context/providers/contexts";
import { useContext } from "react";

/**
 * Custom hook to consume GaugeContext safely.
 * Ensures it's used within a matching Provider.
 */
const useGaugeContext = () => {
  const context = useContext(GaugeContext);

  if (context === undefined || context === null) {
    throw new Error("useGaugeContext must be used within a GaugeProvider");
  }

  return context;
};

export default useGaugeContext;
