import axios from "axios";

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
}

export const handleAxiosError = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    // Prefer backend's message if present, regardless of success field
    const message = error.response?.data?.message;
    if (message) return message;

    if (error.request) {
      return "Network error — please check your connection.";
    }
  }
  return fallbackMessage;
};
