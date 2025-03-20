// "use server";

import DBService from "@/app/services/db-service";
import { CurrentUser } from "@/types/users";


export default async function syncCurrentUserDiamondCountWithDB(
  currentUser: CurrentUser
) {
  console.log(
    "This is where you must save diamonds count and update (sync) list in one go",
    currentUser
  ); 
  // async function callSyncUserDiamondCount(currentUser: any) {
  //   const response = await fetch('/api/syncUserDiamondCount', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(currentUser),
  //   });
  //   if (!response.ok) {
  //     throw new Error('Failed to sync diamond count');
  //   }
  //   return response.json();
  // }
}
