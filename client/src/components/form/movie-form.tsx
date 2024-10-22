'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  createMovieAction,
  removeImage,
  updateMovieAction,
} from '@/app/api/movie';
import toast from 'react-hot-toast';
import { MovieData } from '@/lib/types';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';

interface MovieFormProps {
  movieData?: MovieData;
}

const MovieForm: React.FC<MovieFormProps> = ({ movieData }) => {
  const t = useTranslations('');
  const [image, setImage] = React.useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<MovieData>();

  useEffect(() => {
    if (movieData) {
      setValue('title', movieData.title);
      setValue('year', movieData.year);
      setValue('description', movieData.description);
      setValue('image', movieData.image);
      setImage(movieData.image);
    }
  }, [movieData, setValue]);

  const onSubmit = async (data: MovieData) => {
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('year', data.year.toString());
    formData.append('description', data.description);
    formData.append('image', data.image);

    try {
      let response;
      if (movieData) {
        response = await updateMovieAction(data, movieData.id);
      } else {
        response = await createMovieAction(data);
      }

      if (!response.faield) {
        reset();
        return toast.success(
          movieData
            ? t('Movie updated successfully')
            : t('Movie added successfully')
        );
      } else {
        return toast.error('Error adding movie');
      }
    } catch (error) {
      return toast.error('Error adding movie');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-8">
      <div className="grid w-full items-center gap-4">
        <div className="col-span-full grid gap-8 grid-col-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2">
          <div className="md:flex-1 flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="title"
                placeholder={t('Title')}
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="year"
                type="number"
                className="w-full md:w-3/5"
                placeholder={t('Publishing year')}
                {...register('year', {
                  required: 'Year is required',
                  min: { value: 1888, message: 'Year must be 1888 or later' },
                  max: {
                    value: new Date().getFullYear(),
                    message: 'Year cannot be in the future',
                  },
                })}
              />
              {errors.year && (
                <span className="text-red-500 text-sm">
                  {errors.year.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="description"
                placeholder={t('Description')}
                {...register('description', {
                  required: 'Description is required',
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="md:flex-1 flex flex-col space-y-2 md:row-span-2 md:col-start-1 md:row-start-1">
            <div className="relative h-80 bg-input border-2 border-dashed rounded-lg p-4 grid place-content-center cursor-pointer">
              <Upload className="mx-auto mb-2" />
              <p>{t('Upload an image here')}</p>
              {getValues('image') ? (
                <>
                  <Image
                    src={getValues('image')}
                    alt="Movie image"
                    width={350}
                    height={350}
                    className="w-full h-full absolute top-0 left-0"
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={async () => {
                      const res = await removeImage(getValues('image'));
                      if (res.success) {
                        setValue('image', '');
                        setImage(null);
                        toast.success(t('Image deleted successfully'));
                      }
                    }}
                    className="w-40 absolute -bottom-16 left-0 z-10 p-1"
                  >
                    {t('Delete image')}
                  </Button>
                </>
              ) : (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setValue('image', res[0].appUrl);
                    setImage(res);
                    toast.success(t('Image uploaded successfully'));
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(t('Image upload failed'));
                  }}
                  className="opacity-0 absolute top-0 left-0 w-full h-full [&>label]:h-full [&>label]:w-full z-50"
                />
              )}
            </div>
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={() => reset()}
            >
              {t('Cancel')}
            </Button>
            <Button className="w-full" type="submit">
              {t('Submit')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
