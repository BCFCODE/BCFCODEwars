import { AuthenticatedUser } from "@/types/users";
import { baseURL } from "@/utils/constants";
import { GetUsersResponse } from "../db/users/route";
import { CodewarsUser } from "@/types/codewars";
import { PaginationQuery } from "@/app/services/db";

export interface ConnectToCodewarsResponse {
  success: boolean;
  message?: string;
}

export interface CodewarsReconnectRequest {
  name: string;
  username: string;
  email: string;
  clan: string;
}

class dbAPIService {
  private endpoint = `${baseURL}/api/db`;

  reconnectToCodewars = async (
    { name, username, email, clan }: CodewarsReconnectRequest,
    options?: RequestInit
  ): Promise<ConnectToCodewarsResponse> => {
    try {
      const response = await fetch(`${this.endpoint}/codewars/reconnect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, clan }),
        ...options,
      });

      if (!response.ok) {
        console.warn("reconnectToCodewars 404 or failure:", response.status);
        return {
          success: false,
          message: `Failed with status ${response.status}`,
        };
      }

      return { success: true };
    } catch (error) {
      console.error("reconnectToCodewars error:", error);
      return { success: false, message: "Network error or server error." };
    }
  };

  connectToCodewars = async (
    initializedCodewarsUser: CodewarsUser,
    options?: RequestInit
  ): Promise<ConnectToCodewarsResponse> => {
    try {
      const response = await fetch(`${this.endpoint}/codewars/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initializedCodewarsUser),
        ...options,
      });

      if (!response.ok) {
        console.warn("connectToCodewars 404 or failure:", response.status);
        return {
          success: false,
          message: `Failed with status ${response.status}`,
        };
      }

      return { success: true };
    } catch (error) {
      console.error("connectToCodewars error:", error);
      return { success: false, message: "Network error or server error." };
    }
  };

  getUsers = async ({
    skip,
    limit,
  }: PaginationQuery): Promise<GetUsersResponse> => {
    try {
      const response = await fetch(
        `${this.endpoint}/users?skip=${skip}&limit=${limit}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        console.error(
          "Error: Unable to fetch user data. This might be due to a network issue, an invalid API endpoint, or server unavailability. Please check your internet connection and try again. If the problem persists, contact support or review the server status."
        );
        return {
          success: false,
          list: [],
          totalUsers: 0,
          error:
            "Failed to fetch user data. Please check the console for details.",
        };
      }

      return (await response.json()) as GetUsersResponse;
    } catch (error) {
      console.error("Error fetching user data from database", error);
      // throw new Error(
      //   "Error: Unable to fetch user data. This might be due to a network issue, an invalid API endpoint, or server unavailability. Please check your internet connection and try again. If the problem persists, contact support or review the server status."
      // );
      return {
        success: false,
        list: [],
        totalUsers: 0,
        error: "Error fetching user data",
      };
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
        // console.error("Error: Unable to fetch currentUser.");
        // return {
        //   success: false,
        //   error:
        //     "Failed to fetch user data. Please check the console for details.",
        // };
        throw new Error(
          "Failed to fetch user data. Please check the console for details."
        );
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
}

export default dbAPIService;
