'use client';

import type { Memo } from '@/lib/types';

interface MemoCardProps {
  memo: Memo;
  currentAuthor: string;
  onEdit: (memo: Memo) => void;
  onDelete: (memo: Memo) => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function MemoCard({ memo, currentAuthor, onEdit, onDelete }: MemoCardProps) {
  const isOwner = memo.author_name === currentAuthor;

  return (
    <div
      className="p-4 rounded-xl shadow-sm border border-black/5 flex flex-col gap-2 group relative transition-shadow hover:shadow-md"
      style={{ backgroundColor: memo.color }}
    >
      {isOwner && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(memo)}
            className="p-1 rounded text-gray-600 hover:bg-black/10 text-xs"
            title="수정"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(memo)}
            className="p-1 rounded text-gray-600 hover:bg-black/10 text-xs"
            title="삭제"
          >
            🗑️
          </button>
        </div>
      )}
      <h3 className="font-semibold text-gray-900 text-sm leading-snug pr-10 break-words">
        {memo.title}
      </h3>
      {memo.content && (
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words flex-1">
          {memo.content}
        </p>
      )}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5 text-xs text-gray-500">
        <span className="font-medium">{memo.author_name}</span>
        <span>{formatDate(memo.created_at)}</span>
      </div>
    </div>
  );
}
