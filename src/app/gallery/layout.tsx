import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo & Video Gallery | Worship & Altar Moments',
  description: 'View photos and video highlights of water baptism celebrations, worship altar gatherings, and community foundation outreach at Christ Formed Church International.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
