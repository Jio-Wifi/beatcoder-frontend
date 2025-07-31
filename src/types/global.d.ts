export {};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      close: () => void;
    };
  }
}

export interface RazorpayOptions {
  key: string;
  subscription_id?: string;
  amount?: number;
  currency?: string;
  name?: string;
  description?: string;
  theme?: { color?: string };
  handler: (response: unknown) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
}
