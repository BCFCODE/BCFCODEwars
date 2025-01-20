import { User } from "next-auth";

class APIAuthService {

  createUser = async (user: User) => {
    // try {
    //   const response = await fetch(`${baseURL}/api/auth`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: user.email,
    //       name: user.name,
    //       image: user.image,
    //     }),
    //   });
    //   const data = await response.json();
    //   if (data.user) {
    //     console.log("User data stored in MongoDB:", data.user);
    //   } else {
    //     console.error("Error storing user:", data.error);
    //   }
    // } catch (error) {
    //   console.error("API error during sign-in:", error);
    // }
  };
}

export default APIAuthService