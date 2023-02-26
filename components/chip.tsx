import clsx from 'clsx';
import { MouseEventHandler } from 'react';

export default function Chip({
  disabled = false,
  isSelected = false,
  label,
  onClick,
}: {
  disabled?: boolean;
  isSelected?: boolean;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={clsx(
        'text-[14px] text-palette-200 hover:bg-palette-400',
        isSelected && 'bg-palette-400',
        'border h-8 items-center px-3 rounded-full'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
