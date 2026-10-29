"use client";

import { getAccountByAuthIdQuery } from "@/database/services/account";
import { useAuth } from "@/hooks/useAuth";
import { createContext, useState, useEffect } from "react";
// import { createClient } from '@/utils/supabase/client'

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  // const supabase = createClient()
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const getAccount = async () => {
      const account = await getAccountByAuthIdQuery({
        userId: user?.id,
      });
      if (account) {
        console.log(`account ${JSON.stringify(account)}`);
        setAccount(account);
      }
    };
    getAccount();
    setLoading(false);
  }, [user]);

  return (
    <AccountContext.Provider value={{ account, loading, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };
