import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Location | Kibiri, near Munyonyo, Kampala',
  description: 'Visit Christ Formed Church International in Kibiri, near Munyonyo, Kampala, Uganda. Get directions, service times, and contact details for our church office.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
