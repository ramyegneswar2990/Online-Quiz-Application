import axios from "axios";
import { API_BASE_URL } from "./api";

export const getLeaderboardByCourse = async (courseName) => {
  const encodedCourseName = encodeURIComponent(courseName)
  const response = await axios.get(`${API_BASE_URL}/api/leaderboard/${encodedCourseName}`);
  return response.data;
};
