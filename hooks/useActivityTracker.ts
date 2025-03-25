"use client";

import { useEffect, useState } from "react";

export default function useActivityTracker() {
  const [isActive, setIsActive] = useState(true); // Tracks if the user is active

  useEffect(() => {
    const handleFocus = () => setIsActive(true); // User returns to the tab
    const handleBlur = () => setIsActive(false); // User switches tabs or minimizes
    const handleVisibilityChange = () => setIsActive(!document.hidden);
    const handleActivity = () => setIsActive(true); // User interacts (mouse or keyboard)

    // Listen for user activity and visibility changes
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    // Track when the user **closes or reloads** the page
    const handleBeforeUnload = () => {
      setIsActive(false);
      localStorage.setItem("lastActive", new Date().toISOString());
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return isActive;
}

/* 
  const logUserStatus = async (status: boolean) => {
  await fetch("/api/user-activity", {
    method: "POST",
    body: JSON.stringify({ isActive: status, timestamp: new Date() }),
    headers: { "Content-Type": "application/json" },
  });
};

const handleActivity = () => {
  setIsActive(true);
  logUserStatus(true); // Log active status
};

const handleBeforeUnload = () => {
  setIsActive(false);
  logUserStatus(false); // Log inactive status before closing
};
*/