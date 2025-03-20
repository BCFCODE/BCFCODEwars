import { ObjectId } from "mongodb";

const seedData = [
  {
    _id: new ObjectId("6742cc5470e85826d17dfbbe"),
    email: "bcfcode@gmail.com",
    // name: "Morteza Bakhshandeh",
    codewars: [],
    totals: {
      codewars: {
        ranks: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
        },
        total: 0,
      },
      missions: 0,
      total: 0,
    },
  },
];

export default seedData;
