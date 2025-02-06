import { APIdbGetDiamondsResponse, DBDiamonds } from "@/types/db/diamonds";
import { baseURL } from "@/utils/constants";

class APIDiamondsService {
  private endpoint = `${baseURL}/api/db/diamonds`;

  getDiamonds = async (): Promise<APIdbGetDiamondsResponse> => {
    try {
      const response = await fetch(this.endpoint, { cache: "no-store" });
      if (!response.ok) {
        console.error(
          "Error: Unable to fetch diamonds data from database. This might be due to a network issue, an invalid API endpoint, or server unavailability. Please check your internet connection and try again. If the problem persists, contact support or review the server status."
        );
        return {
          success: false,
          error:
            "Failed to fetch diamonds data from database. Please check the console for details.",
        };
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user data from database");
      return {
        success: false,
        error: "Failed to fetch diamonds data from database. ",
      };
    }
  };
}

export default APIDiamondsService;
