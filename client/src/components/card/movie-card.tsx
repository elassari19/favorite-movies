import Image from 'next/image';
import React from 'react';
import Typography from '../layout/typography';
import { MovieData } from '@/lib/types';
import { Button } from '../ui/button';
import { Edit, X } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import DeleteMovie from '../ui/delete-movie';
import { DialogPopup } from '../ui/dialog';

interface IProps {
  movie: MovieData;
}

const MovieCard = async ({ movie }: IProps) => {
  const t = await getTranslations('');
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-black/40 p-4 col-span-1 relative group">
      <Image
        src={movie.image}
        alt={movie.title}
        width={250}
        height={400}
        className="w-full rounded-lg"
      />
      <Typography headers="p" variant="sm">
        {movie.title}
      </Typography>
      <Typography variant="xs">{movie.year}</Typography>
      <div className="hidden group-hover:flex flex-col gap-8 p-8 absolute top-0 left-0 w-full h-full bg-black/40">
        <div className="flex justify-between items-center">
          <Button variant="outline">
            <Link href={`${t('locale')}/${movie.id}`}>
              <Edit size={24} />
            </Link>
          </Button>
          <DialogPopup
            dialogTrigger={
              <Button variant="destructive">
                <X size={24} />
              </Button>
            }
            dialogTitle={t('Are you absolutely sure?')}
            dialogContent={
              <Typography className="text-white my-4">
                {t('This will permanently delete the movie')}
              </Typography>
            }
            dialogFooter={<DeleteMovie id={movie.id} path={`${t('locale')}`} />}
          />
        </div>
        <Typography variant="h5" heading="h2">
          {movie.description}
        </Typography>
      </div>
    </div>
  );
};

export default MovieCard;
