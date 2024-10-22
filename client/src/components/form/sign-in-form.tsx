'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SignInFormData } from '@/lib/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { signInAction } from '../../app/api/auth';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean().optional(),
});

interface IProps {}

export function SignInForm({}: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signInAction(data);
      console.log('Sign-in response:', response);
      if (response.faield) {
        return toast.error('Failed to sign in. Please try again.');
      }
      return toast.success('Signed in successfully');
    } catch (err) {
      return toast.error('Failed to sign in. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register('email')}
          className="w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password')}
          className="w-full"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-center justify-center">
          <Input
            type="checkbox"
            {...register('rememberMe')}
            className="mr-2 w-4"
          />
          Remember me
        </label>
      </div>
      <Button type="submit" className="w-full font-bold text-lg">
        Sign In
      </Button>
    </form>
  );
}
