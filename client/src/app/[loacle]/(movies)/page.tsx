import React from 'react';
import Typography from '@/components/layout/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getMoviesAction } from '@/app/api/movie';
import { MovieData } from '@/lib/types';
import Header from '@/components/layout/header';
import MovieCard from '@/components/card/movie-card';

const page = async () => {
  const t = await getTranslations('');

  const moviesList = (await getMoviesAction()) as MovieData[];

  if (moviesList.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <div className="grid space-y-6 w-full max-w-xs">
          <Typography headers="h1" variant="h3" center>
            {t('Your movie list is empty')}
          </Typography>
          <Link href={`${t('locale')}/add-movie`}>
            <Button className="w-full">{t('Add a movie')}</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="container-item">
        <Header />
      </div>

      <div className="mx-2 md:mx-0 col-span-full md:col-span-10 md:col-start-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {moviesList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default page;
