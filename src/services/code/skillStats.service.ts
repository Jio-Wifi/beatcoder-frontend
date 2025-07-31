import api from "../axios.service";
import { safeApiCall } from "../../utils/safeApiCall";
import type { SkillStat } from "../../types/code/skillStats.types";

const API_URL = "/skill";

// Fetch the logged-in user's skill breakdown
export const fetchMySkillStats = () =>
  safeApiCall(async () => {
    const { data } = await api.get<{ skills: SkillStat[] }>(`${API_URL}/me`);
    return data.skills;
  }, "Failed to fetch skill stats");
