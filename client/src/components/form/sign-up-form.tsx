'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormData } from '../../lib/types';
import { signUpSchema } from '../../lib/schema';
import { signUpAction } from '../../app/api/auth';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Typography from '../layout/typography';
import toast from 'react-hot-toast';

interface IProps {}

export function SignUpForm({}: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await signUpAction(data);
      if (response.faield) {
        return toast.error('Failed to sign Up. Please try again.');
      }
      return toast.success('Signed Up successfully');
    } catch (err) {
      return toast.error('Failed to sign in. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="text"
          id="fullName"
          placeholder="Full Name"
          {...register('fullName')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.fullName && (
          <Typography heading="p" className="text-red-500">
            {errors.fullName.message}
          </Typography>
        )}
      </div>
      <div>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && (
          <Typography heading="p" className="text-red-500">
            {errors.email.message}
          </Typography>
        )}
      </div>
      <div>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && (
          <Typography heading="p" className="text-red-500">
            {errors.password.message}
          </Typography>
        )}
      </div>
      <div>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.confirmPassword && (
          <Typography heading="p" className="text-red-500">
            {errors.confirmPassword.message}
          </Typography>
        )}
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}
