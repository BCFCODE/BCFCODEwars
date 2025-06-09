import { IIdleTimer, useIdleTimer } from "react-idle-timer";
import useIdleActivityMutation from "./useIdleActivityMutation";
import { useEffect } from "react";

interface IdleTimerData {
  id: string; // unique instance/tab ID via getTabId()
  name?: string; // optional name prop
  isIdle: boolean; // isIdle()
  isPrompted: boolean; // isPrompted()
  isLeader: boolean; // isLeader()
  isLastActiveTab: boolean; // isLastActiveTab()
  remainingTimeMs: number; // getRemainingTime()
  elapsedTimeMs: number; // getElapsedTime()
  lastIdleTime: string | null; // getLastIdleTime().toISOString()
  lastActiveTime: string | null; // getLastActiveTime().toISOString()
  idleTimeMs: number; // getIdleTime()
  activeTimeMs: number; // getActiveTime()
  totalIdleTimeMs: number; // getTotalIdleTime()
  totalActiveTimeMs: number; // getTotalActiveTime()
  presence: "active" | "prompting" | "idle"; // tracked from onPresenceChange
  timestamp: string; // snapshot time (Date.toISOString())
  // Optional: cross-tab messaging payload
  lastMessage?: any;
}
/* 
const idleStats: IdleTimerData[] = [];

function snapshot(timer: IIdleTimer, name?: string, lastMsg?: any) {
  idleStats.push({
    id: timer.getTabId(),
    name,
    isIdle: timer.isIdle(),
    isPrompted: timer.isPrompted(),
    isLeader: timer.isLeader(),
    isLastActiveTab: timer.isLastActiveTab(),
    remainingTimeMs: timer.getRemainingTime(),
    elapsedTimeMs: timer.getElapsedTime(),
    lastIdleTime: timer.getLastIdleTime()?.toISOString() || null,
    lastActiveTime: timer.getLastActiveTime()?.toISOString() || null,
    idleTimeMs: timer.getIdleTime(),
    activeTimeMs: timer.getActiveTime(),
    totalIdleTimeMs: timer.getTotalIdleTime(),
    totalActiveTimeMs: timer.getTotalActiveTime(),
    presence: currentPresence, // your tracked variable from onPresenceChange
    timestamp: new Date().toISOString(),
    lastMessage: lastMsg,
  });
}
 */
const useIdleActivity = (email: string): void => {
  const { mutateAsync } = useIdleActivityMutation();

  const onIdle = () => {
    console.log("idle...");
    mutateAsync({ email, isIdle: true });
  };
  const onActive = () => {
    console.log('active...')
    mutateAsync({ email, isIdle: false });
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        mutateAsync({ email, isIdle: true });
      } else {
        mutateAsync({ email, isIdle: false });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [email, mutateAsync]);

  useIdleTimer({
    onIdle,
    onActive,
    // timeout: 5 * 60 * 1000, // 5 minute idle threshold
    // promptBeforeIdle: 1 * 60 * 1000, // 1 minute
    timeout: 10 * 1000, // 10s (Dev)
    promptBeforeIdle: 7 * 1000, // 7s (Dev)
    
    onPresenceChange: (newPresence) => {
      console.log("New presence", newPresence);
    },
    debounce: 500,
  });
  /* 
  const timer = useIdleTimer({
    name: "main",
    timeout: 20 * 60 * 1000,
    promptBeforeIdle: 30 * 1000,
    crossTab: true,
    onPresenceChange: (p) => setPresence(p),
    onMessage: (msg) => setLastMsg(msg),
    // other callbacks...
  });

  // call this whenever you want a snapshot:
  snapshot(timer, "main", lastMsg);
   */
};

export default useIdleActivity;
