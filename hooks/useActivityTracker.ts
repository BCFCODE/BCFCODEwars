"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Tracks whether the user is currently active or not.
 * Activity includes:
 * - Page focus/blur
 * - Visibility (tab switch, minimize)
 * - Mouse and keyboard interactions
 * 
 * Usage:
 *   ✅ Use in context provider for global tracking (layout.tsx)
 *   ✅ Use directly in a component/page for localized tracking
 *
 * Optionally logs activity via a callback (e.g. for analytics)
 */
export default function useActivityTracker(onChange?: (isActive: boolean) => void) {
  const [isActive, setIsActive] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const logActivity = (active: boolean) => {
      setIsActive(active);
      onChange?.(active); // External logger or state handler
    };

    const handleFocus = () => logActivity(true);
    const handleBlur = () => logActivity(false);
    const handleVisibilityChange = () => logActivity(!document.hidden);
    const handleUserInput = () => logActivity(true);

    const handleBeforeUnload = () => {
      logActivity(false);
      localStorage.setItem("lastActive", new Date().toISOString());
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mousemove", handleUserInput);
    document.addEventListener("keydown", handleUserInput);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mousemove", handleUserInput);
      document.removeEventListener("keydown", handleUserInput);
    };
  }, [onChange]);

  return isActive;
}
