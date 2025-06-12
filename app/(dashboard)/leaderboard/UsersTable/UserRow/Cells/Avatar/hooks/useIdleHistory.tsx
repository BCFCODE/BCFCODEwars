import _ from "lodash";
import { useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import useIdleHistoryMutation from "./useIdleHistoryMutation";

const useIdleHistory = (email: string): void => {
  const totalActiveTimeMsRef = useRef<number>(0);
  const isDocumentHiddenRef = useRef<boolean>(false);
  const { mutateAsync: mutateAsyncIdleHistory } = useIdleHistoryMutation();

  const accumulateTotalActiveTime = () => {
    const currentActiveMs = getActiveTime();
    if (
      !isDocumentHiddenRef.current && // pause accumulation when document is hidden
      currentActiveMs > 0
    ) {
      totalActiveTimeMsRef.current += currentActiveMs;
    }
  };

  const resetTotalActiveAccumulation = () => {
    totalActiveTimeMsRef.current = 0;
  };

  const wasPromptedRef = useRef<boolean>(false);

  const {
    getElapsedTime,
    getLastActiveTime,
    getLastIdleTime,
    getActiveTime,
    reset,
    pause,
    start,
  } = useIdleTimer({
    name: "main",
    timeout: 20 * 60 * 1000, // 20 minute idle threshold
    promptBeforeIdle: 5 * 60 * 1000, // 5 minute
    // timeout: 10 * 1000, // 10s (Dev)
    // promptBeforeIdle: 7 * 1000, // 7s (Dev)
    debounce: 500,

    onPrompt: () => {
      // console.log("🟡 Prompting user for idle...");
      wasPromptedRef.current = true;
    },

    onAction: () => {
      accumulateTotalActiveTime();
      // console.log("An activity happen...", totalActiveTimeMsRef.current);
      reset();
    },

    onActive: () => {
      // console.log("🟢 User became active");
      if (wasPromptedRef.current) {
        wasPromptedRef.current = false;
      }

      mutateAsyncIdleHistory({
        email,
        snapshot: {
          isIdle: false,
          elapsedTimeMs: getElapsedTime(),
          lastIdleTime: getLastIdleTime(),
          lastActiveTime: getLastActiveTime(),
          activeTimeMs: getActiveTime(),
          totalActiveTimeMs: totalActiveTimeMsRef.current,
          isPrompted: wasPromptedRef.current,
          timestamp: new Date(),
        },
      });
    },

    onIdle: () => {
      // console.log("🔴 User is idle");

      accumulateTotalActiveTime();

      mutateAsyncIdleHistory({
        email,
        snapshot: {
          isIdle: true,
          elapsedTimeMs: getElapsedTime(),
          lastIdleTime: getLastIdleTime(),
          lastActiveTime: getLastActiveTime(),
          activeTimeMs: getActiveTime(),
          totalActiveTimeMs: totalActiveTimeMsRef.current,
          isPrompted: wasPromptedRef.current,
          timestamp: new Date(),
        },
      });
      // console.log(
      //   "totalActiveTimeMs onIdle before reset",
      //   totalActiveTimeMsRef.current
      // );

      resetTotalActiveAccumulation();
      // reset();
    },
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    
    
    const handleVisibilityChange = _.debounce(
      () => {
        if (document.hidden) {
          isDocumentHiddenRef.current = true;
          // console.log(
          //   "📷 Document is hidden - document.hidden > ",
          //   document.hidden,
          //   totalActiveTimeMsRef.current
          // );

          mutateAsyncIdleHistory({
            email,
            snapshot: {
              isIdle: true,
              elapsedTimeMs: getElapsedTime(),
              lastIdleTime: getLastIdleTime(),
              lastActiveTime: getLastActiveTime(),
              activeTimeMs: getActiveTime(),
              totalActiveTimeMs: totalActiveTimeMsRef.current,
              isPrompted: wasPromptedRef.current,
              timestamp: new Date(),
            },
          });
          pause();
        } else {
          isDocumentHiddenRef.current = false;
          // console.log(
          //   "📷 Document is visible - document.hidden > ",
          //   document.hidden,
          //   totalActiveTimeMsRef.current
          // );

          mutateAsyncIdleHistory({
            email,
            snapshot: {
              isIdle: false,
              elapsedTimeMs: getElapsedTime(),
              lastIdleTime: getLastIdleTime(),
              lastActiveTime: getLastActiveTime(),
              activeTimeMs: getActiveTime(),
              totalActiveTimeMs: totalActiveTimeMsRef.current,
              isPrompted: wasPromptedRef.current,
              timestamp: new Date(),
            },
          });
          accumulateTotalActiveTime();
          start();
        }
      },
      3 * 60 * 1000
    ); // debounce 3 min

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      handleVisibilityChange.cancel();
    };
  }, [email, document?.hidden]);
};

export default useIdleHistory;
