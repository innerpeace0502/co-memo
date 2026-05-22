import { MEMO_COLORS, type MemoColor } from '@/lib/types';

interface ColorPickerProps {
  value: MemoColor;
  onChange: (color: MemoColor) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {MEMO_COLORS.map(({ value: color, label }) => (
        <button
          key={color}
          type="button"
          title={label}
          onClick={() => onChange(color)}
          className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
          style={{
            backgroundColor: color,
            borderColor: value === color ? '#374151' : 'transparent',
          }}
        />
      ))}
    </div>
  );
}
