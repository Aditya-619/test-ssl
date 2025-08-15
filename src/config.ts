import dotenv from "dotenv";
dotenv.config();

export const PAYMENT_BASE_URL = process.env.PAYMENT_BASE_URL;
const SECRET_KEY = process.env.PAYMENT_SECRET;

export const headers = {
  Authorization: `Bearer ${SECRET_KEY}`,
  'Content-Type': 'application/json',
};