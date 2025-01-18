import { DatabaseUser } from "@/types/database";
import { baseURL } from "@/utils/constants";

class APIUsersService {
  private endpoint = `${baseURL}/api/users`;

  getUsers = async () => {
    try {
      // Fetch the data from your API
      const response = await fetch(this.endpoint, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();

      return data.users as DatabaseUser[];
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [{ success: false }, { error: "Error fetching user data" }];
    }
  };
}

export default APIUsersService;
