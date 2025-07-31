import type { Submission, SubmissionInput, RunResult, LanguageStats, SubmissionActivity, RecentAccepted, ProblemSubmissionsResponse } from "../../types/code/submission.types";
import { safeApiCall } from "../../utils/safeApiCall";
import api from "../axios.service";


// ✅ Create a new code submission (saves to DB)
export const createSubmissionApi = (input: SubmissionInput): Promise<Submission> =>
  safeApiCall(async () => {
    const res = await api.post<{ submission: Submission }>("/submission/submit", input);
    return res.data.submission;
  }, "Failed to create submission");

// ✅ Run code without saving to DB
export const runCodeApi = (input: SubmissionInput): Promise<RunResult> =>
  safeApiCall(async () => {
    const res = await api.post<RunResult>("/submission/run", input);
    return res.data;
  }, "Failed to run code");

// ✅ Get all submissions for the logged-in user
export const fetchMySubmissionsApi = (): Promise<Submission[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ submissions: Submission[] }>("/submission/me");
    return res.data.submissions;
  }, "Failed to fetch your submissions");

// ✅ Get all submissions for a specific problem
export const fetchSubmissionsApi = (problemId: string): Promise<Submission[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ submissions: Submission[] }>(`/submission/${problemId}`);
    return res.data.submissions;
  }, "Failed to fetch submissions for the problem");


  export const fetchSubmissionsBySlugApi = (slug: string): Promise<ProblemSubmissionsResponse> =>
  safeApiCall(async () => {
    const res = await api.get<{ submissions: ProblemSubmissionsResponse}>(
      `/submission/problem/${slug}`
    );
    // console.log(res)
    return res.data.submissions;
  }, 'Failed to fetch submissions for the problem');

  export const fetchMySubmissionsBySlugApi = (slug: string): Promise<ProblemSubmissionsResponse> =>
  safeApiCall(async () => {
    const res = await api.get<{ submissions: ProblemSubmissionsResponse}>(
      `/submission/my/problem/${slug}`
    );
    // console.log(res.data.submissions)
    return res.data.submissions;
  }, 'Failed to fetch submissions for the problem');

// ✅ Get recent accepted submissions for the logged-in user
export const fetchMyRecentAcceptedApi = (): Promise<RecentAccepted[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ recents: RecentAccepted[] }>("/submission/accept/me");
    // console.log(res.data.recents)
    return res.data.recents;
  }, "Failed to fetch recent accepted submissions");

// ✅ Get solved problems by language for the logged-in user
export const fetchMyLanguagesStatsApi = (): Promise<LanguageStats[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ stats: LanguageStats[] }>("/submission/me/languages");
    return res.data.stats;
  }, "Failed to fetch solved problems by language");

// ✅ Get Submission Activity (Last N Days) for heatmap
export const fetchMySubmissionActivityApi = (days = 90): Promise<SubmissionActivity[]> =>
  safeApiCall(async () => {
    const res = await api.get<{ activity: SubmissionActivity[] }>(`/submission/me/activity?days=${days}`);
    return res.data.activity;
  }, "Failed to fetch submission activity");
