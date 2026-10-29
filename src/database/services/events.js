'use server';
import pool from "@/database/postgres";
import {
  createEventQuery,
  deleteEventQuery,
  getEventByAccountIdQuery,
  getEventByIdQuery,
  getEventsQuery,
  updateEventQuery,
} from "../queries/events";

const getEvents = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(getEventsQuery);
    client.release();
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const getEventByAccountId = async (accountId) => {
  try {
    const client = await pool.connect();
    const result = await client.query(getEventByAccountIdQuery, [accountId]);
    client.release();
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const getEventById = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(getEventByIdQuery, [id]);
    client.release();
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const createEvent = async (accountId, event) => {
  try {
    const client = await pool.connect();
    const result = await client.query(createEventQuery, [
      event.name,
      event.description,
      event.start_date,
      event.end_date,
      accountId,
    ]);
    client.release();
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const updateEvent = async (accountId, data) => {
  try {
    const client = await pool.connect();
    const result = await client.query(updateEventQuery, [
      data.name,
      data.description,
      data.start_date,
      data.end_date,
      accountId,
    ]);
    client.release();
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

const deleteEvent = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(deleteEventQuery, [id]);
    client.release();
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error("Database query error:", err);
    return {};
  }
};

export { createEvent, updateEvent, deleteEvent };
