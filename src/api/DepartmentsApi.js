import axios from "axios";
import { DEPARTMENTS_API_URL } from "../constants/API";
import { toast } from "react-toastify";

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(DEPARTMENTS_API_URL);
    return response.data;
  } catch (error) {
    toast.error("Error fetching departments:", error.message);
    throw error;
  }
};
