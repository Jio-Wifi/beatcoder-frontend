import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "../../../hooks/course/useSubscription";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomMessage from "../../../components/Custom/CustomMessage";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomButton from "../../../components/Custom/CustomButton";
import CustomInput from "../../../components/Custom/CustomInput";

const CreateSubscriptionPlan: React.FC = () => {
  const { createPlan, loading, error } = useSubscription();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    interval: "month",
    description: "",
  });

  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPlan({
        name: formData.name,
        price: Number(formData.price) * 100, // Convert to paise
        interval: formData.interval as "month" | "year",
        description: formData.description,
      });
      setSuccess("Subscription plan created successfully!");
      setFormData({ name: "", price: "", interval: "month", description: "" });
      setTimeout(() => navigate("/admin/subscriptions"), 1500);
    } catch (err) {
      console.error("Failed to create plan", err);
    }
  };

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Subscription Plan</h2>

        {/* Loading, Error & Success */}
      <div className="fixed top-1/2 left-1/2">
        
        {loading && <CustomLoading message="Creating plan..." />}
        {error && <CustomMessage type="error" message={error} />}
        {success && <CustomMessage type="success" message={success} />}
      </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Plan Name */}
          <CustomInput
            label="Plan Name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="e.g. Monthly Plan"
            onChange={handleChange}
            required
          />

          {/* Price */}
          <CustomInput
            label="Price (in ₹)"
            name="price"
            type="number"
            value={formData.price}
            placeholder="e.g. 499"
            onChange={handleChange}
            required
          />

          {/* Interval (uses default select) */}
          <div>
            <label className="block font-medium mb-1">Interval</label>
            <select
            aria-label="interval"
              name="interval"
              value={formData.interval}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-accent dark:text-accent"
            >
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>

          {/* Description */}
          <CustomInput
            label="Description (optional)"
            name="description"
            value={formData.description}
            placeholder="Short description of the plan..."
            onChange={handleChange}
          />

          {/* Submit */}
          <CustomButton
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Plan"}
          </CustomButton>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default CreateSubscriptionPlan;
