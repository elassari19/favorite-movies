import React from 'react';
import MovieForm from '@/components/form/movie-form';
import Typography from '@/components/layout/typography';
import { getTranslations } from 'next-intl/server';
import { MovieData } from '@/lib/types';
import { getMovieAction } from '../../../../api/movie';

interface IPorps {
  params: {
    id: string;
  };
}

const page = async ({ params }: IPorps) => {
  const movie = await getMovieAction(params.id);
  console.log('movie', movie);
  if (movie.error) {
    return <Typography>Something went wrong</Typography>;
  }

  const t = await getTranslations('');
  return (
    <div className="container my-8">
      <div className="container-item">
        <Typography heading="h2" variant="h3">
          {t('Edit')}
        </Typography>
      </div>
      <div className="container-item">
        <MovieForm movieData={movie} />
      </div>
    </div>
  );
};

export default page;
