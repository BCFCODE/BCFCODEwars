import { DBDiamonds } from "@/types/db/diamonds";
import { useContext } from "react";
import { DBDiamondsContext } from "../providers/diamonds/DBDiamondsProvider";
import { DiamondsState } from "../reducers/diamonds/types";

const useDBDiamondsContext = (): DBDiamonds | DiamondsState => {
  const context = useContext(DBDiamondsContext);
  if (!context) {
    throw new Error(
      "useDBDiamondsContext must be used within a DBDiamondsProvider"
    );
  }
  return context;
};

export default useDBDiamondsContext;
