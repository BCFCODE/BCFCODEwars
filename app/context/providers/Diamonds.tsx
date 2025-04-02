'use client'

import { Diamonds } from "@/types/diamonds";
import { ReactNode } from "react";

import { DiamondsContext, DiamondsDispatchContext } from "./contexts";
import useDiamonds from "./effects/useDiamonds";

interface Props {
  children: ReactNode;
  context?: Diamonds;
}

const DiamondsProvider = ({ children }: Props) => {
  const { diamondsState, diamondsDispatch } = useDiamonds();

  return (
    <DiamondsContext.Provider value={diamondsState}>
      <DiamondsDispatchContext.Provider value={diamondsDispatch}>
        {children}
      </DiamondsDispatchContext.Provider>
    </DiamondsContext.Provider>
  );
};

export default DiamondsProvider;
