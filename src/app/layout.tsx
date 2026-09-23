import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Christ Formed Church International | Kibiri, Munyonyo, Kampala',
  description: 'Welcome to Christ Formed Church International in Kibiri, near Munyonyo, Kampala, Uganda. Founded by Pastor Duncan Kirya. Spreading the message of Christ and supporting older people and single mothers through the Christ Formed Foundation.',
  keywords: ['Christ Formed Church International', 'Pastor Duncan Kirya', 'Kibiri', 'Munyonyo', 'Kampala', 'Uganda', 'Christ Formed Foundation', 'Single Mothers', 'Older People Care', 'Worship', 'Sermons'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
