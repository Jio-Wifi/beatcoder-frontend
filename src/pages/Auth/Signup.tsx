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

const Signup = () => {
  const { register, error: contextError, isLoading } = useAuth(); // use isLoading (not loading)
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null); // avoid duplicate error flashes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await register(name, email, password);
    if (!result.success) {
      if (result.error && result.error !== lastError) {
        setError(result.error);
        setLastError(result.error);
      }
    } else {
      navigate("/"); 
    }
  };

  const handleChange =
    (setter: (val: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError(null); // clear errors on input change
    };

  const isFormValid = name.trim() && email.trim() && password.trim();

  // Sync context error but avoid showing duplicates
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
            autoHideDuration={5000}
          />
        )}
        {isLoading && <CustomLoading message="Signing up..." />}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10 w-full">
        <CustomInput
          name="name"
          value={name}
          onChange={handleChange(setName)}
          placeholder="Name"
          required
        />
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
          {isLoading ? "Please wait..." : "Sign up"}
        </CustomButton>
      </form>

      <div className="flex justify-center mt-2">
        <span className="text-success dark:text-secondary hover:text-danger dark:hover:text-danger cursor-pointer">
          Already have an account?{" "}
          <CustomLink to="/account/signin">Login</CustomLink>
        </span>
      </div>
    </AuthLayout>
  );
};

export default Signup;
