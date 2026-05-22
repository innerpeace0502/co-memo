'use client';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import type { Memo } from '@/lib/types';

interface DeleteConfirmModalProps {
  memo: Memo | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export default function DeleteConfirmModal({ memo, onClose, onConfirm }: DeleteConfirmModalProps) {
  const handleConfirm = async () => {
    if (!memo) return;
    await onConfirm(memo.id);
    onClose();
  };

  return (
    <Modal isOpen={!!memo} onClose={onClose} title="메모 삭제">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">&ldquo;{memo?.title}&rdquo;</span> 메모를 삭제할까요?
          <br />이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}
