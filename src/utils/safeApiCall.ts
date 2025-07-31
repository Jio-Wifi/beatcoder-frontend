import { handleAxiosError } from "./handleAxiosError";

export const safeApiCall = async <T>(
  apiFn: () => Promise<T>,
  fallbackMessage: string
): Promise<T> => {
  try {
    return await apiFn();
  } catch (error) {
    // Get a clean error message (prefer backend's message)
    const message = handleAxiosError(error, fallbackMessage);
    // Throw a proper Error object so UI components can display it
    throw new Error(message);
  }
};
