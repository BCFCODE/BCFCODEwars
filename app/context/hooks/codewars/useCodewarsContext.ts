import { useContext } from "react";
import { CodewarsContext } from "../../providers/Codewars";
import { CodewarsState } from "../../reducers/codewarsReducer";

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
