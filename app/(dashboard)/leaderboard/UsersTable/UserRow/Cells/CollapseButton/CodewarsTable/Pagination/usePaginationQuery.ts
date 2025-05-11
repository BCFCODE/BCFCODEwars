// "use client";

// import { GetUsersResponse } from "@/app/api/db/users/route";
// import CodewarsAPIService from "@/app/api/services/codewars";
// import dbAPIService from "@/app/api/services/db";
// import { codewarsQueryKeys } from "@/app/context/providers/ReactQuery/queryKeys";
// import { PaginationQuery } from "@/app/services/db";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

// const { getCompletedChallenges } = new CodewarsAPIService();

// const usePaginationQuery = (pagination: PaginationQuery) => {
//   const { data: session, status } = useSession();

//   return useQuery<GetUsersResponse>({
//     queryKey: [codewarsQueryKeys.codewars, pagination],
//     queryFn: async () => {
//       await getCompletedChallenges()
//       // const { success, list, error, totalUsers } = await getUsers(
//       //   pagination,
//       //   {
//       //     cache: "no-store",
//       //   }
//       // );

//       // if (!success || !list || error) {
//       //   throw new Error("Failed to users data in usePaginationQuery");
//       // }

//       return;
//     },
//     staleTime: 1000 * 60 * 10, // 10m
//     retry: 1,
//   });
// };

// export default usePaginationQuery;
