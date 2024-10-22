import React from 'react';
import Typography from '@/components/layout/typography';
import Link from 'next/link';
import { SignUpForm } from '@/components/form/sign-up-form';

const page = () => {
  return (
    <div className="w-full grid grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-1">
      <div className="w-full max-w-xs space-y-6">
        <Typography heading="h1" variant="h2" center>
          Sign Up
        </Typography>
        <SignUpForm />
        <div className="flex gap-2 items-center mt-2">
          <p>Already have an account?</p>
          <Link href={'sign-in'} className="text-sm font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
