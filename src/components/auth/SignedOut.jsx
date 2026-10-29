import { useAuth } from "@/hooks/useAuth";
import React from "react";

const SignedOut = ({ children }) => {
  const { user } = useAuth();
  return <>{!user ? children : null}</>;
};

export default SignedOut;
