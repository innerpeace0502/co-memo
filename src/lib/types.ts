export type MemoColor =
  | '#fef9c3'
  | '#dcfce7'
  | '#dbeafe'
  | '#fce7f3'
  | '#ede9fe'
  | '#ffedd5';

export interface Memo {
  id: string;
  title: string;
  content: string;
  author_name: string;
  color: MemoColor;
  created_at: string;
  updated_at: string;
}

export type CreateMemoInput = Pick<Memo, 'title' | 'content' | 'color'>;
export type UpdateMemoInput = Partial<Pick<Memo, 'title' | 'content' | 'color'>>;

export const MEMO_COLORS: { value: MemoColor; label: string }[] = [
  { value: '#fef9c3', label: '노랑' },
  { value: '#dcfce7', label: '초록' },
  { value: '#dbeafe', label: '파랑' },
  { value: '#fce7f3', label: '분홍' },
  { value: '#ede9fe', label: '보라' },
  { value: '#ffedd5', label: '주황' },
];
