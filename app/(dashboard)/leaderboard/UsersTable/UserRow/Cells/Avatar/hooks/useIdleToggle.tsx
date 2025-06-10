import { useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import useIdleToggleMutation from "./useIdleToggleMutation";
import _ from "lodash";
import useIdleHistoryMutation, {
  IdleSnapshotData,
} from "./useIdleHistoryMutation";

export interface IdleTimerData {
  name?: string;
  isIdle: boolean;
}

const useIdleToggle = (email: string): void => {
  const { mutateAsync: mutateAsyncIdleToggle } = useIdleToggleMutation();
  const { mutateAsync: mutateAsyncIdleHistory } = useIdleHistoryMutation();
  const idleTimerRef = useRef<ReturnType<typeof useIdleTimer>>(null!);

  idleTimerRef.current = useIdleTimer({
    name: "main",
    timeout: 20 * 60 * 1000, // 20 minute idle threshold
    promptBeforeIdle: 5 * 60 * 1000, // 5 minute
    // timeout: 10 * 1000, // 10s (Dev)
    // promptBeforeIdle: 7 * 1000, // 7s (Dev)
    debounce: 500,
    // throttle: 5000,
    onActive: () => mutateAsyncIdleToggle({ email, isIdle: false }),
    onIdle: () =>
      mutateAsyncIdleHistory({
        email,
        snapshot: {
          isIdle: true,
          elapsedTimeMs: idleTimerRef.current.getElapsedTime(),
          lastIdleTime: idleTimerRef.current.getLastIdleTime(),
          lastActiveTime: idleTimerRef.current.getLastActiveTime(),
          activeTimeMs: idleTimerRef.current.getActiveTime(),
          totalActiveTimeMs: idleTimerRef.current.getTotalActiveTime(),
        },
      }),
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

export default useIdleToggle;
