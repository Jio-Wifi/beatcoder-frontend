export interface PopulatedUser {
  _id: string;
  name: string;
  email?: string;
}

export interface PopulatedCourse {
  _id: string;
  title: string;
}

export interface Review {
  _id: string;
  user: string | PopulatedUser;
  course: string | PopulatedCourse;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewState {
  reviews: Review[];
  selectedReview: Review | null;
  loading: boolean;
  error: string | null;
}

export interface ReviewContextProps extends ReviewState {
  fetchReviews: () => Promise<void>;
  fetchReviewById: (id: string) => Promise<void>;
  createReview: (data: { user: string; course: string; rating: number; comment: string }) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
}
