import { NewDatabaseUser } from "./user";

export interface LeaderboardRow
  extends Pick<NewDatabaseUser, "createdAt" | "image"> {
  name: string; // User's name
  rank: number; // User's rank
  position: number; // User's local position
  globalPosition: number; // User's global position
}
