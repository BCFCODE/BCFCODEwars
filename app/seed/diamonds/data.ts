import { ObjectId } from "mongodb";

const seedData = [
  {
    _id: new ObjectId("6742cc5470e85826d17dfbbe"),
    email: "bcfcode@gmail.com",
    // name: "Morteza Bakhshandeh",
    totals: {
      codewars: 0, // Sum of codewars diamonds awards
      missions: 0,
      total: 0,
    },
  },
];

export default seedData;
