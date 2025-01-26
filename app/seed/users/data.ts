import { ObjectId } from "mongodb";

const seedData = [
  {
    _id: new ObjectId("66de10e40acbb5c30fc4e49b"),
    username: "Morteza",
    email: "bcfcode@gmail.com",
    password: "1234",
    createdAt: new Date("2024-09-08T21:02:28.684Z"),
  },
  {
    _id: new ObjectId(),
    username: "Sepehr",
    email: "sepehr.salimian11@gmail.com",
    password: "1234",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    username: "Mahsa",
    email: "mahsa.alamdari95@gmail.com",
    password: "1234",
    createdAt: new Date("2024-09-08T21:41:41.283Z"),
  },
];

export default seedData;
