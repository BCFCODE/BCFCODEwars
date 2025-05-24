// import DiamondsAPIService from "@/app/api/services/diamonds";
// import diamondsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/diamonds";
// import { Diamonds } from "@/types/diamonds";
// import { useQuery } from "@tanstack/react-query";

// const { getDiamonds } = new DiamondsAPIService();

// const useDiamondsQuery = () => {
//   return useQuery<Diamonds[], Error, Diamonds[]>({
//     queryKey: [diamondsQueryKeys.diamonds],
//     queryFn: async () => {
//       const { data, success, error } = await getDiamonds();

//       if (!success || error || !data) {
//         throw new Error(error ?? "Failed to fetch diamonds. Please try again.");
//       }

//       return data;
//     },
//   });
// };

// export default useDiamondsQuery;
