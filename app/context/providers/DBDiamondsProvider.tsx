// import DBService from "@/app/services/db-service";
// import { DBDiamonds } from "@/types/db/diamonds";
// import { createContext, ReactNode, useReducer } from "react";
// import dbDiamondsReducer from "../reducers/dbDiamondsReducer";

// const { getDiamonds } = new DBService();

// interface Props {
//   children: ReactNode;
//   context: DBDiamonds;
// }

// const initialDBDiamonds: DBDiamonds = getDiamonds();

// export const DBDiamondsContext = createContext<DBDiamonds | null>(null);
// export const DBDiamondsDispatchContext = createContext(null);

// const DBDiamondsProvider = ({ children, context }: Props) => {
//   const [DBDiamonds, dispatch] = useReducer(
//     dbDiamondsReducer,
//     initialDBDiamonds
//   );
//   return (
//     <DBDiamondsContext.Provider value={context}>
//       <DBDiamondsDispatchContext.Provider value={dispatch}>
//         {children}
//       </DBDiamondsDispatchContext.Provider>
//     </DBDiamondsContext.Provider>
//   );
// };

// export default DBDiamondsProvider;
