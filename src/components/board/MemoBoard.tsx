'use client';

import { useState, useMemo } from 'react';
import { useMemos } from '@/hooks/useMemos';
import { useAuthorName } from '@/hooks/useAuthorName';
import MemoCard from './MemoCard';
import SetNameModal from '@/components/user/SetNameModal';
import UserNameBanner from '@/components/user/UserNameBanner';
import CreateMemoModal from '@/components/memo/CreateMemoModal';
import EditMemoModal from '@/components/memo/EditMemoModal';
import DeleteConfirmModal from '@/components/memo/DeleteConfirmModal';
import SearchBar from '@/components/search/SearchBar';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ThemeToggle';
import type { Memo } from '@/lib/types';

export default function MemoBoard() {
  const { authorName, setAuthorName, isLoaded } = useAuthorName();
  const { memos, loading, error, createMemo, updateMemo, deleteMemo } = useMemos();

  const [showSetName, setShowSetName] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [deletingMemo, setDeletingMemo] = useState<Memo | null>(null);
  const [search, setSearch] = useState('');

  const needsName = isLoaded && !authorName;

  const filteredMemos = useMemo(() => {
    if (!search.trim()) return memos;
    const q = search.toLowerCase();
    return memos.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.content.toLowerCase().includes(q) ||
        m.author_name.toLowerCase().includes(q)
    );
  }, [memos, search]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <nav className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">📝 co-memo</h1>
            {authorName && (
              <UserNameBanner
                authorName={authorName}
                onChangeName={() => setShowSetName(true)}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <SearchBar value={search} onChange={setSearch} />
            {authorName && (
              <Button onClick={() => setShowCreate(true)} size="sm">
                + 새 메모
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Board */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
            오류: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredMemos.length === 0 ? (
          <div className="text-center py-24 text-gray-400 dark:text-gray-600">
            {search ? '검색 결과가 없습니다.' : '아직 메모가 없습니다. 첫 번째 메모를 작성해보세요!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMemos.map((memo) => (
              <MemoCard
                key={memo.id}
                memo={memo}
                currentAuthor={authorName}
                onEdit={setEditingMemo}
                onDelete={setDeletingMemo}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <SetNameModal
        isOpen={needsName || showSetName}
        onSave={(name) => {
          setAuthorName(name);
          setShowSetName(false);
        }}
        canClose={!needsName}
        onClose={() => setShowSetName(false)}
      />
      <CreateMemoModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={(input) => createMemo(input, authorName)}
      />
      <EditMemoModal
        memo={editingMemo}
        onClose={() => setEditingMemo(null)}
        onSubmit={updateMemo}
      />
      <DeleteConfirmModal
        memo={deletingMemo}
        onClose={() => setDeletingMemo(null)}
        onConfirm={deleteMemo}
      />
    </div>
  );
}
