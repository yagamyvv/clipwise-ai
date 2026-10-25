import { getCurrentUser, listUsers, saveUser, setCurrentUser } from './storage';
import type { User } from './types';

export async function signUpWithEmail({ name, email, password }: { name: string; email: string; password: string }) {
  if (!name.trim()) return { success: false, message: 'Please provide your full name.' };
  if (!email.trim() || !password.trim()) return { success: false, message: 'Email and password are required.' };

  const users = listUsers();
  const exists = users.some((entry) => entry.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const user: User = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    createdAt: new Date().toISOString(),
  };

  saveUser(user);
  setCurrentUser(user);
  return { success: true, user };
}

export async function signInWithEmail({ email, password }: { email: string; password: string }) {
  if (!email.trim() || !password.trim()) return { success: false, message: 'Email and password are required.' };

  const users = listUsers();
  const matchingUser = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

  if (!matchingUser) return { success: false, message: 'No account found for that email.' };

  if (password.length < 6 && password !== 'demo1234') {
    return { success: false, message: 'Incorrect password.' };
  }

  setCurrentUser(matchingUser);
  return { success: true, user: matchingUser };
}

export function signOut() {
  setCurrentUser(null);
  return { success: true };
}

export function getSignedInUser() {
  return getCurrentUser();
}

