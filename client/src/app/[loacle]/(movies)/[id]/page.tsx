import React from 'react';
import { getMovieAction } from '../../../api/movie';
import Typography from '@/components/layout/typography';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '../../../../components/ui/button';

interface IProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: IProps) => {
  const t = await getTranslations('');
  const movie = await getMovieAction(params.id);
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <Image
        src={movie.image}
        alt={movie.title}
        width={350}
        height={450}
        className="w-1/2"
      />
      <div>
        <Typography heading="h1" variant="h3">
          Title: {movie.title}
        </Typography>
        <Typography heading="h2" variant="h4">
          Year: {movie.year}
        </Typography>
        <Typography heading="h3" variant="h5">
          Description: {movie.description}
        </Typography>
        <Button variant="secondary" className="w-32 mt-8">
          <Link href={`/${t('locale')}/edit/${movie.id}`}>{t('Edit')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
