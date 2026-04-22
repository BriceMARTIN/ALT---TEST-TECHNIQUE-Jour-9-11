import axios from "axios";
import { USERS_TOOLS_API_URL } from "../constants/API";

export const fetchUsersTools = async () => {
  try {
    const response = await axios.get(USERS_TOOLS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users-tools:", error);
    throw error;
  }
};
