import { GraduationCap, Users, BookOpen, FlaskConical, Clock, Upload, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface CourseData {
  id: string;
  name: string;
  contentArea: string;
  schoolLevel: string;
  itemCount: number;
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
  canvasPublishedAt?: string;
  canvasCourseId?: string;
}

interface CourseCardProps {
  course: CourseData;
  onClick: (course: CourseData) => void;
  onPublish?: (course: CourseData) => void;
  selectionMode?: boolean;
  isSelected?: boolean;
  onSelectToggle?: (course: CourseData) => void;
}

function getContentAreaIcon(contentArea: string) {
  switch (contentArea.toLowerCase()) {
    case 'math':
      return <GraduationCap className="w-5 h-5" />;
    case 'english':
      return <BookOpen className="w-5 h-5" />;
    case 'science':
      return <FlaskConical className="w-5 h-5" />;
    case 'history':
      return <Clock className="w-5 h-5" />;
    case 'scholar talent':
      return <Users className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
}

function getContentAreaColor(contentArea: string) {
  switch (contentArea.toLowerCase()) {
    case 'math':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'english':
      return 'bg-purple-50 text-purple-600 border-purple-200';
    case 'science':
      return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    case 'history':
      return 'bg-amber-50 text-amber-600 border-amber-200';
    case 'scholar talent':
      return 'bg-pink-50 text-pink-600 border-pink-200';
    default:
      return 'bg-secondary text-muted-foreground border-border';
  }
}

export function CourseCard({ course, onClick, onPublish, selectionMode, isSelected, onSelectToggle }: CourseCardProps) {
  const iconColorClass = getContentAreaColor(course.contentArea);
  
  const handlePublishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPublish?.(course);
  };

  const handleCardClick = () => {
    if (selectionMode && onSelectToggle) {
      onSelectToggle(course);
    } else {
      onClick(course);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectToggle?.(course);
  };
  
  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "group p-5 rounded-xl border bg-card cursor-pointer relative",
        "hover:shadow-lg hover:border-primary/30 transition-all duration-200",
        "flex flex-col h-full",
        selectionMode && isSelected && "ring-2 ring-primary border-primary"
      )}
    >
      {/* Selection checkbox */}
      {selectionMode && (
        <div 
          className="absolute top-3 left-3 z-10"
          onClick={handleCheckboxClick}
        >
          <Checkbox 
            checked={isSelected} 
            className="h-5 w-5 border-2"
          />
        </div>
      )}

      {/* Header with icon */}
      <div className={cn("flex items-start justify-between mb-4", selectionMode && "ml-6")}>
        <div className={cn(
          "p-2.5 rounded-lg border",
          iconColorClass
        )}>
          {getContentAreaIcon(course.contentArea)}
        </div>
        <div className="flex items-center gap-2">
          <Badge 
            variant={course.status === 'active' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {course.status === 'active' ? 'Active' : course.status}
          </Badge>
        </div>
      </div>
      
      {/* Course name */}
      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
        {course.name}
      </h3>
      
      {/* Metadata */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span>{course.contentArea}</span>
        <span className="text-muted-foreground/40">•</span>
        <span>{course.schoolLevel}</span>
      </div>

      {/* Canvas publish info */}
      {course.canvasPublishedAt && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-3 w-fit">
          <Check className="w-3 h-3" />
          <span>Published to Canvas {course.canvasPublishedAt}</span>
        </div>
      )}
      
      {/* Footer stats */}
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          <span>{course.itemCount} items</span>
          <span className="mx-2">•</span>
          <span>Updated {course.lastUpdated}</span>
        </div>
        {onPublish && !selectionMode && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handlePublishClick}
          >
            <Upload className="w-3 h-3" />
            Publish
          </Button>
        )}
      </div>
    </div>
  );
}