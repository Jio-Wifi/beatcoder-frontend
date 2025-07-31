import { useSubscription } from "../../hooks/course/useSubscription";
import AnimatedCard from "../../components/Common/AnimatedCard";
import AnimatedSection from "../../components/Common/AnimatedSection";
import OtherSay from "./OtherSay";
import PremiumFeatures from "./PremiumFeatures";
import { useCallback, useState } from "react";
import CustomLoading from "../../components/Common/CustomLoading";
import CustomMessage from "../../components/Custom/CustomMessage";
import type { RazorpayPaymentResponse, RazorpayOptions } from "../../types/razorpay";
import useAuth  from "../../hooks/auth/useAuth";

const Premium = () => {
  const { plans, loading, error, startSubscription, verifyWebhook } = useSubscription();
  const { user } = useAuth();

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

const handleSubscribe = useCallback(
  async (planId: string) => {
    if (!user?._id) {
      setMessage({ type: "error", text: "Please login to subscribe" });
      return;
    }

    try {
      setProcessingPlanId(planId);
      setMessage(null);

      // Request backend to create a Razorpay subscription
      const res = await startSubscription(user._id, planId);
      const { key_id, razorpaySubscriptionId } = res.data as {
        key_id: string;
        razorpaySubscriptionId: string;
      };

      const options: RazorpayOptions & {
        modal?: { ondismiss: () => void };
      } = {
        key: key_id,
        subscription_id: razorpaySubscriptionId,
        name: "BeatCoder Premium",
        description: "Unlock premium features and support development",
        theme: { color: "#6C63FF" },
        handler: async (response: unknown) => {
          const paymentResponse = response as RazorpayPaymentResponse;

          // Verify payment with backend
          await verifyWebhook({
            userId: user._id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_subscription_id: razorpaySubscriptionId,
          });

          setMessage({
            type: "success",
            text: `Subscription successful! Payment ID: ${paymentResponse.razorpay_payment_id}`,
          });

          setProcessingPlanId(null);
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          userId: user._id,
          planId,
        },
        // Reset button if user cancels the payment popup
        modal: {
          ondismiss: () => {
            setMessage({ type: "error", text: "Payment was cancelled." });
            setProcessingPlanId(null);
          },
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options as unknown as RazorpayOptions);
        rzp.open();
      } else {
        throw new Error("Razorpay SDK not loaded");
      }
    } catch (err) {
      console.error("Subscription failed:", err);
      setMessage({ type: "error", text: "Failed to start subscription. Please try again." });
      setProcessingPlanId(null);
    }
  },
  [user, startSubscription, verifyWebhook]
);


  return (
    <div className="py-10 max-w-container mx-auto space-y-10">
      <AnimatedSection delay={0.1}>
        <div>
          <h2 className="text-center text-4xl font-bold text-danger">Premium</h2>
          <p className="text-center mt-1 text-secondary dark:text-success font-light">
            Get started with a{" "}
            <span>
              <small className="text-success font-semibold text-sm">Beat</small>
              <small className="text-danger font-semibold text-sm">Coder</small>
            </span>{" "}
            Subscription that works for you.
          </p>

          {loading && <CustomLoading message="Loading plans..." />}
          {error && <CustomMessage type="error" message={error} />}
          {message && <CustomMessage type={message.type} message={message.text} />}

          <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto justify-center mt-5">
            {plans.map((plan, idx) => (
              <AnimatedSection key={plan._id} delay={0.3 + idx * 0.2}>
                <AnimatedCard className="!rounded-none !bg-transparent !shadow-none !p-4">
                  <div
                    className={`${
                      plan.interval === "year"
                        ? "bg-gradient-to-r from-light via-light to-accent"
                        : "bg-white dark:bg-dime"
                    } text-primary rounded-lg p-3 shadow-xl dark:shadow-md dark:shadow-accent/20`}
                  >
                    {plan.interval === "year" && (
                      <div className="bg-accent text-primary inline-block px-2 py-1 rounded-md text-sm font-mono">
                        🫀 Most Popular
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <div className="flex space-x-2 pt-2">
                        <h3 className="text-2xl font-semibold">{plan.name}</h3>
                        <span className="inline-block self-end text-sm text-success">
                          {plan.interval === "year"
                            ? `Billed yearly (₹${plan.price / 100})`
                            : `Billed monthly (₹${plan.price / 100})`}
                        </span>
                      </div>
                      <p className="text-sm">{plan.description}</p>
                      <div className="flex flex-col">
                        <span className="text-3xl pt-5 text-primary dark:text-secondary font-semibold">
                          ₹{plan.price / 100}{" "}
                          <small>/{plan.interval === "year" ? "year" : "month"}</small>
                        </span>
                        <span className="text-xs">
                          Prices in <small className="text-danger text-sm">INR</small>
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSubscribe(plan._id)}
                      disabled={processingPlanId === plan._id}
                      className={`${
                        plan.interval === "year"
                          ? "bg-gradient-to-r from-secondary via-accent to-primary hover:from-primary hover:via-accent hover:to-secondary"
                          : "bg-secondary hover:bg-accent dark:bg-secondary dark:hover:bg-accent"
                      } text-dime w-full py-3 rounded font-semibold mt-4 transition-all duration-300 ${
                        processingPlanId === plan._id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {processingPlanId === plan._id ? "Processing..." : "Subscribe"}
                    </button>
                  </div>
                </AnimatedCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.7}>
        <PremiumFeatures />
      </AnimatedSection>
      <AnimatedSection delay={0.9}>
        <OtherSay />
      </AnimatedSection>
    </div>
  );
};

export default Premium;
