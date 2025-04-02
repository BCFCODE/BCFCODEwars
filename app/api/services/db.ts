import { AuthenticatedUser, DatabaseUser } from "@/types/users";
import { baseURL } from "@/utils/constants";

interface GetUsersAPIResponseError {
  success: boolean;
  error?: string;
}

interface GetUsersAPIResponse extends GetUsersAPIResponseError {
  users?: DatabaseUser[];
}

class dbAPIService {
  private endpoint = `${baseURL}/api/db`;

  // CHANGE: Add an optional options parameter (of type RequestInit) so that you can pass a signal (or other fetch options).
  getUsers = async (options?: RequestInit): Promise<GetUsersAPIResponse> => {
    try {
      // Fetch the data from your API
      const response = await fetch(`${this.endpoint}/users`, {
        ...options, // This will include things like { signal: controller.signal }
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

  postCurrentUser = async (currentUser: AuthenticatedUser) => {
    try {
      const response = await fetch(`${this.endpoint}/currentUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });

      if (!response.ok) {
        // Optionally handle non-200 status codes here.
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error syncing diamond count:", error);
      throw error; // or handle error appropriately
    }
  };
}

export default dbAPIService;
