import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust based on backend

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, { ...userData, role: "user", action: "register" });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const registerAdmin = async (adminData) => {
    try {
        const response = await axios.post(API_URL, { ...adminData, role: "admin", action: "register" });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, { ...userData, role: "user", action: "login" });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const loginAdmin = async (adminData) => {
    try {
        const response = await axios.post(API_URL, { ...adminData, role: "admin", action: "login" });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};