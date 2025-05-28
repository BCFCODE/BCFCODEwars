import { baseURL } from "@/utils/constants";
import { GetDiamondsResponse } from "../db/diamonds/route";

class DiamondsAPIService {
  private endpoint = `${baseURL}/api/db/diamonds`;

  getDiamonds = async (): Promise<GetDiamondsResponse> => {
    try {
      const response = await fetch(this.endpoint, { cache: "no-store" });
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

export default DiamondsAPIService;
