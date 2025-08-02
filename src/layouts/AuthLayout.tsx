import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white dark:bg-primary shadow-md rounded-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
