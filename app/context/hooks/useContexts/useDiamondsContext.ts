import { APIdbDiamondsSuccessResponse, DBDiamonds } from "@/types/db/diamonds";
import { useContext } from "react";
import { DBDiamondsContext } from "../../providers/diamonds/DiamondsProvider";
import { DiamondsContextState } from "../../providers/diamonds/types";

const useDiamondsContext = (): DiamondsContextState => {
  const context = useContext(DBDiamondsContext);
  if (!context) {
    throw new Error(
      "useDiamondsContext must be used within a DBDiamondsProvider"
    );
  }
  console.log(context, "<<<<<< useDiamondsContext");
  return context;
};

export default useDiamondsContext;
