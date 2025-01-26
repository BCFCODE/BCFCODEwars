import { GoogleUser } from "@/types/google";
import { NewDatabaseUser } from "@/types/user";
import DatabaseService from "./db-service";

const { updateSingleUser, saveSingleUser, getUser } = new DatabaseService();

class GoogleService {
  makeDatabaseUserFromGoogleSigninUser = (
    user: GoogleUser
  ): NewDatabaseUser => ({
    email: user.email,
    name: user.name,
    image: user.image,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    codewars: { isConnected: false },
  });

  handleGoogleSignIn = async (user: GoogleUser): Promise<void> => {
    const { email, name, image } = user;

    const existingUser = await getUser(email);

    if (existingUser) {
      updateSingleUser(email, {
        lastLogin: new Date().toISOString(),
        image,
        name,
      });
    } else {
      const newUser = this.makeDatabaseUserFromGoogleSigninUser(user);
      saveSingleUser<NewDatabaseUser>(newUser);
    }
  };
}

export default GoogleService;
