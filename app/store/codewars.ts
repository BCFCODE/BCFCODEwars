// import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";
// import { create } from "zustand";

// interface Actions {
//   updateCodeChallengesList: (list: CodewarsCompletedChallenge[]) => void;
// }

// interface CodewarsStore {
//   codewars: CodewarsUser | null;
//   actions: Actions;
// }

// export const useCodewarsStore = create<CodewarsStore>((set) => ({
//   codewars: null,
//   actions: {
//     updateCodeChallengesList = (list) =>
//       set((state) => ({
//         codewars: {
//           ...state.codewars,
//           codeChallenges: { ...state.codewars?.codeChallenges, list },
//         },
//       })),
//   },
// }));
