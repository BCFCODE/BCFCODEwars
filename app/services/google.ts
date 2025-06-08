import { GoogleUser } from "@/types/users";
import DatabaseService from "./db";

const { getUser, updateSingleUser, addNewUser } = new DatabaseService();

class GoogleService {
  handleGoogleSignIn = async (user: GoogleUser): Promise<void> => {
    const existingUser = await getUser(user.email);

    if (!existingUser) {
      await addNewUser(user);
    } else {
      await updateSingleUser({
        email: existingUser.email,
        update:{
          image: user.image,
          lastLogin: new Date(),
          "activity.lastLogin": new Date(),
          "activity.loginHistory": [...existingUser.activity.loginHistory, new Date()],
          "activity.idleHistory": [],
          "activity.isIdle": true,
        },
      });
    }
  };
}

export default GoogleService;
