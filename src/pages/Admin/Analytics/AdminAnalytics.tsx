import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { useAnalytics } from "../../../hooks/course/useAnalyatic";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";
import OverviewCarousel from "./OverviewCarousel";
import TiltTorchCard from "../../../components/Common/TiltTorchCard";

// Register Chart.js plugins
ChartJS.register(ArcElement, Tooltip, Title, Legend);



const AdminAnalytics: React.FC = () => {
  const { overview, loading, error } = useAnalytics();
  const canvasRef = useRef<HTMLCanvasElement>(null);

// console.log(overview)
  
  if (loading) return <CustomLoading message="Loading analytics..." />;
  if (error) return <CustomError message={error} />;
  if (!overview) return <CustomLoading message="Fetching overview data..." />;

  // Chart gradients
  const createGradient = (
    canvas: HTMLCanvasElement | null,
    c1: string,
    c2: string
  ) => {
    if (!canvas) return c1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return c1;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);
    return gradient;
  };

  const chartGradients = [
    createGradient(canvasRef.current, "#0B1D51", "#725CAD"),
    createGradient(canvasRef.current, "#725CAD", "#8CCDEB"),
    createGradient(canvasRef.current, "#8CCDEB", "#FFE3A9"),
    createGradient(canvasRef.current, "#FFE3A9", "#FF7601"),
    createGradient(canvasRef.current, "#FF7601", "#10B981"),
    createGradient(canvasRef.current, "#10B981", "#0B1D51"),
  ];

  const doughnutData = {
    labels: Object.keys(overview),
    datasets: [
      {
        data: Object.values(overview).map((val) => Number(val)),
        backgroundColor: chartGradients,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: { color: "#10B981" },
      },
      title: {
        display: true,
        text: "Platform Analytics Overview",
        color: "#10B981",
        font: { size: 18, weight: "bold" as const },
      },
    },
  };

  return (
    <div className="p-6 mx-auto text-gray-900 dark:text-gray-100 space-y-10">
      {/* Overview Cards Carousel */}
      <OverviewCarousel overview={overview} />

      {/* Doughnut Chart */}
      <TiltTorchCard className="!shadow-none">
        <canvas ref={canvasRef} className="hidden" />
        <Doughnut data={doughnutData} options={options} />
      </TiltTorchCard>
    </div>
  );
};

export default AdminAnalytics;
