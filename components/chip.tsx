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
        'min-h-4 px-2 text-xs',
        'sm:h-6 sm:px-2',
        'md:h-8 md:px-3 md:text-sm',
        isSelected && 'bg-palette-500',
        'border items-center rounded-full',
        'text-palette-200 hover:bg-palette-500'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
