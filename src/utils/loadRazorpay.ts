export const loadRazorpay = (): Promise<RazorpayConstructor | null> => {
  return new Promise((resolve) => {
    // If Razorpay script already loaded
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(window.Razorpay ?? null);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      resolve(null);
    };

    document.body.appendChild(script);
  });
};
