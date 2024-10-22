'use client';

import React from 'react';
import { Button } from './button';
import { X } from 'lucide-react';
import { deleteMovieAction, revalidatePathByAction } from '../../app/api/movie';
import toast from 'react-hot-toast';

interface IProps {
  id: string;
  path: string;
}

const DeleteMovie = ({ id, path }: IProps) => {
  const deleteMovie = async () => {
    const res = await deleteMovieAction(id);
    if (res) {
      revalidatePathByAction(path);
      toast.success('Movie deleted successfully');
    }
    if (res.error) {
      toast.error('Failed to delete movie');
    }
  };
  return (
    <Button variant="destructive" onClick={deleteMovie}>
      <X size={24} />
    </Button>
  );
};

export default DeleteMovie;
