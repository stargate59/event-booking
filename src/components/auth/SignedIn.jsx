import { useAuth } from "@/hooks/useAuth";
import React from "react";

const SignedIn = ({ children }) => {
  const { user } = useAuth();
  return <>{user ? children : null}</>;
};

export default SignedIn;
