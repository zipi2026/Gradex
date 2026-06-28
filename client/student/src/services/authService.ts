import type { User } from '../types';

const API_BASE = 'http://localhost:5000/api/auth';

const parseJson = async (response: Response) => {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      response.statusText ||
      'Request failed';

    throw new Error(String(message));
  }

  return payload;
};

export const authService = {
  me: async (): Promise<User> => {
    const payload = await parseJson(
      await fetch(`${API_BASE}/me`, {
        credentials: 'include',
      })
    );

    return {
      studentId: Number(payload.user_id ?? 0),
      name: payload.username ?? 'סטודנט',
      classId: 1,
    };
  },

  login: async (payload: { id: string; password: string; rememberMe: boolean }) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: payload.id,
        password: payload.password,
      }),
    });

    await parseJson(response);
    return { success: true };
  },
};