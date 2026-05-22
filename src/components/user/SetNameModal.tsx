'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface SetNameModalProps {
  isOpen: boolean;
  onSave: (name: string) => void;
  canClose?: boolean;
  onClose?: () => void;
}

export default function SetNameModal({ isOpen, onSave, canClose = false, onClose }: SetNameModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setName('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={canClose && onClose ? onClose : () => {}}
      title="이름을 입력하세요"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          협업보드에서 표시될 이름을 입력해주세요.
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          maxLength={20}
          autoFocus
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!name.trim()}>
            시작하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
