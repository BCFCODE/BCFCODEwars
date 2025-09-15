import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard'
  },
  description:
    'Manage your coding battles, progress, and profile inside the BCFCODE dashboard.',
  // openGraph: {
  //   title: 'BCFCODE Dashboard',
  //   description:
  //     'Track your coding battles and performance in the BCFCODE dashboard.',
  //   url: 'https://bcfcode.com/dashboard',
  //   siteName: 'BCFCODE',
  //   images: [
  //     {
  //       url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg',
  //       width: 1200,
  //       height: 630,
  //       alt: 'BCFCODE Dashboard Open Graph'
  //     }
  //   ],
  //   type: 'website'
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'BCFCODE Dashboard',
  //   description:
  //     'Manage your coding battles and profile inside the BCFCODE dashboard.',
  //   images: [
  //     {
  //       url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824941/twitter-image_q83jcs.jpg',
  //       alt: 'BCFCODE Dashboard Twitter Image'
  //     }
  //   ]
  // },
  robots: {
    index: false, // 👈 dashboard pages usually should NOT be indexed by search engines
    follow: false
  }
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
