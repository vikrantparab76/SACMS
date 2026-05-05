import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface GlobalSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  size?: 'default' | 'large';
  className?: string;
}

export function GlobalSearch({ 
  value, 
  onChange, 
  onSubmit,
  size = 'default',
  className 
}: GlobalSearchProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Search 
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground',
          size === 'large' ? 'w-5 h-5' : 'w-4 h-4'
        )} 
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by concept, learning sequence, task name, or standard (e.g. AP Stats 1.1)"
        className={cn(
          'pl-12 pr-4 bg-background border-border',
          size === 'large' ? 'h-14 text-base rounded-xl' : 'h-10'
        )}
      />
    </div>
  );
}
