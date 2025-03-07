import { useContext } from "react";
import { CodewarsContext } from "../../providers/codewars/CodewarsProvider";
import { CodewarsState } from "../../providers/codewars/types";

const useCodewarsContext = (): CodewarsState => {
  const context = useContext(CodewarsContext);
  if (!context) {
    throw new Error(
      "useCodewarsContext must be used within a CodewarsProvider"
    );
  }
  return context;
};

export default useCodewarsContext;
