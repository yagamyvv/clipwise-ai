import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Clipwise AI',
  description: 'AI-powered short-form video clipping platform for creators.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
