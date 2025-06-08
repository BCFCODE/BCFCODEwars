import React from 'react'

const useIdleActivity = () => {
  
  return 
}

export default useIdleActivity

/* 
  To track individual user idle activity (as in your screenshot with multiple users listed), and do it cleanly and scalably using react-idle-timer, here’s an awesome, scalable, and best-practice approach that’ll save you tons of dev/debug time:

  ✅ Goal Recap:
  Each user in your UI (like Morteza Bakhshandeh, Abbas Nosrati, etc.) should have:

  🔄 Real-time idle/active tracking

  🧠 Internal state managed per user

  ✅ Clean integration with Zustand + React Query (since you're using both)

  🧠 Core Strategy:
  You don’t need to mount a separate <IdleTimer /> per row. That would be overkill.

  Instead, you should:

  Track only the current logged-in user’s idle state with react-idle-timer.

  Broadcast your own activity state (e.g., "idle", "active") to the server.

  Show other users’ states using real-time sync from the backend.

  🧪 Why?
  Because React runs in the current user's browser only — so you can’t detect another user’s activity. What you do is:

  Let each user track themselves and push their status to your backend (or a real-time store like Firebase, Supabase, or even TanStack Query cache + websockets).
  The UI subscribes to those state changes.

  🧩 Best Practice Setup: (TL;DR Code First)
  useIdleActivity.ts – Custom hook per user
  tsx
  Copy
  Edit
  import { useIdleTimer } from 'react-idle-timer'
  import { useMutation } from '@tanstack/react-query'
  import { useStore } from '@/store/userStore'

  export function useIdleActivity(userId: string) {
    const updateStatus = useMutation({
      mutationFn: (status: 'idle' | 'active') =>
        fetch(`/api/user/${userId}/activity`, {
          method: 'POST',
          body: JSON.stringify({ status }),
        }),
    })

    const onIdle = () => updateStatus.mutate('idle')
    const onActive = () => updateStatus.mutate('active')

    useIdleTimer({
      onIdle,
      onActive,
      timeout: 1000 * 60, // 1 minute idle
      debounce: 500,
    })
  }
  Inside UserDashboard.tsx
  tsx
  Copy
  Edit
  // Only call for the logged-in user
  useIdleActivity(loggedInUser.id)
  🔁 Server-side: Receive status & broadcast
  Your backend could:

  Store it in Redis

  Or notify connected clients via WebSocket

  Or push updates via Supabase/Firestore real-time

  🎯 UI Component: UserList
  You now just display it like this:

  tsx
  Copy
  Edit
  {users.map(user => (
    <UserCard
      key={user.id}
      name={user.name}
      avatar={user.avatar}
      isIdle={user.activity === 'idle'} // from server or query cache
    />
  ))}
  🤯 Bonus Surprise: Offline-Aware Smart Tracking
  If you're tracking large teams or long sessions:

  Use navigator.onLine to skip pushing if offline

  Combine with visibilitychange events to detect when tab is inactive

  tsx
  Copy
  Edit
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        updateStatus.mutate('idle')
      } else {
        updateStatus.mutate('active')
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])
  🧠 Summary
  ✅ Feature	🧠 Best Practice
  Detect current user idle	Use react-idle-timer in a custom hook like useIdleActivity()
  Update backend	POST status on idle/active with debounce
  Show status of others	Subscribe to backend updates (polling, websockets, Firebase, or React Query cache)
  Efficient rendering	Render status badges with memoized components
  Offline safe	Use navigator.onLine and visibilitychange to handle extra edge cases

  If you want, I can generate:

  A mock backend that simulates updates

  A WebSocket-ready version

  A Firebase or Supabase integration with live demo UI

  Just say the word.
*/