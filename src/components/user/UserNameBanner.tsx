'use client';

interface UserNameBannerProps {
  authorName: string;
  onChangeName: () => void;
}

export default function UserNameBanner({ authorName, onChangeName }: UserNameBannerProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span>
        <span className="font-medium text-gray-800 dark:text-gray-200">{authorName}</span>
        으로 접속 중
      </span>
      <button
        onClick={onChangeName}
        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 underline text-xs transition-colors"
      >
        변경
      </button>
    </div>
  );
}
