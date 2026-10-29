"use client";

import { createContext, useState, useEffect } from "react";
import { createClient } from '@/utils/supabase/client'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const supabase = createClient()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ param }) => {
      // console.log(`user ${JSON.stringify(param?.data?.user)}`);
      setUser(param?.data?.user || null);
      setLoading(false);
    });

    const listener = supabase.auth.onAuthStateChange((e, session) => {
      console.log(`user ${JSON.stringify(session?.user)}`);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      console.log(`listener cleanup`, listener);
      listener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
