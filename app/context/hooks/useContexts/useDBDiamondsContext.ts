import { APIdbDiamondsSuccessResponse, DBDiamonds } from "@/types/db/diamonds";
import { useContext } from "react";
import { DBDiamondsContext } from "../../providers/diamonds/DBDiamondsProvider";

const useDBDiamondsContext = (): APIdbDiamondsSuccessResponse => {
  const context = useContext(DBDiamondsContext);
  if (!context) {
    throw new Error(
      "useDBDiamondsContext must be used within a DBDiamondsProvider"
    );
  }
  console.log(context, "<<<<<< useDBDiamondsContext");
  if (context.success) return context;
  throw new Error(context.error);
};

export default useDBDiamondsContext;
