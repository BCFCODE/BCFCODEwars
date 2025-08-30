import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sign-in-view';
import { baseUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sign In | BCFCODEwars', // Include brand name for clarity
  description:
    'Sign in to your BCFCODEwars account to access challenges, track progress, and join the coding leaderboard.',
  openGraph: {
    title: 'Sign In | BCFCODEwars',
    description:
      'Sign in to your BCFCODEwars account to access challenges, track progress, and join the coding leaderboard.',
    url: `${baseUrl}/auth/sign-in`,
    siteName: 'BCFCODEwars',
    images: [
      {
        url: '/og-image.png', // replace with your actual OG image
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
      'Sign in to your BCFCODEwars account to access challenges, track progress, and join the coding leaderboard.',
    images: ['/og-image.png']
  }
};

export default async function Page() {
  let stars = 3000; // Default value

  try {
    const response = await fetch(
      'https://api.github.com/repos/BCFCODE/BCFCODEwars', // <- updated URL
      {
        next: { revalidate: 86400 } // Cache for 1 day
      }
    );

    if (response.ok) {
      const data = await response.json();
      stars = data.stargazers_count || stars; // Update stars if API response is valid
    }
  } catch (error) {
    // Error fetching GitHub stars, using default value
    // console.error('Failed to fetch GitHub stars:', error);
    throw new Error('Failed to fetch GitHub stars');
  }

  return <SignInViewPage stars={stars} />;
}
