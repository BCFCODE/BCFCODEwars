// // hooks/useCodewarsQuery.ts
// import { useAuth } from '@clerk/nextjs';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { TableTab } from '../[tab]/tables/components/DataTableTabs';
// import dummyData from './dummyData.json';

// const useCodewarsQuery = () => {
//   const { getToken } = useAuth();

//   return useQuery({
//     queryKey: [`codewars-table`],
//     queryFn: async () => {
//       // Get JWT from Clerk
//       const token = await getToken({ template: 'bcfcode-jwt-service' });

//       const response = await axios.get('/api/table/codewars', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const codewarsData = response.data;

//       // Merge with dummy data if needed
//       const codewarsTemporaryDummyData = dummyData
//         .map((data, i) =>
//           codewarsData[i] ? { ...data, ...codewarsData[i] } : data
//         )
//         .slice(0, codewarsData.length);

//       return codewarsTemporaryDummyData;
//     },
//     enabled: !!getToken // ensures token is loaded before query runs
//   });
// };

// export default useCodewarsQuery;
