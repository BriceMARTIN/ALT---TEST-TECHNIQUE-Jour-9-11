import axios from "axios";
import { USERS_TOOLS_API_URL } from "../constants/API";
import { toast } from "react-toastify";

export const fetchUsersTools = async () => {
  try {
    const response = await axios.get(USERS_TOOLS_API_URL);
    return response.data;
  } catch (error) {
    toast.error("Error fetching users-tools:", error.message);
    throw error;
  }
};
