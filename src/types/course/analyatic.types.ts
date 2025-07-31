// Represents overall dashboard stats (counts)
export interface AnalyticsOverview {
  totalCourses: number;
  totalLessons: number;
  totalReviews: number;
  totalProgress: number;
  totalCategories: number;
  totalQuizzes: number;
  totalCertificates: number;
  totalInstructors: number;
  totalUsers: number;
  totalUserSubscriptions: number;
}

// Represents a single data point for revenue or subscriptions
export interface RevenueData {
  month?: number;         // Always 1–12 (for charts)
  revenue?: number;      // Used for revenue charts
  subscriptions?: number; // Used for subscription charts
  database?: number;     // DB-related totals (optional)
  razorpay?: number;     // Razorpay-related totals (optional)
  total?: number;        // Combined totals (optional)
}
