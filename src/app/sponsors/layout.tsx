import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Christ Formed Foundation | Supporting Single Mothers & Elder Care',
  description: 'Partner with the Christ Formed Foundation in Kibiri, Kampala, Uganda. Providing food, financial, and practical support to single mothers and older community members.',
};

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
