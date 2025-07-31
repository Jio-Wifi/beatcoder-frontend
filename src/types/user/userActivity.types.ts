export interface MonthlyActivity {
  month: string; // e.g. 'Aug 2025'
  count: number; // submissions count in that month
}

export interface UserActivity {
  totalSubmissions: number;
  activeDays: number;
  maxStreak: number;
  months: MonthlyActivity[];
}
