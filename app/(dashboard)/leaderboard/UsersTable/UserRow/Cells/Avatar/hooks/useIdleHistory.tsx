import _ from "lodash";
import { useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import useIdleHistoryMutation from "./useIdleHistoryMutation";

const useIdleHistory = (email: string): void => {
  const totalActiveTimeMsRef = useRef<number>(0);
  const lastTabHiddenDurationRef = useRef<number>(0);
  const totalTabHiddenDurationRef = useRef<number>(0);
  const documentHiddenTimestamp = useRef<number | null>(null);
  const { mutateAsync: mutateAsyncIdleHistory } = useIdleHistoryMutation();

  const accumulateTotalActiveTime = () => {
    const currentActiveMs = getActiveTime();
    if (currentActiveMs > 0) {
      totalActiveTimeMsRef.current += currentActiveMs;
    }
  };

  const sendIdleSnapshot = () => {
    // console.log("sendIdleSnapshot", new Date().toISOString());
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
    }).catch((err) => {
      console.error("Failed to send idle snapshot:", err);
    });
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
  } = useIdleTimer({
    name: "main",
    // timeout: 20 * 60 * 1000, // 20 minute idle threshold
    // promptBeforeIdle: 5 * 60 * 1000, // 5 minute
    timeout: 10 * 1000, // 10s (Dev)
    promptBeforeIdle: 7 * 1000, // 7s (Dev)
    debounce: 500,

    onPrompt: () => {
      // console.log("🟡 Prompting user for idle...");
      wasPromptedRef.current = true;
    },

    onAction: () => {
      accumulateTotalActiveTime();
      // console.log(
      //   "An activity happen..., totalActiveTimeMs >",
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

      sendIdleSnapshot();

      // console.log(
      //   "totalActiveTimeMs onIdle before reset",
      //   totalActiveTimeMsRef.current
      // );

      resetTotalActiveAccumulation();
      // reset();
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
        // console.log(
        //   "📷 Document is hidden - document.hidden > ",
        //   document.hidden,
        //   totalActiveTimeMsRef.current
        // );

        sendIdleSnapshot();
        // pause();
      } else {
        // console.log(
        //   "📷 Document is visible - document.hidden > ",
        //   document.hidden,
        //   totalActiveTimeMsRef.current
        // );
        accumulateTotalActiveTime();

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
        // wasPromptedRef.current = false;
        // start();
      }
    }, 10 * 1000); // debounce 10s

    const visibilityChangeHandler = () => {
      calculateHiddenTime();
      debounceSync();
    };

    document.addEventListener("visibilitychange", visibilityChangeHandler);
    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
      debounceSync.cancel();
    };
  }, [email]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleBeforeUnload = () => {
      // console.log("🚪 Tab closing... Sending idle snapshot");
      sendIdleSnapshot();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [email]);
};

export default useIdleHistory;
