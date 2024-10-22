'use client';

import React from 'react';
import { Button } from './button';
import { deleteMovieAction, revalidatePathByAction } from '../../app/api/movie';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface IProps {
  id: string;
  path: string;
}

const DeleteMovie = ({ id, path }: IProps) => {
  const t = useTranslations('');
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
    <div className="w-full flex justify-between items-center px-4">
      <DialogPrimitive.Close>{t('Cancel')}</DialogPrimitive.Close>
      <Button variant="destructive" onClick={deleteMovie}>
        {t('Delete')}
      </Button>
    </div>
  );
};

export default DeleteMovie;
