import _ from "lodash";
import { useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import useIdleHistoryMutation from "./useIdleHistoryMutation";

const useIdleHistory = (email: string): void => {
  const lastSentIdleState = useRef<boolean | null>(null);
  const totalActiveTimeMsRef = useRef<number>(0);
  const lastTabHiddenDurationRef = useRef<number>(0);
  const totalTabHiddenDurationRef = useRef<number>(0);
  const documentHiddenTimestamp = useRef<number | null>(null);
  const wasPromptedRef = useRef<boolean>(false);
  const latestIdleState = useRef<boolean | null>(null);

  const { mutateAsync: mutateAsyncIdleHistory } = useIdleHistoryMutation();

  const accumulateTotalActiveTime = () => {
    const currentActiveMs = getActiveTime();
    if (currentActiveMs > 0) {
      totalActiveTimeMsRef.current += currentActiveMs;
    }
  };

  const sendIdleSnapshot = (isIdle: boolean) => {
    accumulateTotalActiveTime();

    mutateAsyncIdleHistory({
      email,
      snapshot: {
        isIdle,
        elapsedTimeMs: getElapsedTime(),
        lastIdleTime: getLastIdleTime(),
        lastActiveTime: getLastActiveTime(),
        activeTimeMs: getActiveTime(),
        totalActiveTimeMs: totalActiveTimeMsRef.current,
        isPrompted: wasPromptedRef.current,
        timestamp: new Date(),
      },
    })
      .catch((err) => {
        console.error("Failed to send idle snapshot:", err);
      })
      .finally(() => {
        lastSentIdleState.current = isIdle;
      });
  };

  const throttledSendIdleSnapshot = useRef(
    _.throttle(
      () => {
        const isIdle = latestIdleState.current;
        if (isIdle !== null && lastSentIdleState.current !== isIdle) {
          sendIdleSnapshot(isIdle);
        }
      },
      60 * 1000,
      { leading: true, trailing: true }
    )
  ).current;

  const triggerIdleSnapshot = (isIdle: boolean) => {
    latestIdleState.current = isIdle;
    throttledSendIdleSnapshot();
  };

  const resetTotalActiveAccumulation = () => {
    totalActiveTimeMsRef.current = 0;
  };

  const {
    getElapsedTime,
    getLastActiveTime,
    getLastIdleTime,
    getActiveTime,
    reset,
  } = useIdleTimer({
    name: "main",
    timeout: 10 * 1000, // Dev: 10s idle threshold
    promptBeforeIdle: 7 * 1000, // Dev: 7s prompt
    debounce: 500,

    onPrompt: () => {
      // console.log("🟡 Prompting user for idle...");
      wasPromptedRef.current = true;
    },

    onAction: () => {
      accumulateTotalActiveTime();
      // console.log(
      //   "An activity happened..., totalActiveTimeMs >",
      //   totalActiveTimeMsRef.current,
      //   "lastTabHiddenDuration",
      //   lastTabHiddenDurationRef.current,
      //   "totalTabHiddenDuration",
      //   totalTabHiddenDurationRef.current
      // );
      reset();
    },

    onActive: () => {
      // console.log("🟢 User became active");
      if (wasPromptedRef.current) {
        wasPromptedRef.current = false;
      }

      if (lastSentIdleState.current !== false) {
        sendIdleSnapshot(false); // ✅ Immediately notify backend
      }
    },

    onIdle: () => {
      // console.log("🔴 User is idle");
      triggerIdleSnapshot(true);
      // console.log(
      //   "totalActiveTimeMs onIdle before reset",
      //   totalActiveTimeMsRef.current
      // );
      resetTotalActiveAccumulation();
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateHiddenTime = () => {
      if (document.hidden) {
        documentHiddenTimestamp.current = Date.now();
      } else {
        const hiddenDuration =
          Date.now() - (documentHiddenTimestamp.current ?? Date.now());
        lastTabHiddenDurationRef.current = hiddenDuration;
        totalTabHiddenDurationRef.current += hiddenDuration;
        documentHiddenTimestamp.current = null;
      }
    };

    const debounceSync = _.debounce(() => {
      if (document.hidden) {
        throttledSendIdleSnapshot.flush(); // ✅ Flush immediately when tab hides
        // console.log(
        //   "📷 Document is hidden - totalActiveTimeMs >",
        //   totalActiveTimeMsRef.current
        // );
        triggerIdleSnapshot(true);
      } else {
        // console.log(
        //   "📷 Document is visible - totalActiveTimeMs >",
        //   totalActiveTimeMsRef.current
        // );
        accumulateTotalActiveTime();
        sendIdleSnapshot(false); // ✅ Send immediately when visible again
      }
    }, 10 * 1000); // 10s debounce for visibility changes

    const visibilityChangeHandler = () => {
      calculateHiddenTime();
      debounceSync();
    };

    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
      debounceSync.cancel();
      throttledSendIdleSnapshot.flush();
    };
  }, [email]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeUnload = () => {
      // console.log("🚪 Tab closing... Sending final idle snapshot");
      throttledSendIdleSnapshot.flush();

      if (
        latestIdleState.current !== null &&
        latestIdleState.current !== lastSentIdleState.current
      ) {
        sendIdleSnapshot(latestIdleState.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      throttledSendIdleSnapshot.flush();
    };
  }, [email]);
};

export default useIdleHistory;
