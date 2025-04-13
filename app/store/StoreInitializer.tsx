'use client'

import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

const StoreInitializer = ({ session }: Props) => {
  /* 
    🔧 A Tiny Enhancement Suggestion
      If you also want to hydrate currentUser, not just the session, you could do this in the same place:

      tsx
      Copy
      Edit
      'use client';

      import { useEffect } from 'react';
      import { Session } from 'next-auth';
      import { useUserStore } from './user';

      interface Props {
        session: Session | null;
      }

      export default function StoreInitializer({ session }: Props) {
        const setSession = useUserStore((s) => s.setSession);
        const setCurrentUser = useUserStore((s) => s.setCurrentUser);

        useEffect(() => {
          if (session?.user?.email) {
            // Fetch user from backend, hydrate store
            (async () => {
              const res = await fetch(`/api/user?email=${session.user.email}`);
              const data = await res.json();
              if (data.success) {
                setCurrentUser({ ...data.user, session });
              }
            })();
          }
        }, [session]);

        return null;
      }
  */
  return null
};

export default StoreInitializer;
