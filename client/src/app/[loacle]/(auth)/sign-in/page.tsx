import Typography from '@/components/layout/typography';
import { SignInForm } from '@/components/form/sign-in-form';
import Link from 'next/link';

export default async function Home({}) {
  return (
    <div className="w-full grid grid-cols-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-1">
      <div className="w-full max-w-xs space-y-6">
        <Typography heading="h1" variant="h2" center>
          Sign In
        </Typography>
        <SignInForm />
        <div className="flex gap-2 items-center mt-2">
          <Typography>You don't have account?</Typography>
          <Link href={'sign-up'} className="text-sm font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
