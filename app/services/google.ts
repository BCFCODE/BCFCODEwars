import { GoogleUser } from "@/types/users";
import DatabaseService from "./db";

const { getUser, updateSingleUser, addNewUser } = new DatabaseService();

class GoogleService {
  handleGoogleSignIn = async (user: GoogleUser): Promise<void> => {
    const existingUser = await getUser(user.email);

    if (!existingUser) {
      await addNewUser(user);
    } else {
      updateSingleUser(existingUser.email, {
        ...existingUser,
        // name,
        image: user.image,
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
