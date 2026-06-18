import axios from "axios";
import { USERS_API_URL } from "../constants/API";
import { toast } from "react-toastify";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(USERS_API_URL);
    return response.data;
  } catch (error) {
    toast.error("Error fetching users:", error.message);
    throw error;
  }
};
