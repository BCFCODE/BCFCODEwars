import { GoogleUser } from "@/types/google";
import { NewDatabaseUser } from "@/types/user";
import { User } from "next-auth";

class GoogleService {
  createNewDatabaseUser = (user: GoogleUser): NewDatabaseUser => ({
    email: user.email,
    name: user.name,
    image: user.image,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    codewars: { isConnected: false },
  });
}

export default GoogleService;
