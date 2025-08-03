import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Navbar from "./components/Navbar";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import Premium from "./pages/Premium/Premium";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/User/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProblemSet from "./pages/Problem/ProblemSet";
import ProblemDetailPage from "./pages/Problem/ProblemDetails";
// import StudyPlan from "./pages/Problem/StudyPlan/StudyPlan";
// import Favorite from "./pages/Problem/Favorite/Favorite";
import Breif from "./pages/Breif/Breif";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import AddLesson from "./pages/Admin/Lessons/AddLesson"; // <-- NEW
import CreateCourse from "./pages/Admin/Courses/CreateCourse";
import CourseList from "./pages/Admin/Courses/CourseList";
import EditCourse from "./pages/Admin/Courses/EditCourse";
import LessonList from "./pages/Admin/Lessons/LessonList";
import EditLesson from "./pages/Admin/Lessons/EditLesson";
import ReviewList from "./pages/Admin/Reviews/ReviewList";
import ProgressTracker from "./pages/Admin/Progress/ProgressTracker";
import CategoryList from "./pages/Admin/Categories/CategoryList";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import EditCategory from "./pages/Admin/Categories/EditCategory";
import AllSubscriptionPlan from "./pages/Admin/Subscription/AllSubscriptionPlan";
import CreateSubscriptionPlan from "./pages/Admin/Subscription/CreateSubscriptionPlan";
import QuizList from "./pages/Admin/Quizes/QuizList";
import CreateQuiz from "./pages/Admin/Quizes/CreateQuiz";
import UpdateQuiz from "./pages/Admin/Quizes/EditQuiz";
import ProblemList from "./pages/Admin/Code/Problem/ProblemList";
import CreateProblem from "./pages/Admin/Code/Problem/CreateProblem";
import UpdateProblem from "./pages/Admin/Code/Problem/UpdateProblem";
import CertificateList from "./pages/Admin/Certificates/CertificateList";
import IssueCertificate from "./pages/Admin/Certificates/IssueCertificate";
import CreateTestCase from "./pages/Admin/Code/TestCase/CreateTestCase";
import ViewTestCaseById from "./pages/Admin/Code/TestCase/ViewTestCaseById";
import UpdateTestCase from "./pages/Admin/Code/TestCase/UpdateTestCase";
import CreateInstructor from "./pages/Admin/Instructors/CreateInstructor";
import InstructorList from "./pages/Admin/Instructors/InstructorList";
import UserList from "./pages/Admin/Users/UserList";
import UserDetail from "./pages/Admin/Users/UserDetail";
import Explore from "./pages/Course/Courses";
import CourseDetails from "./pages/Course/CourseDetails";
import ProtectedSubscriptionRoute from "./components/ProtectedSubscriptionRoute";
import Topic from "./pages/Problem/Topics/Topic";
import NotPageFound from "./components/NotPageFound";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import { useState } from "react";
import OverlayModal from "./components/Ai/Chat/OverlayModal";
import FloatingAIButton from "./components/Ai/Chat/FloatingAIButton";
// import GeminiContainer from "./components/Ai/Chat/GeminiContainer";
import SubmissionDetails from "./components/problem/Submissions/SubmissionDetails";
import StudyPlan from "./pages/Problem/StudyPlan/StudyPlan";
import StudyPlanDetails from "./pages/Problem/StudyPlan/StudyPlanDetails";
import Favorite from "./pages/Problem/Favorite/Favorite";
import EditorLayout from "./pages/Compiler/EditorLayout";
import Sketch from "./pages/Lab/Sketch/Sketch";
import Draw from "./pages/Lab/Draw/Draw";
import Flow from "./pages/Lab/Flow/Flow";
import TabLayout from "./components/Ai/Tabs/TabLayout";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");
  const [showGemini, setShowGemini] = useState(false);

  return (
    <>
      {!hideNavbar && <Navbar />}

      {/* Floating Chat Button */}
      <FloatingAIButton onClick={() => setShowGemini(true)} />

      {/* Gemini AI Chat Modal */}
      <OverlayModal isOpen={showGemini} onClose={() => setShowGemini(false)}>
        <TabLayout />
      </OverlayModal>

      <Routes>
        {/* Public/User routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/account/signin"
          element={
            <GuestOnlyRoute>
              <Login />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="/account/signup"
          element={
            <GuestOnlyRoute>
              <Signup />
            </GuestOnlyRoute>
          }
        />
        <Route path="/account/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* // Topic  */}
        <Route path="/topics/:subject" element={<Topic />} />

        {/* // Explore Pages  */}
        <Route path="/explore/courses" element={<Explore />} />
        <Route
          path="/explore/course/:id"
          element={
            <ProtectedSubscriptionRoute>
              <CourseDetails />
            </ProtectedSubscriptionRoute>
          }
        />
        <Route path="/explore/compiler" element={<EditorLayout />} />
        <Route path="/explore/sketch" element={<Sketch />} />
        <Route path="/explore/draw" element={<Draw />} />
        <Route path="/explore/flow" element={<Flow />} />



        {/* Problem pages */}
        <Route path="/problemset" element={<ProblemSet />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/study-plan/:slug" element={<StudyPlanDetails />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/problems/:slug/:tab" element={<ProblemDetailPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* // Submisson  */}
        <Route
          path="/problems/:slug/submissions/:submissionId"
          element={
            <ProtectedRoute>
              <SubmissionDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin routes (Navbar hidden) */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Redirect /admin to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Courses */}
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/create" element={<CreateCourse />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />

          {/* Lessons */}
          <Route path="lessons" element={<LessonList />} />
          <Route path="lessons/create" element={<AddLesson />} />
          <Route path="lessons/edit/:lessonId" element={<EditLesson />} />

          {/* Reviews */}
          <Route path="reviews" element={<ReviewList />} />

          {/* Progress Tracker */}
          <Route path="progress" element={<ProgressTracker />} />

          {/* Categories */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="category/edit/:categoryId" element={<EditCategory />} />

          {/* Subscription */}
          <Route path="subscriptions" element={<AllSubscriptionPlan />} />
          <Route
            path="subscriptions/create"
            element={<CreateSubscriptionPlan />}
          />

          {/* quiz */}
          <Route path="quizzes" element={<QuizList />} />
          <Route path="quizzes/create" element={<CreateQuiz />} />
          <Route path="quizzes/edit/:quizId" element={<UpdateQuiz />} />

          {/* Code (Problems) */}
          <Route path="problems" element={<ProblemList />} />
          <Route path="problems/create" element={<CreateProblem />} />
          <Route path="problems/edit/:slug" element={<UpdateProblem />} />

          <Route path="testcases/:problemId" element={<ViewTestCaseById />} />
          <Route
            path="testcases/create/:problemId"
            element={<CreateTestCase />}
          />
          <Route
            path="testcases/edit/:testcaseId"
            element={<UpdateTestCase />}
          />

          {/* // issue certificate  */}
          <Route path="certificates" element={<CertificateList />} />
          <Route path="certificates/issue" element={<IssueCertificate />} />

          {/* // Instructor  */}
          <Route path="instructors" element={<InstructorList />} />
          <Route path="instructors/create" element={<CreateInstructor />} />

          {/* // Users */}
          <Route path="users" element={<UserList />} />
          <Route path="users/:userId" element={<UserDetail />} />
        </Route>

        {/* Other static pages */}
        <Route path="/breif" element={<Breif />} />
        <Route path="/subscribe" element={<Premium />} />

        <Route path="*" element={<NotPageFound />} />
      </Routes>
    </>
  );
};

export default App;
