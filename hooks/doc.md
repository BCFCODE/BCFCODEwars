Here’s your production-ready, best practice version of the useActivityTracker hook with detailed documentation, enhanced flexibility, and a clear structure that fits modern Next.js App Router (with or without Context).

✅ Features:
Focus-aware, blur-aware, visibility-aware.

Supports logging (optional).

Fully typed and documented.

Easily used globally via context or locally per-component.

Clean and readable.

📄 File: useActivityTracker.ts
tsx
Copy
Edit
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
🧪 Optional: Logging Activity to Server (add to caller)
ts
Copy
Edit
const logUserStatus = async (status: boolean) => {
  await fetch("/api/user-activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: status, timestamp: new Date().toISOString() }),
  });
};
🧠 Best Practice Usage Options
1️⃣ Global Tracking (App-Wide)
📄 context/UserActivityProvider.tsx:

tsx
Copy
Edit
"use client";

import { createContext, useContext } from "react";
import useActivityTracker from "@/hooks/useActivityTracker";

const UserActivityContext = createContext<boolean>(true);

export function UserActivityProvider({ children }: { children: React.ReactNode }) {
  const isActive = useActivityTracker();

  return (
    <UserActivityContext.Provider value={isActive}>
      {children}
    </UserActivityContext.Provider>
  );
}

export function useUserActivity() {
  return useContext(UserActivityContext);
}
📄 app/layout.tsx:

tsx
Copy
Edit
import { UserActivityProvider } from "@/context/UserActivityProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <UserActivityProvider>{children}</UserActivityProvider>;
}
2️⃣ Per-Page or Component Usage
tsx
Copy
Edit
"use client";

import useActivityTracker from "@/hooks/useActivityTracker";

export default function LeaderBoardPage() {
  const isActive = useActivityTracker();

  return <div>{isActive ? "🟢 User is active" : "🔴 User is inactive"}</div>;
}
✅ Summary
Feature	Status
Mouse/keyboard aware	✅
Tab switch aware	✅
Page close detection	✅
Logging optional	✅
Global via Context	✅
Local component use	✅

Let me know if you want the logging to be debounced, or persist last activity in a cookie or backend.