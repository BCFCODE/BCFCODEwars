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

    // Check if user is repetitive or not
    if (!existingUser) {
      initializeDiamonds(email);
      saveNewCodewarsUser(email);
      saveNewGoogleUser(user);
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
