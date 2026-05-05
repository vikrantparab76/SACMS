import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { filterOptions } from '@/data/mockData';
import { FilterState } from '@/types/assessment';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function FilterSection({ title, options, selected, onToggle }: FilterSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <Checkbox
              id={`${title}-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={() => onToggle(option)}
            />
            <Label
              htmlFor={`${title}-${option}`}
              className="text-sm text-foreground cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <div className="filter-panel w-64 h-full overflow-y-auto">
      <h2 className="text-base font-semibold text-foreground mb-4">Filters</h2>
      
      <FilterSection
        title="Subject"
        options={filterOptions.subjects}
        selected={filters.subjects}
        onToggle={(v) => toggleFilter('subjects', v)}
      />
      
      <FilterSection
        title="Grade Band"
        options={filterOptions.gradeBands}
        selected={filters.gradeBands}
        onToggle={(v) => toggleFilter('gradeBands', v)}
      />
      
      <FilterSection
        title="Grade"
        options={filterOptions.grades.slice(0, 4)}
        selected={filters.grades}
        onToggle={(v) => toggleFilter('grades', v)}
      />
      
      <FilterSection
        title="Course"
        options={filterOptions.courses}
        selected={filters.courses}
        onToggle={(v) => toggleFilter('courses', v)}
      />
      
      <FilterSection
        title="Learning Sequence"
        options={filterOptions.learningSequences}
        selected={filters.learningSequences}
        onToggle={(v) => toggleFilter('learningSequences', v)}
      />
    </div>
  );
}
