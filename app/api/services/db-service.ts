import { DBUser } from "@/types/db/users";
import { baseURL } from "@/utils/constants";

interface GetUsersAPIResponseError {
  success: boolean;
  error?: string;
}

interface GetUsersAPIResponse extends GetUsersAPIResponseError {
  users?: DBUser[];
}

class APIdbService {
  private endpoint = `${baseURL}/api/db/users`;

  getUsers = async (): Promise<GetUsersAPIResponse> => {
    try {
      // Fetch the data from your API
      const response = await fetch(this.endpoint, {
        cache: "no-store",
      });
      if (!response.ok) {
        console.error(
          "Error: Unable to fetch user data. This might be due to a network issue, an invalid API endpoint, or server unavailability. Please check your internet connection and try again. If the problem persists, contact support or review the server status."
        );
        return {
          success: false,
          error:
            "Failed to fetch user data. Please check the console for details.",
        };
      }
      const data = await response.json();

      return { success: true, users: data.users };
    } catch (error) {
      console.error("Error fetching user data from database");
      return { success: false, error: "Error fetching user data" };
    }
  };
}

export default APIdbService;
