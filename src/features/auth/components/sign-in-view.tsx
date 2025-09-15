import { buttonVariants } from '@/components/UI/Button';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In | BCFCODEwars',
  description:
    'Sign in to your BCFCODEwars account to access coding challenges, track your progress, and join the leaderboard.',
  openGraph: {
    title: 'Sign In | BCFCODEwars',
    description:
      'Sign in to your BCFCODEwars account to access coding challenges, track your progress, and join the leaderboard.',
    url: 'https://bcfcodewars.vercel.app/sign-in',
    siteName: 'BCFCODEwars',
    images: [
      {
        url: '/og-image.png', // Replace with your OG image
        width: 1200,
        height: 630,
        alt: 'BCFCODEwars Sign In'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In | BCFCODEwars',
    description:
      'Sign in to your BCFCODEwars account to access coding challenges, track your progress, and join the leaderboard.',
    images: ['/og-image.png']
  }
};

export default function SignInViewPage({ stars }: { stars: number }) {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-[2fr_1fr] lg:px-0'>
      {/* Optional top-right navigation */}
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Login
      </Link>

      {/* Left panel with branding and testimonial */}
      <div className='relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        {/* Background video for left panel only */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 h-full w-full object-cover opacity-90'
        >
          <source
            src='https://res.cloudinary.com/ds8pptoh2/video/upload/v1749216344/BCFCODE_LOGO_motion_boeobd.mp4'
            type='video/mp4'
          />
        </video>
        {/* Optional dark overlay for readability */}
        <div className='absolute inset-0 bg-amber-200/5' />

        {/* Content on top of video */}
        <div className='relative z-10 flex h-full flex-col justify-between'>
          <div className='flex items-center text-lg font-medium'>
            <Image
              height={40}
              width={40}
              src='https://res.cloudinary.com/ds8pptoh2/image/upload/v1747825921/BCFCODE-LOGO_vtfegn.jpg'
              alt='BCFCODE Logo'
              className='mr-2 h-10 w-10 rounded-4xl object-contain'
            />
            <span>BCFCODE</span>
          </div>

          <blockquote className='relative z-10 mt-auto w-4xl space-y-2'>
            <p className='text-lg'>
              &ldquo;BCFCODE has accelerated my learning and helped me stay
              motivated with coding challenges and community rankings.&rdquo;
            </p>
            <footer className='text-sm'>— A Happy Coder</footer>
          </blockquote>
        </div>
      </div>

      {/* Right panel with sign-in form */}
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          {/* GitHub star link for social proof */}
          <Link
            className={cn('group inline-flex hover:text-yellow-200')}
            target='_blank'
            href={'https://github.com/BCFCO'}
          >
            <div className='flex items-center'>
              <GitHubLogoIcon className='size-4' />
              <span className='ml-1 inline'>Star on GitHub</span>
            </div>
            <div className='ml-2 flex items-center gap-1 text-sm md:flex'>
              <IconStar
                className='size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300'
                fill='currentColor'
              />
              <span className='font-display font-medium'>{stars}</span>
            </div>
          </Link>

          {/* Sign-in form */}
          <ClerkSignInForm
            initialValues={
              {
                // emailAddress: 'BCFCODE@gmail.com'
              }
            }
          />

          {/* Terms and privacy */}
          <p className='text-muted-foreground px-8 text-center text-sm'>
            By continuing, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
