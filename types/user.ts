// types/user.ts
export interface GoogleUser {
  // id?: string; // Google unique user ID
  name: string; // User's display name
  email: string; // User's email address
  image?: string; // URL to the user's profile picture
  // Any additional fields you might need based on the Google API response
}

export interface NewUser extends GoogleUser {
  createdAt: Date;
  lastLogin: Date;
}

export interface Session {
  user: GoogleUser | null | undefined; // Include `undefined` to handle missing data
  // Additional session-related fields if necessary
}
