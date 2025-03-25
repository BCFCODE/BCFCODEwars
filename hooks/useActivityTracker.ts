"use client";

import { useEffect, useState } from "react";

export default function useActivityTracker() {
  const [isActive, setIsActive] = useState(true); // Tracks if the user is active
  /* 
    he best practice placement for useActivityTracker depends on how you intend to use it:

    Best Practice Usage in a Next.js App Router (app/)
    1️⃣ Global Tracking (Best for Logging & Analytics)
    If you want to track user activity across the whole application, use it inside a layout component that wraps the entire app, such as app/layout.tsx or a global provider.

    Example: Adding to a Context Provider
    You can create a UserActivityProvider and use useActivityTracker inside it.

    tsx
    Copy
    Edit
    "use client";

    import { createContext, useContext } from "react";
    import useActivityTracker from "@/hooks/useActivityTracker";

    const UserActivityContext = createContext<boolean | null>(null);

    export function UserActivityProvider({ children }: { children: React.ReactNode }) {
      const isActive = useActivityTracker(); // Hook runs at the top level

      return (
        <UserActivityContext.Provider value={isActive}>
          {children}
        </UserActivityContext.Provider>
      );
    }

    export function useUserActivity() {
      return useContext(UserActivityContext);
    }
    Then, wrap your app in layout.tsx like this:

    tsx
    Copy
    Edit
    import { UserActivityProvider } from "@/context/UserActivityProvider";

    export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
        <UserActivityProvider>
          {children}
        </UserActivityProvider>
      );
    }
    2️⃣ Per Component Usage (Best for Individual Pages or Features)
    If you only need activity tracking in specific pages (e.g., tracking engagement on the leaderboard), import the hook inside those pages or components.

    tsx
    Copy
    Edit
    "use client";

    import useActivityTracker from "@/hooks/useActivityTracker";

    export default function LeaderBoardPage() {
      const isActive = useActivityTracker();

      return <div>{isActive ? "User is active" : "User is inactive"}</div>;
    }
    🔹 Which One to Choose?
    ✅ For global user tracking: Use it in layout.tsx with a context provider.
    ✅ For specific pages or features: Use it directly inside the component.
*/
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
