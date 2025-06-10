import { useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import useIdleToggleMutation from "./useIdleToggleMutation";
import _ from "lodash";

export interface IdleTimerData {
  name?: string;
  isIdle: boolean;
}

const useIdleToggle = (email: string): void => {
  const { mutateAsync } = useIdleToggleMutation();
  const idleTimerRef = useRef<ReturnType<typeof useIdleTimer>>(null!);

  idleTimerRef.current = useIdleTimer({
    name: "main",
    // timeout: 20 * 60 * 1000, // 20 minute idle threshold
    // promptBeforeIdle: 5 * 60 * 1000, // 5 minute
    timeout: 10 * 1000, // 10s (Dev)
    promptBeforeIdle: 7 * 1000, // 7s (Dev)
    debounce: 500,
    // throttle: 5000,
    onActive: () => mutateAsync({ email, isIdle: false }),
    onIdle: () => mutateAsync({ email, isIdle: true }),
  });

  // useEffect(() => {
  //   const handleVisibilityChange = _.throttle(() => {
  //     const isTabHidden = document.hidden;
  //     mutateAsync({
  //       email,
  //       snapshot: { ...onSnapshot(), isIdle: isTabHidden },
  //     });
  //   }, 2000);

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     handleVisibilityChange.cancel();
  //   };
  // }, [email]);
};

/* 
 await db.collection("users").updateOne(
  { email: "user@example.com" },
  {
    $push: {
      "activity.idleHistory": {
        $each: [newIdleSnapshot],
        $slice: -50
      }
    }
  }
);
*/

export default useIdleToggle;
