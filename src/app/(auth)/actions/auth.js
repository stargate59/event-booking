"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseClient, protectedRoute } from "@/utils/supabase/server";
import {
  createAccount,
  getAccountByAuthIdQuery,
} from "@/database/services/account";

export const signOut = async () => {
  const supabase = await createSupabaseClient();

  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }

  return null;
};

export async function signIn(userData) {
  const supabase = await createSupabaseClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const account = await getAccountByAuthIdQuery({
    userId: data.user.id,
  });

  return { account, user: data.user };
}

export async function signUp(userData) {
  const supabase = await createSupabaseClient();

  console.log(` userData ${userData}`);
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        full_name: userData.displayName,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  const account = await createAccount({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    role: userData.role,
    userId: data.user.id,
  });

  return { account, user: data.user };
}
