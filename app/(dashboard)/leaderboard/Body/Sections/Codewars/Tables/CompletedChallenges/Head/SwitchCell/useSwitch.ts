import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import { useState } from "react";

const useSwitch = () => {
  // const { isSwitchedToShowNewChallenges } = useCodewarsContext();
  const dispatch = useCodewarsDispatchContext();
  // const [isSwitchedToShowNewChallenges, setSwitch] = useState(false);

  const handleClick = () => {
    // setSwitch(!isSwitchedToShowNewChallenges);
    // dispatch({
    //   type: "SWITCH_TO_SHOW_NEW_CHALLENGES",
    //   isShow: !(isSwitchedToShowNewChallenges ?? false),
    // });
    console.log(
      "SwitchCell Clicked! (in useSwitch)",
      // isSwitchedToShowNewChallenges
    );
  };

  return { handleClick, /* isSwitchedToShowNewChallenges */ };
};

export default useSwitch;
