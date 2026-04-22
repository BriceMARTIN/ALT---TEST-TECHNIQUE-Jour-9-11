import axios from "axios";
import { USERS_API_URL } from "../constants/API";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(USERS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
