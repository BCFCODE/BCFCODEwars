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
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history,
  };
}

export const rows = [
  createData("Morteza", 159, 6.0, 24, 4.0, 3.99),
  createData("Miguel", 237, 9.0, 37, 4.3, 4.99),
  createData("Martin", 262, 16.0, 24, 6.0, 3.79),
  createData("John", 305, 3.7, 67, 4.3, 2.5),
  createData("Mary", 356, 16.0, 49, 3.9, 1.5),
];
