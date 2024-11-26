import { ReactNode } from "react";

const history = [
  {
    date: "2020-01-05",
    customerId: "11091700",
    amount: 3,
  },
  {
    date: "2020-01-02",
    customerId: "Anonymous",
    amount: 1,
  },
];

export function createData(
  name: string,
  memberSince: string,
  rank: number,
  position: number,
  globalPosition: number,
) {
  return {
    name,
    memberSince,
    rank,
    position,
    globalPosition,
    history,
  };
}

export const rows = [
  createData("Morteza", new Date().toLocaleDateString(), 6.0, 24, 4.0),
  createData("Miguel", new Date().toLocaleDateString(), 9.0, 37, 4.3),
  createData("Martin", new Date().toLocaleDateString(), 16.0, 24, 6.0),
  createData("John", new Date().toLocaleDateString(), 3.7, 67, 4.3),
  createData("Mary", new Date().toLocaleDateString(), 16.0, 49, 3.9),
];
