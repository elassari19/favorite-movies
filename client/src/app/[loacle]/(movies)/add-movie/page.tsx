import React from 'react';
import MovieForm from '@/components/form/movie-form';
import Typography from '@/components/layout/typography';
import { getTranslations } from 'next-intl/server';

const page = async () => {
  const t = await getTranslations('');
  return (
    <div className="container my-8">
      <div className="container-item">
        <Typography heading="h2" variant="h3">
          {t('Create a new movie')}
        </Typography>
      </div>
      <div className="container-item">
        <MovieForm />
      </div>
    </div>
  );
};

export default page;
