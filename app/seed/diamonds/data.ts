import { ObjectId } from "mongodb";

const seedData = [
  {
    _id: new ObjectId("6742cc5470e85826d17dfbbe"),
    email: "bcfcode@gmail.com",
    name: "Morteza Bakhshandeh",
    diamonds: {
      codewars: 0, // Sum of codewars diamonds awards
      missions: 0,
      sum: 0,
    },
    codewars: {
      id: "63e68a181664895f434c9fa9",
      challenges: [
        { id: "5782dd86202c0e43410001f6" },
        { id: "6210fb7aabf047000f3a3ad6" },
        { id: "5a49f074b3bfa89b4c00002b" },
        { id: "5bc7bb444be9774f100000c3" },
        { id: "536c6b8749aa8b3c2600029a" },
        { id: "59b7571bbf10a48c75000070" },
        { id: "57ebdf1c2d45a0ecd7002cd5" },
        { id: "57d165ad95497ea150000020" },
        { id: "56b5dc75d362eac53d000bc8" },
        { id: "558878ab7591c911a4000007" },
      ],
    },
  },
];

export default seedData;
