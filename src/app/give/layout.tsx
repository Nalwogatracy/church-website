import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Give & Tithe Online | Support Our Church & Foundation',
  description: 'Support Christ Formed Church International and the Christ Formed Foundation with online tithes, offerings, and donations in UGX or USD.',
};

export default function GiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
