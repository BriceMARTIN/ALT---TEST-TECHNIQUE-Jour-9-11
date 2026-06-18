import axios from "axios";
import { ANALYTICS_API_URL } from "../constants/API";
import { toast } from "react-toastify";

export const fetchAnalytics = async () => {
  try {
    const response = await axios.get(ANALYTICS_API_URL);
    return response.data;
  } catch (error) {
    toast.error("Error fetching analytics:", error.message);
    throw error;
  }
};
