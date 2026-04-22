import axios from "axios";
import { ANALYTICS_API_URL } from "../constants/API";

export const fetchAnalytics = async () => {
  try {
    const response = await axios.get(ANALYTICS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};
