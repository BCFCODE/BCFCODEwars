import GaugeContext from "@/app/context/providers/contexts";
import { Breakpoint } from "@/app/context/providers/GaugeProvider";
import { useContext } from "react";

type GridSize = Record<Breakpoint, number>;

interface Dimensions {
  totalColumns: number;
  gridSize: GridSize;
}

const TOTAL_COLUMNS = 24;

const useGaugeDimensions = (): Dimensions => {
  const context = useContext(GaugeContext);

  if (context === undefined || context === null) {
    throw new Error("useGaugeDimensions must be used within a GaugeProvider");
  }

  const columnsPerBreakpoint = context.columnsPerBreakpoint;

  const gridSize = Object.entries(columnsPerBreakpoint).reduce<GridSize>(
    (acc, [breakpoint, columnCount]) => {
      const key = breakpoint as Breakpoint;

      if (!Number.isInteger(TOTAL_COLUMNS / columnCount))
        throw new Error(
          `Invalid columnsPerBreakpoint config: ${TOTAL_COLUMNS} must be divisible by the column count (${columnCount}) at breakpoint "${key}"`
        );

      acc[key] = TOTAL_COLUMNS / columnCount;
      return acc;
    },
    {} as GridSize
  );

  return { totalColumns: TOTAL_COLUMNS, gridSize };
};

export default useGaugeDimensions;
