// "use client";

// import { Session } from "next-auth";
// import { useUsersStore } from "./users";
// import { useEffect } from "react";
// import dbAPIService from "../api/services/db";
// import { AuthenticatedUser } from "@/types/users";
// import { useLeaderBoardStore } from "./leaderboard";

// const { getUsers } = new dbAPIService();

// interface Props {
//   session: Session | null;
// }

// const StoreInitializer = ({ session }: Props) => {
//   const email = session?.user?.email;

//   const { setAllUsers, initializeCurrentUser } = useUsersStore(
//     (state) => state.actions
//   );
//   const { setIsError, setIsLoading } = useLeaderBoardStore(
//     (state) => state.actions
//   );

//   useEffect(() => {
//     if (!email) return;

//     (async () => {
//       try {
//         setIsLoading(true);
//         setIsError(false);

//         const { success, users } = await getUsers({ cache: "no-store" });

//         if (!success) {
//           setIsLoading(false);
//           setIsError(true);
//         }

//         if (success) {
//           const allUsers = (users as AuthenticatedUser[]).map((u) =>
//             u.email === email ? { ...u, session } : u
//           );

//           setAllUsers(allUsers);
//           initializeCurrentUser(email);
//           setIsLoading(false);
//           setIsError(false);
//         }
//       } catch (error) {
//         setIsLoading(false);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [
//     email,
//     session,
//     initializeCurrentUser,
//     setAllUsers,
//     setIsError,
//     setIsLoading,
//   ]);

//   return null;
// };

// export default StoreInitializer;
