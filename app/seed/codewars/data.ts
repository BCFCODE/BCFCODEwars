import { ObjectId } from "mongodb";

const seedData = [
  {
    _id: new ObjectId("6742cc5470e85826d17dfbbe"),
    email: 'bcfcode@gmail.com',
    userInformation: {
      id: "63e68a181664895f434c9fa9",
      username: "BCFCODE",
      name: "Bakhshandeh Morteza",
      honor: 4843,
      clan: "BCFCODEwars",
      leaderboardPosition: 2019,
      skills: ["bakhshandehmorteza.ir"],
      ranks: {
        overall: {
          rank: -2,
          name: "2 kyu",
          color: "purple",
          score: 5026,
        },
        languages: {
          javascript: {
            rank: -2,
            name: "2 kyu",
            color: "purple",
            score: 4996,
          },
          typescript: {
            rank: -7,
            name: "7 kyu",
            color: "white",
            score: 33,
          },
        },
      },
      codeChallenges: {
        totalAuthored: 0,
        totalCompleted: 1235,
      },
    },
    completedChallenges: {
      totalPages: 7,
      totalItems: 1235,
      data: [
        {
          id: "5782dd86202c0e43410001f6",
          name: "Number , number ... wait LETTER !",
          slug: "number-number-dot-dot-dot-wait-letter",
          // https://dev.codewars.com/#code-challenges-api
          // https://www.codewars.com/api/v1/code-challenges/5782dd86202c0e43410001f6
          completedLanguages: ["javascript"],
          completedAt: "2025-01-11T10:08:25.255Z",
        },
        {
          id: "6210fb7aabf047000f3a3ad6",
          name: "Assemble string",
          slug: "assemble-string",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-11T07:15:17.608Z",
        },
        {
          id: "5a49f074b3bfa89b4c00002b",
          name: "String subpattern recognition I",
          slug: "string-subpattern-recognition-i",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-10T10:46:49.721Z",
        },
        {
          id: "5bc7bb444be9774f100000c3",
          name: "Versions manager",
          slug: "versions-manager",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-08T16:01:49.068Z",
        },
        {
          id: "536c6b8749aa8b3c2600029a",
          name: "A String of Sorts",
          slug: "a-string-of-sorts",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T14:19:50.740Z",
        },
        {
          id: "59b7571bbf10a48c75000070",
          name: "String tops",
          slug: "string-tops",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T13:51:48.865Z",
        },
        {
          id: "57ebdf1c2d45a0ecd7002cd5",
          name: "Inside Out Strings",
          slug: "inside-out-strings",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T12:39:29.984Z",
        },
        {
          id: "57d165ad95497ea150000020",
          name: "Pairs of Bears",
          slug: "pairs-of-bears",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T12:13:47.514Z",
        },
        {
          id: "56b5dc75d362eac53d000bc8",
          name: "Basics 03: Strings, Numbers and Calculation",
          slug: "basics-03-strings-numbers-and-calculation",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-04T09:40:39.524Z",
        },
        {
          id: "558878ab7591c911a4000007",
          name: "Single Word Pig Latin",
          slug: "single-word-pig-latin",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-04T09:25:40.915Z",
        },
      ],
    },
  },
];

export default seedData;
