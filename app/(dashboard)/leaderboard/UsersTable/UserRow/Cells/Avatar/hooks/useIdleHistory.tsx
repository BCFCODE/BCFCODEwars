import { useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import useIdleHistoryMutation from "./useIdleHistoryMutation";
import _ from "lodash";

export interface IdleTimerData {
  id: string;
  name?: string;
  isIdle: boolean;
  isPrompted: boolean;
  isLastActiveTab: boolean;
  remainingTimeMs: number;
  elapsedTimeMs: number;
  lastIdleTime: Date | null;
  lastActiveTime: Date | null;
  idleTimeMs: number;
  activeTimeMs: number;
  totalIdleTimeMs: number;
  totalActiveTimeMs: number;
  presence: "active" | "prompting" | "idle";
  timestamp: Date;
}

const useIdleHistory = (email: string): void => {
  const { mutateAsync } = useIdleHistoryMutation();
  const presenceRef = useRef<"active" | "prompting" | "idle">("active");

  const onSnapshot = (
    idleTimer: ReturnType<typeof useIdleTimer>
  ): IdleTimerData => ({
    id: idleTimer.getTabId(),
    isIdle: idleTimer.isIdle(),
    isPrompted: idleTimer.isPrompted(),
    isLastActiveTab: idleTimer.isLastActiveTab(),
    remainingTimeMs: idleTimer.getRemainingTime(),
    elapsedTimeMs: idleTimer.getElapsedTime(),
    lastIdleTime: idleTimer.getLastIdleTime(),
    lastActiveTime: idleTimer.getLastActiveTime(),
    idleTimeMs: idleTimer.getIdleTime(),
    activeTimeMs: idleTimer.getActiveTime(),
    totalIdleTimeMs: idleTimer.getTotalIdleTime(),
    totalActiveTimeMs: idleTimer.getTotalActiveTime(),
    presence: presenceRef.current,
    timestamp: new Date(),
  });

  const idleTimer = useIdleTimer({
    name: "main",
    // timeout: 20 * 60 * 1000, // 20 minute idle threshold
    // promptBeforeIdle: 5 * 60 * 1000, // 5 minute
    timeout: 10 * 1000, // 10s (Dev)
    promptBeforeIdle: 7 * 1000, // 7s (Dev)
    debounce: 500,
    onIdle: () => mutateAsync({ email, snapshot: onSnapshot(idleTimer) }),
    onActive: () => mutateAsync({ email, snapshot: onSnapshot(idleTimer) }),
    onPresenceChange: (newPresence) => {
      presenceRef.current = newPresence.type;
      mutateAsync({ email, snapshot: onSnapshot(idleTimer) });
    },
  });

  useEffect(() => {
    const handleVisibilityChange = _.throttle(() => {
      const isTabHidden = document.hidden;
      mutateAsync({
        email,
        snapshot: { ...onSnapshot(idleTimer), isIdle: isTabHidden },
      });
    }, 2000);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      handleVisibilityChange.cancel();
    };
  }, [email]);
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

export default useIdleHistory;
