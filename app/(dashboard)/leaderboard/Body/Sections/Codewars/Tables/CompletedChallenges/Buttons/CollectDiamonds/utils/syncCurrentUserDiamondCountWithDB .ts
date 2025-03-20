"use server";

import DBService from "@/app/services/db-service";
import { CurrentUser } from "@/types/users";

// const { updateCurrentUser } = new DBService();

export default async function syncCurrentUserDiamondCountWithDB(
  currentUser: CurrentUser
) {
  // console.log("Running syncCurrentUserDiamondCountWithDB ... (in syncCurrentUserDiamondCountWithDB )", currentUser);
  // try {
  //   // console.log("syncCurrentUserDiamondCountWithDB   > currentUser", currentUser);
  //   await updateCurrentUser(currentUser);
  // } catch (error) {
  //   console.error("syncCurrentUserDiamondCountWithDB  failed:", error);
  // }
  // // saveChallengesList(list, currentUser.codewars.id);
}

//   Yes! You can update two different MongoDB collections in a single request using transactions or bulk operations, depending on your needs.

//   1️⃣ Best Practice: Use Transactions (For Atomic Updates)
//   If you need both updates to succeed together (or fail together if one fails), use transactions with MongoDB Sessions.

//   ✅ Example: Updating users and challenges Collections Atomically
//   ts
//   Copy
//   Edit
//   import { Db, ClientSession } from "mongodb";

//   async function updateUserAndChallenges(
//     db: Db,
//     userId: string,
//     newChallengeList: CodewarsCompletedChallenge[],
//     newUserRank: number
//   ) {
//     const session: ClientSession = db.client.startSession();

//     try {
//       session.startTransaction();

//       const usersCollection = db.collection("users");
//       const challengesCollection = db.collection("challenges");

//       // Update the user's rank
//       await usersCollection.updateOne(
//         { id: userId },
//         { $set: { rank: newUserRank } },
//         { session }
//       );

//       // Update the user's challenge list in another collection
//       await challengesCollection.updateOne(
//         { userId: userId },
//         { $set: { challengeList: newChallengeList } },
//         { upsert: true, session }
//       );

//       // Commit the transaction (both updates succeed together)
//       await session.commitTransaction();
//     } catch (error) {
//       await session.abortTransaction(); // Rollback changes if any error occurs
//       console.error("Transaction failed:", error);
//     } finally {
//       session.endSession();
//     }
//   }
//   🔥 Why Use Transactions?
//   ✅ Ensures both collections update together (either both succeed or both fail)
//   ✅ Prevents partial updates if one operation fails
//   ✅ Best for financial operations, user state updates, and data consistency

//   2️⃣ Alternative: Use Bulk Operations (Faster, But Not Atomic)
//   If you want to update multiple collections without strict atomicity, use bulk operations.

//   ✅ Example: Updating users and challenges in One Request
//   ts
//   Copy
//   Edit
//   async function updateUserAndChallenges(db: Db, userId: string, newChallengeList: CodewarsCompletedChallenge[], newUserRank: number) {
//     const usersCollection = db.collection("users");
//     const challengesCollection = db.collection("challenges");

//     await Promise.all([
//       usersCollection.updateOne({ id: userId }, { $set: { rank: newUserRank } }),
//       challengesCollection.updateOne(
//         { userId: userId },
//         { $set: { challengeList: newChallengeList } },
//         { upsert: true }
//       )
//     ]);
//   }
//   🔥 Why Use Bulk Operations?
//   ✅ Faster than transactions
//   ✅ Good when updates don’t depend on each other
//   ❌ Not atomic (one update may succeed while the other fails)

//   🚀 When to Use Which?
//   🔹 Use Transactions if data consistency is critical (e.g., user balance updates, game scores).
//   🔹 Use Bulk Operations if speed matters more than atomicity (e.g., updating logs, analytics).

//   Would you like an optimized version for your specific use case? 🚀
// */
