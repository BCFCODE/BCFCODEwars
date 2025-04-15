import { AuthenticatedUser } from "@/types/users";
import { baseURL } from "@/utils/constants";

class dbAPIService {
  private endpoint = `${baseURL}/api/db`;

  getUsers = async (options?: RequestInit) => {
    try {
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

      return await response.json();
    } catch (error) {
      console.error("Error fetching user data from database", error);
      return { success: false, error: "Error fetching user data" };
    }
  };

  getUser = async (email: string, options?: RequestInit) => {
    try {
      const url = new URL(`${this.endpoint}/currentUser`);
      url.searchParams.append("email", email);

      const response = await fetch(url.toString(), {
        method: "GET",
        ...options, // This will include things like { signal: controller.signal }
      });
      if (!response.ok) {
        return {
          success: false,
          error:
            "Failed to fetch currentUser data. Please check the console for details.",
        };
      }
 
      return await response.json();
    } catch (error) {
      console.error("Error fetching currentUser data from database", error);
      return { success: false, error: "Error fetching user data" };
    }
  };

  postCurrentUser = async (
    currentUser: AuthenticatedUser
  ): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${this.endpoint}/currentUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });

      if (!response.ok) {
        // Optionally handle non-200 status codes here.
        // throw new Error(`Request failed with status ${response.status}`);
        return { success: false };
      }

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };
}

export default dbAPIService;
