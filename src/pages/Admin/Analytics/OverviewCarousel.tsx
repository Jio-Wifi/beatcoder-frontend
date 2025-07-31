// src/components/admin/OverviewCarousel.tsx
import React, { useEffect, useRef, type JSX } from "react";
import type { AnalyticsOverview } from "../../../types/course/analyatic.types";
import { Card, CardContent } from "../../../components/ui/Card";
import {
  FaBook,
  FaUsers,
  FaWallet,
  FaCertificate,
  FaChalkboardTeacher,
  FaChartLine,
  FaClipboardList,
  FaCommentDots,
  FaLayerGroup,
  FaPen,
} from "react-icons/fa";

interface OverviewCarouselProps {
  overview: AnalyticsOverview;
}

// Config maps backend keys (total*) to icons and styles
const overviewConfig: Record<
  keyof AnalyticsOverview,
  { label: string; icon: JSX.Element; gradient: string }
> = {
  totalCourses: {
    label: "Courses",
    icon: <FaBook size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
  totalLessons: {
    label: "Lessons",
    icon: <FaClipboardList size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-teal-500 to-green-500",
  },
  totalUserSubscriptions: {
    label: "Subscriptions",
    icon: <FaWallet size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-pink-500 to-red-500",
  },
  totalReviews: {
    label: "Reviews",
    icon: <FaCommentDots size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  totalProgress: {
    label: "Progress",
    icon: <FaChartLine size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-cyan-500 to-teal-500",
  },
  totalCategories: {
    label: "Categories",
    icon: <FaLayerGroup size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  totalQuizzes: {
    label: "Quizzes",
    icon: <FaPen size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-indigo-500 to-purple-500",
  },
  totalCertificates: {
    label: "Certificates",
    icon: <FaCertificate size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  totalInstructors: {
    label: "Instructors",
    icon: <FaChalkboardTeacher size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-orange-500 to-yellow-500",
  },
  totalUsers: {
    label: "Users",
    icon: <FaUsers size={40} className="text-white" />,
    gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
};

// Which metrics to display (subset)
const visibleMetrics: (keyof AnalyticsOverview)[] = [
  "totalCourses",
  "totalLessons",
  "totalUserSubscriptions",
  "totalReviews",
  "totalProgress",
  "totalCategories",
  "totalQuizzes",
  "totalCertificates",
  "totalInstructors",
  "totalUsers",
];

const OverviewCarousel: React.FC<OverviewCarouselProps> = ({ overview }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);

  // Smooth auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const speed = 0.5; // pixels per frame
    let frame: number;

    const autoScroll = () => {
      if (!container) return;
      scrollPos.current += speed;
      container.scrollLeft = scrollPos.current;

      if (scrollPos.current >= container.scrollWidth - container.clientWidth) {
        scrollPos.current = 0; // Loop back
      }

      frame = requestAnimationFrame(autoScroll);
    };

    frame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="max-w-[1120px] overflow-x-hidden" ref={scrollRef}>
      <div className="flex gap-4 px-4 py-6 min-w-max">
        {visibleMetrics.map((key) => {
          const { label, icon, gradient } = overviewConfig[key];
          return (
            <Card
              key={key}
              className={`flex-shrink-0 ${gradient} text-white rounded-xl shadow-lg w-56 hover:shadow-xl transition-all`}
            >
              <CardContent className="flex flex-col items-center py-6 space-y-3">
                <div>{icon}</div>
                <h3 className="capitalize text-lg font-semibold">{label}</h3>
                <p className="text-3xl font-bold">{overview[key] ?? 0}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewCarousel;
