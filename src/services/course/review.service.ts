import api from "../axios.service";
import type { Review } from "../../types/course/review.types";
import { safeApiCall } from "../../utils/safeApiCall";

const API_URL = "/review";

// Fetch all reviews
export const getAllReviews = (): Promise<Review[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ reviews: Review[] }>(API_URL);
    return data.reviews;
  }, "Failed to fetch reviews");

// Fetch a review by ID
export const getReviewById = (id: string): Promise<Review> =>
  safeApiCall(async () => {
    const { data } = await api.get<{ review: Review }>(`${API_URL}/${id}`);
    return data.review;
  }, "Failed to fetch review");

// Create a new review
export const createReview = (payload: {
  user: string;
  course: string;
  rating: number;
  comment: string;
}): Promise<Review> =>
  safeApiCall(async () => {
    const { data } = await api.post<{ review: Review }>(API_URL, payload);
    return data.review;
  }, "Failed to create review");

// Delete a review
export const deleteReview = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete review");
