import axios from "axios";
import { TOOLS_API_URL } from "../constants/API";
import { toast } from "react-toastify";

export const fetchTools = async () => {
  try {
    const response = await axios.get(TOOLS_API_URL);
    return response.data;
  } catch (error) {
    toast.error("Error fetching tools:", error.message);
    throw error;
  }
};

export const createTool = async (toolData) => {
  try {
    const response = await axios.post(TOOLS_API_URL, toolData);
    return response.data;
  } catch (error) {
    toast.error("Error creating tool:", error.message);
    throw error;
  }
};

export const updateTool = async (id, toolData) => {
  try {
    const response = await axios.put(`${TOOLS_API_URL}/${id}`, toolData);
    return response.data;
  } catch (error) {
    toast.error("Error updating tool:", error.message);
    throw error;
  }
};

export const deleteTool = async (id) => {
  try {
    const response = await axios.delete(`${TOOLS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error deleting tool:", error.message);
    throw error;
  }
};
