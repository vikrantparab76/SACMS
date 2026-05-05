import { cn } from '@/lib/utils';

interface SearchChipProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function SearchChip({ label, onClick, className }: SearchChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn('chip', className)}
    >
      {label}
    </button>
  );
}
