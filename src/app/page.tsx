import MemoBoard from '@/components/board/MemoBoard';

// Required for @cloudflare/next-on-pages
export const runtime = 'edge';

export default function Home() {
  return <MemoBoard />;
}
