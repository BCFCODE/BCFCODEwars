import CodewarsAPIService from "@/app/api/services/codewars";
import DiamondsService from "@/app/services/diamonds";

export const diamondsService = new DiamondsService();
export const codewarsService = new CodewarsAPIService();