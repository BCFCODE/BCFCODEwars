import { GoogleUser } from "@/types/users";
import DatabaseService from "./db";

const {
  initializeDiamonds,
  saveNewGoogleUser,
  getUser,
  saveNewCodewarsUser,
  updateSingleUser,
} = new DatabaseService();

class GoogleService {
  handleGoogleSignIn = async (user: GoogleUser): Promise<void> => {
    const { email, name, image } = user;

    const existingUser = await getUser(email);

    
    if (!existingUser) {
      initializeDiamonds(email);
      saveNewCodewarsUser(email);
      saveNewGoogleUser(user);
      // how here update the allUsers query? it doesn't update, and refresh required to see the latest change (see the new user in leaderboard table)
    } else {
      updateSingleUser(existingUser.email, {
        ...existingUser,
        // name,
        image,
        lastLogin: new Date(),
        activity: {
          ...existingUser.activity,
          lastLogin: new Date(),
          loginHistory: [...existingUser.activity.loginHistory, new Date()],
          isActiveSession: true,
        },
      });
    }
  };
}

export default GoogleService;
