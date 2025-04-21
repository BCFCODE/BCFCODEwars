"use client";

import dbAPIService from "@/app/api/services/db";
import { AuthenticatedUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const { getUsers } = new dbAPIService();

const useUsersQuery = () => {
  const { data: session } = useSession();

  return useQuery<AuthenticatedUser[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await getUsers({ cache: "no-store" });

      if (!response.success || !response.users) {
        throw new Error("Failed to fetch allUsers in useUsersQuery");
      }

      return response.users.map((user) =>
        user.email === session?.user?.email ? { ...user, session } : user
      ) as AuthenticatedUser[];
    },
    enabled: !!session?.user?.email, // Avoid calling if session isn't ready
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};

export default useUsersQuery;

/* 
Great — you're aiming to replace your current useEffect + reducer setup with a React Query approach for ['allUsers'], and want that data accessible both in client and server components (including routes). Here's how to achieve that:

✅ 1. Expose allUsers via React Query (Client Hook)
Replace your effect logic with a custom hook using React Query:

ts
Copy
Edit
// hooks/useUsersQuery.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import dbAPIService from "@/app/api/services/db";
import { useSession } from "next-auth/react";
import { AuthenticatedUser } from "@/types/users";

const { getUsers } = new dbAPIService();

const useUsersQuery = () => {
  const { data: session } = useSession();

  return useQuery<AuthenticatedUser[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const fetchedUsers = await getUsers({ cache: "no-store" });

      if (!fetchedUsers.success || !fetchedUsers.users) {
        throw new Error("Failed to fetch users");
      }

      return fetchedUsers.users.map((user) =>
        user.email === session?.user?.email
          ? { ...user, session }
          : user
      ) as AuthenticatedUser[];
    },
    enabled: !!session?.user?.email, // Avoid calling if session isn't ready
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};

export default useUsersQuery;
✅ 2. Prefetch + Hydrate in Server Component
In a server component (like layout or page), fetch and prehydrate the data:

tsx
Copy
Edit
// app/layout.tsx or a top-level server component
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import getUsers from "@/app/api/services/db/server/getUsers"; // <- server-safe version
import ReactQueryProvider from "@/app/providers/ReactQuery";
import Providers from "@/app/providers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { users } = await getUsers(); // Run on server, returns raw users
      return users;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Providers>
      <ReactQueryProvider>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </ReactQueryProvider>
    </Providers>
  );
}
✅ 3. Use useUsersQuery Anywhere in Client Components
Now you can consume it like this in any client component:

tsx
Copy
Edit
"use client";
import useUsersQuery from "@/hooks/useUsersQuery";

export default function AllUsersList() {
  const { data: users, isLoading, error } = useUsersQuery();

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.email}>{user.name}</li>
      ))}
    </ul>
  );
}
🔄 4. Accessing on the Server (Optional Pattern)
If you want access on the server (without hydration), you can use the same getUsers() in a server component:

tsx
Copy
Edit
// Server component (e.g. for static rendering)
import getUsers from "@/app/api/services/db/server/getUsers";

export default async function ServerUsers() {
  const { users } = await getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.email}>{user.name}</li>
      ))}
    </ul>
  );
}
Would you like me to help rewrite your AllUsersProvider to use this pattern too? Or show how to make getUsers() work server-side from the /api/db/users route?
 */
