import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { Logo } from "../../components/Navbar";
import CustomInput from "../../components/Custom/CustomInput";
import CustomButton from "../../components/Custom/CustomButton";
import CustomLink from "../../components/Custom/CustomLink";
import CustomMessage from "../../components/Custom/CustomMessage";
import CustomLoading from "../../components/Common/CustomLoading";
import useAuth  from "../../hooks/auth/useAuth";

const Login = () => {
  const { login, error: contextError, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null); // Prevent repeat error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await login(email, password);
    if (!result.success) {
      if (result.error && result.error !== lastError) {
        setError(result.error);
        setLastError(result.error);
      }
    } else {
      navigate("/dashboard"); // Redirect if successful
    }
  };

  // Clear error when user edits inputs
  const handleChange =
    (setter: (val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null);
    };

  const isFormValid = email.trim() && password.trim();

  // Sync context error only if it’s new
  useEffect(() => {
    if (contextError && contextError !== lastError) {
      setError(contextError);
      setLastError(contextError);
    }
  }, [contextError, lastError]);

  return (
    <AuthLayout>
      <div className="w-full flex justify-center mb-6">
        <Logo />
      </div>

      {/* Floating error + loader */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        {error && (
          <CustomMessage
            type="error"
            message={error}
            onClose={() => setError(null)}
            autoHideDuration={5000} // auto-dismiss after 5 seconds
          />
        )}
        {isLoading && <CustomLoading message="Logging in..." />}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-14 w-full">
        <CustomInput
          name="email"
          type="email"
          value={email}
          onChange={handleChange(setEmail)}
          placeholder="Email"
          required
        />

        <CustomInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange(setPassword)}
          placeholder="Password"
          required
        />

        <CustomButton type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? "Please wait..." : "Login"}
        </CustomButton>
      </form>

      <div className="flex justify-between mt-2">
        <CustomLink to="/account/forgot-password">Forgot Password?</CustomLink>
        <CustomLink to="/account/signup">Sign up</CustomLink>
      </div>
    </AuthLayout>
  );
};

export default Login;
