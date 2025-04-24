import { AuthenticatedUser, DatabaseUser } from "@/types/users";
import { baseURL } from "@/utils/constants";
import { GetUsersResponse } from "../db/users/route";

class dbAPIService {
  private endpoint = `${baseURL}/api/db`;

  // CHANGE: Add an optional options parameter (of type RequestInit) so that you can pass a signal (or other fetch options).
  getUsers = async (options?: RequestInit): Promise<GetUsersResponse> => {
    // const currentUserDispatch = useCurrentUserDispatchContext();

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

      return await response.json();
    } catch (error) {
      console.error("Error fetching user data from database");
      return { success: false, error: "Error fetching user data" };
    }
  };

  getCurrentUser = async (
    email: string,
    options?: RequestInit
  ): Promise<{
    success: boolean;
    currentUser?: AuthenticatedUser;
    error?: string;
  }> => {
    try {
      const response = await fetch(
        `${this.endpoint}/currentUser?email=${encodeURIComponent(email)}`,
        {
          ...options,
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        console.error("Error: Unable to fetch currentUser.");
        return {
          success: false,
          error:
            "Failed to fetch user data. Please check the console for details.",
        };
      }
      const { currentUser } = await response.json();

      return { success: true, currentUser };
    } catch (error) {
      console.error("Error aggregate and fetching currentUser from database");
      return { success: false, error: "Error fetching currentUser" };
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

  // getSession = async (
  //   currentUser: AuthenticatedUser
  // ): Promise<{ success: boolean }> => {
  //   try {
  //     const response = await fetch(`${this.endpoint}/currentUser`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(currentUser),
  //     });

  //     if (!response.ok) {
  //       // Optionally handle non-200 status codes here.
  //       // throw new Error(`Request failed with status ${response.status}`);
  //       return { success: false };
  //     }

  //     return { success: true };
  //   } catch (error) {
  //     return { success: false };
  //   }
  // };
}

export default dbAPIService;
