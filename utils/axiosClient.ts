import axios from "axios";
import { baseURL } from "./constants";

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosClient;
