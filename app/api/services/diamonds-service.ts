import { APIdbGetDiamondsResponse } from "@/types/db/diamonds";
import { baseURL } from "@/utils/constants";

class APIDiamondsService {
  private endpoint = `${baseURL}/api/db/diamonds`;

  getDiamonds = async (options?: RequestInit): Promise<APIdbGetDiamondsResponse> => {
    try {
      const response = await fetch(this.endpoint, {...options});
      if (!response.ok) {
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
