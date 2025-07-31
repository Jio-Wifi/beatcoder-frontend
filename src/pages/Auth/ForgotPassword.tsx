import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { Logo } from "../../components/Navbar";
import CustomInput from "../../components/Custom/CustomInput";
import CustomButton from "../../components/Custom/CustomButton";
import CustomLink from "../../components/Custom/CustomLink";
import CustomMessage from "../../components/Custom/CustomMessage";
import CustomLoading from "../../components/Common/CustomLoading";
import useAuth from "../../hooks/auth/useAuth";

const ForgotPassword = () => {
  const { forgotPassword, error: contextError, message, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    await forgotPassword(email); // Send reset request
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  // Sync error from context (avoid duplicate messages)
  useEffect(() => {
    if (contextError && contextError !== lastError) {
      setError(contextError);
      setLastError(contextError);
    }
  }, [contextError, lastError]);

  return (
    <AuthLayout>
      {/* Logo at top */}
      <div className="w-full flex justify-center mb-6">
        <Logo />
      </div>

      {/* Floating notifications */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        {error && (
          <CustomMessage
            type="error"
            message={error}
            onClose={() => setError(null)}
            autoHideDuration={5000}
          />
        )}
        {message && (
          <CustomMessage
            type="success"
            message={message}
            onClose={() => navigate("/account/login")}
            autoHideDuration={4000}
          />
        )}
        {isLoading && <CustomLoading message="Sending reset link..." />}
      </div>

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-14 w-full">
        <CustomInput
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <CustomButton type="submit" disabled={!email.trim() || isLoading}>
          {isLoading ? "Please wait..." : "Send Reset Link"}
        </CustomButton>
      </form>

      {/* Links for navigation */}
      <div className="flex justify-between mt-3 text-sm">
        <CustomLink to="/account/signin">Back to Login</CustomLink>
        <CustomLink to="/account/signup">Sign up</CustomLink>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
