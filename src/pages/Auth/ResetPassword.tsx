import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { Logo } from "../../components/Navbar";
import CustomInput from "../../components/Custom/CustomInput";
import CustomButton from "../../components/Custom/CustomButton";
import CustomMessage from "../../components/Custom/CustomMessage";
import CustomLoading from "../../components/Common/CustomLoading";
import useAuth from "../../hooks/auth/useAuth";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const { changePassword, error: contextError, message, isLoading } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    await changePassword(token, password);
  };

  const handleChange =
    (setter: (val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
    };

  // Sync new errors from context
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

      {/* Notifications */}
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
            onClose={() => navigate("/account/signin")}
            autoHideDuration={4000}
          />
        )}
        {isLoading && <CustomLoading message="Resetting password..." />}
      </div>

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-14 w-full">
        <CustomInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange(setPassword)}
          placeholder="New Password"
          required
        />

        <CustomInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange(setConfirmPassword)}
          placeholder="Confirm New Password"
          required
        />

        <CustomButton
          type="submit"
          disabled={!password.trim() || !confirmPassword.trim() || isLoading}
        >
          {isLoading ? "Please wait..." : "Reset Password"}
        </CustomButton>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
