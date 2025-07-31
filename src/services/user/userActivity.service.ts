import api from "../axios.service";
import { safeApiCall } from "../../utils/safeApiCall";
import type { UserActivity } from "../../types/user/userActivity.types";

const API_URL = "/user/activity";

export const fetchUserActivityApi = () =>
  safeApiCall(async () => {
    const res = await api.get<{ activity: UserActivity }>(`${API_URL}/me`);
    return res.data.activity;
  }, "Failed to fetch user activity");
