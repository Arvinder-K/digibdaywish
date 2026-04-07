import { kv } from '@vercel/kv';

/**
 * Utility to save and retrieve birthday wishes using Vercel KV (Redis).
 * This works in serverless environments like Vercel.
 */

export const saveWish = async (id, data) => {
  try {
    // Store with an expiry if needed (e.g., 30 days) or permanent
    await kv.set(`wish:${id}`, data);
    return true;
  } catch (error) {
    console.error('KV Error (Save):', error);
    return false;
  }
};

export const getWish = async (id) => {
  try {
    const data = await kv.get(`wish:${id}`);
    return data;
  } catch (error) {
    console.error('KV Error (Get):', error);
    return null;
  }
};

export default kv;
