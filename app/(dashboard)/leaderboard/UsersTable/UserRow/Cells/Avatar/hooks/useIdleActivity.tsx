import { useIdleTimer } from "react-idle-timer";
import useIdleActivityMutation from "./useIdleActivityMutation";
import { useEffect } from "react";

const useIdleActivity = (email: string): void => {
  const { mutateAsync } = useIdleActivityMutation();

  const onIdle = () => mutateAsync({ email, isIdle: true });
  const onActive = () => mutateAsync({ email, isIdle: false });

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
    timeout: 5 * 60 * 1000, // 5 minute idle threshold
    debounce: 500,
  });
};

export default useIdleActivity;
