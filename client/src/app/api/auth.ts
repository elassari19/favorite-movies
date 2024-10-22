'use server';

import { deleteCookie, setCookie } from '@/lib/cookies-handler';
import { revalidatePath } from 'next/cache';
import { SignUpFormData } from '../../lib/types';

interface UserCredentials {
  email: string;
  password: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1/api';

export async function signInAction(credentials: UserCredentials) {
  console.log('signInAction:credentials', credentials);
  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    console.log('signInAction:_', response);

    if (!response.ok) {
      return { faield: response.status };
    }

    const data = await response.json();
    setCookie('movies-session', data.user);

    return data.user;
  } catch (error) {
    return { error };
  }
}

export async function signUpAction(credentials: SignUpFormData) {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    console.log('signUpAction', response.statusText);
    return { faield: response.status };
  }

  const data = await response.json();
  setCookie('movies-session', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return data.user;
}

export async function signOut() {
  try {
    const response = await fetch(`${API_URL}/auth/sign-out`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.log('signOut', response.statusText);
    }
    const data = await response.json();
    console.log('signOut', data);

    deleteCookie('movies-session');
    revalidatePath(`/`, 'page');
    return data;
  } catch (error) {
    return 'error';
  }
}
