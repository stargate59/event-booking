"use server";
import pool from "@/database/postgres";
import {
  getAccountsQuery,
  getAccountByAuthQuery,
  createAccountQuery,
  updateAccountQuery,
  deleteAccountQuery,
} from "@/database/queries/account";

const getAccounts = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(getAccountsQuery);
    client.release();
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const getAccountByAuthIdQuery = async (userData) => {
  try {
    const client = await pool.connect();
    // const result = await client.query(select);
    const result = await client.query(getAccountByAuthQuery, [userData.userId]);
    client.release();
    console.log(result);
    return result.rows[0];
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const createAccount = async (account) => {

  try {
    const { firstName, lastName, email, userId, role } = account;
    const client = await pool.connect();
    const result = await client.query(createAccountQuery, [
      firstName,
      lastName,
      email,
      userId,
      role,
    ]);
    client.release();
    console.log(result.rows);
    return result.rows[0];
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const updateAccount = async (id, account) => {
  const {
    company,
    website,
    firstName,
    lastName,
    email,
    phone,
    street,
    street2,
    city,
    state,
    zip,
    country,
  } = account;
  const result = await pool.query(updateAccountQuery, [
    id,
    company,
    website,
    firstName,
    lastName,
    email,
    userId,
    phone,
    street,
    street2,
    city,
    state,
    zip,
    country,
    user_id,
    role,
  ]);
  return result.rows[0];
};

const deleteAccount = async (id) => {
  const result = await pool.query(deleteAccountQuery, [id]);
  return result.rows[0];
};

export {
  getAccounts,
  getAccountByAuthIdQuery,
  createAccount,
  updateAccount,
  deleteAccount,
};
