import axios from "axios";
import { DEPARTMENTS_API_URL } from "../constants/API";

export const fetchDepartments = async () => {
  try {
    const response = await axios.get(DEPARTMENTS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
