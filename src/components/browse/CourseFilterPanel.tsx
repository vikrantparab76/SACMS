import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

export interface FilterState {
  contentAreas: string[];
  schoolLevels: string[];
}

interface CourseFilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  contentAreaCounts: Record<string, number>;
  schoolLevelCounts: Record<string, number>;
}

const contentAreas = ['English', 'History', 'Math', 'Science', 'Scholar Talent'];
const schoolLevels = ['Elementary School', 'Middle School', 'High School'];

export function CourseFilterPanel({ 
  filters, 
  onFilterChange,
  contentAreaCounts,
  schoolLevelCounts
}: CourseFilterPanelProps) {
  const [contentAreaOpen, setContentAreaOpen] = useState(true);
  const [schoolLevelOpen, setSchoolLevelOpen] = useState(true);
  
  const toggleContentArea = (area: string) => {
    const newAreas = filters.contentAreas.includes(area)
      ? filters.contentAreas.filter(a => a !== area)
      : [...filters.contentAreas, area];
    onFilterChange({ ...filters, contentAreas: newAreas });
  };

  const toggleSchoolLevel = (level: string) => {
    const newLevels = filters.schoolLevels.includes(level)
      ? filters.schoolLevels.filter(l => l !== level)
      : [...filters.schoolLevels, level];
    onFilterChange({ ...filters, schoolLevels: newLevels });
  };

  const clearFilters = () => {
    onFilterChange({ contentAreas: [], schoolLevels: [] });
  };

  const hasActiveFilters = filters.contentAreas.length > 0 || filters.schoolLevels.length > 0;

  return (
    <div className="space-y-4">
      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {filters.contentAreas.length + filters.schoolLevels.length} filters active
          </span>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
            Clear all
          </Button>
        </div>
      )}
      
      {/* Content Areas */}
      <Collapsible open={contentAreaOpen} onOpenChange={setContentAreaOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-secondary/50 rounded-md px-2 transition-colors">
          <h3 className="text-sm font-semibold text-foreground">Content Area</h3>
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            contentAreaOpen && "rotate-180"
          )} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-1">
            {contentAreas.map(area => {
              const isChecked = filters.contentAreas.includes(area);
              const count = contentAreaCounts[area] || 0;
              
              return (
                <div 
                  key={area}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                    isChecked ? "bg-primary/5" : "hover:bg-secondary/50"
                  )}
                  onClick={() => toggleContentArea(area)}
                >
                  <Checkbox 
                    id={`area-${area}`}
                    checked={isChecked}
                    onCheckedChange={() => toggleContentArea(area)}
                  />
                  <Label 
                    htmlFor={`area-${area}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {area}
                  </Label>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* School Levels */}
      <Collapsible open={schoolLevelOpen} onOpenChange={setSchoolLevelOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-secondary/50 rounded-md px-2 transition-colors">
          <h3 className="text-sm font-semibold text-foreground">School Level</h3>
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            schoolLevelOpen && "rotate-180"
          )} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-1">
            {schoolLevels.map(level => {
              const isChecked = filters.schoolLevels.includes(level);
              const count = schoolLevelCounts[level] || 0;
              
              return (
                <div 
                  key={level}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                    isChecked ? "bg-primary/5" : "hover:bg-secondary/50"
                  )}
                  onClick={() => toggleSchoolLevel(level)}
                >
                  <Checkbox 
                    id={`level-${level}`}
                    checked={isChecked}
                    onCheckedChange={() => toggleSchoolLevel(level)}
                  />
                  <Label 
                    htmlFor={`level-${level}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {level}
                  </Label>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
