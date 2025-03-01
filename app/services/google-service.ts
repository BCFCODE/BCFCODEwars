import { GoogleUser } from "@/types/google";
import DBService from "./db-service";

const {
  initializeDiamonds,
  updateSingleUser,
  saveNewGoogleUser,
  getUser,
  saveNewCodewarsUser,
} = new DBService();

class GoogleService {
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
      initializeDiamonds(email);
      saveNewCodewarsUser(email);
      saveNewGoogleUser(user);
    }
  };
}

export default GoogleService;
