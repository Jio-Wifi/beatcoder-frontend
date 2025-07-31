// src/context/ReviewProvider.tsx
import React, { useState, useCallback } from 'react';
import { ReviewContext } from './ReviewContext';
import {
  getAllReviews,
  getReviewById,
  createReview as createReviewAPI,
  deleteReview as deleteReviewAPI,
} from '../../../services/course/review.service';
import type { Review } from '../../../types/course/review.types';

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReviewById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getReviewById(id);
      setSelectedReview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch review');
    } finally {
      setLoading(false);
    }
  }, []);

  const createReview = useCallback(async (payload: { user: string; course: string; rating: number; comment: string }) => {
    setLoading(true);
    setError(null);
    try {
      const newReview = await createReviewAPI(payload);
      setReviews((prev) => [...prev, newReview]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create review');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteReview = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteReviewAPI(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        selectedReview,
        loading,
        error,
        fetchReviews,
        fetchReviewById,
        createReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
