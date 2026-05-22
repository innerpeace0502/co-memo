import type { Metadata } from 'next';
import './globals.css';

// Required for @cloudflare/next-on-pages
export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'co-memo | 협업 메모보드',
  description: '팀원들과 메모를 실시간으로 공유하는 협업보드',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
