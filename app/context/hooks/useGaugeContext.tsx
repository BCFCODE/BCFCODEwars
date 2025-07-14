import useTargetStore, {
  TargetStore,
} from "@/app/(dashboard)/components/Cards/TargetCard/DailyTarget/useTargetStore";
import GaugeContext from "@/app/context/providers/contexts";
import { useContext } from "react";

interface Context {
  email: string;
  label: number;
  isHovering: boolean;
  setIsHovering: TargetStore["setIsHovering"];
  setTarget: TargetStore["setTarget"];
}

/**
 * Custom hook to consume GaugeContext safely.
 * Ensures it's used within a matching Provider.
 */
const useGaugeContext = (): Context => {
  const context = useContext(GaugeContext);

  if (context === undefined || context === null) {
    throw new Error("useGaugeContext must be used within a GaugeProvider");
  }

  const email = context.email;

  const label = useTargetStore((state) => state.label[email] ?? 1);
  const isHovering = useTargetStore((state) => state.isHovering[email]);
  const setIsHovering = useTargetStore((state) => state.setIsHovering);
  const setTarget = useTargetStore((state) => state.setTarget);

  return { email, label, isHovering, setIsHovering, setTarget };
};

export default useGaugeContext;
