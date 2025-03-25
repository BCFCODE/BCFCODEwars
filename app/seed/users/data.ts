import { ObjectId } from "mongodb";

const seedData = [
  {
    _id: new ObjectId("6742cc5470e85826d17dfbbe"),
    username: "Morteza",
    email: "bcfcode@gmail.com",
    password: "1234",
    firstLogin: new Date("2024-09-08T21:02:28.684Z"),
  },
  {
    _id: new ObjectId(),
    username: "Sepehr",
    email: "sepehr.salimian11@gmail.com",
    password: "1234",
    firstLogin: new Date(),
  },
  {
    _id: new ObjectId(),
    username: "Mahsa",
    email: "mahsa.alamdari95@gmail.com",
    password: "1234",
    firstLogin: new Date("2024-09-08T21:41:41.283Z"),
  },
];

export default seedData;
