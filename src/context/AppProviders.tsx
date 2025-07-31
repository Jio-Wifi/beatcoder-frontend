import React from "react";
import AuthProvider from "./auth/AuthProvider";
import ThemeProvider from "./theme/ThemeProvider";
import LoaderProvider from "./loader/LoaderProvider";
import { UserProvider } from "./user/UserProvider";

import { CourseProvider } from "./course/course/CourseProvider";
import { LessonProvider } from "./course/lesson/LessonProvider";
import { ReviewProvider } from "./course/review/ReviewProvider";
import { ProgressProvider } from "./course/progress/ProgressProvider";
import { CategoryProvider } from "./course/category/CategoryProvider";
import { QuizProvider } from "./course/quiz/QuizProvider";
import { CertificateProvider } from "./course/certificate/CertificateProvider";
import { InstructorProvider } from "./course/instructor/InstructorProvider";
import { AnalyticsProvider } from "./course/analyatic/AnalyaticProvider";
import SubscriptionProvider from "./course/subscription/SubscriptionProvider";
import { ProblemProvider } from "./code/problem/ProblemProvider";
import { SubmissionProvider } from "./code/submission/SubmissionProvider";
import { TestCaseProvider } from "./code/testcase/TestCaseProvider";
import { UserActivityProvider } from "./user/userActivity/UserActivityProvider";
import { CommunityStatsProvider } from "./code/communityStats/CommunityStatsProvider";
import { SkillStatsProvider } from "./code/skillStats/SkillStatsProvider";
import { ChatProvider } from "./chat/ChatProvider";
import { CompilerProvider } from "./compiler/CompilerProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoaderProvider>
      <AuthProvider>
        <ThemeProvider>
          <UserProvider>
            <ProblemProvider>
              <SubmissionProvider>
                <TestCaseProvider>
                  <CourseProvider>
                    <LessonProvider>
                        <ReviewProvider>
                          <ProgressProvider>
                            <CategoryProvider>
                                <QuizProvider>
                                  <CertificateProvider>
                                    <InstructorProvider>
                                      <AnalyticsProvider>
                                        <SubscriptionProvider>
                                        <UserActivityProvider>
                                        <CommunityStatsProvider>
                                          <SkillStatsProvider>
                                            <ChatProvider>
                                              <CompilerProvider>
                                        {children}
                                        </CompilerProvider>
                                        </ChatProvider>
                                        </SkillStatsProvider>
                                        </CommunityStatsProvider>
                                        </UserActivityProvider>
                                        </SubscriptionProvider>
                                        </AnalyticsProvider>
                                    </InstructorProvider>
                                  </CertificateProvider>
                                </QuizProvider>
                            </CategoryProvider>
                          </ProgressProvider>
                        </ReviewProvider>
                    </LessonProvider>
                  </CourseProvider>
                </TestCaseProvider>
              </SubmissionProvider>
            </ProblemProvider>
          </UserProvider>
        </ThemeProvider>
      </AuthProvider>
    </LoaderProvider>
  );
};

export default AppProviders;
