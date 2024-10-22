'use server';

import { revalidatePath } from 'next/cache';
import { UTApi } from 'uploadthing/server';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1/api';

export const getMovieAction = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/movie/?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return { faield: response.status };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error };
  }
};

export const getMoviesAction = async () => {
  try {
    const response = await fetch(`${API_URL}/movie/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return { faield: response.status };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
};

export const createMovieAction = async (movie: any) => {
  try {
    const response = await fetch(`${API_URL}/movie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      return { faield: response.status };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error };
  }
};

export const updateMovieAction = async (movie: any, id: string) => {
  try {
    const response = await fetch(`${API_URL}/movie/?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      return { faield: response.status };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error };
  }
};

export const deleteMovieAction = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/movie/?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return { faield: response.status };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error };
  }
};

const utapi = new UTApi();
export const removeImage = async (url: string) => {
  console.log('removeImage url', url);
  try {
    const key = url.split('/').at(-1);
    const response = await utapi.deleteFiles(key!);
    return { success: true };
  } catch (error) {
    console.log('error', error);
    return { success: false };
  }
};

export const revalidatePathByAction = (action: string) => {
  revalidatePath(`${action}`, 'page');
};
