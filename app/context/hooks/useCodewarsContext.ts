import { ICodewarsContext } from "@/types/contexts";
import { useContext } from "react";
import { CodewarsContext } from "../CodewarsProvider";

const useCodewarsContext = (): ICodewarsContext => {
  const context = useContext(CodewarsContext);
  if (!context) {
    throw new Error(
      "useCodewarsContext must be used within a CodewarsProvider"
    );
  }
  return context;
};

export default useCodewarsContext;
