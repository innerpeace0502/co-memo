'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import ColorPicker from '@/components/ui/ColorPicker';
import type { CreateMemoInput, MemoColor } from '@/lib/types';

interface CreateMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateMemoInput) => Promise<void>;
}

export default function CreateMemoModal({ isOpen, onClose, onSubmit }: CreateMemoModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<MemoColor>('#fef9c3');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ title: title.trim(), content: content.trim(), color });
      setTitle('');
      setContent('');
      setColor('#fef9c3');
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="새 메모 작성">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          maxLength={100}
          autoFocus
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용 (선택)"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
        />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">색상</p>
          <ColorPicker value={color} onChange={setColor} />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" disabled={!title.trim() || saving}>
            {saving ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
