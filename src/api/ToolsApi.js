import axios from "axios";
import { TOOLS_API_URL } from "../constants/API";

export const fetchTools = async () => {
  try {
    const response = await axios.get(TOOLS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tools:", error);
    throw error;
  }
};
