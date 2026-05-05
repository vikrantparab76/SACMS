import { Check, Upload, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CourseData } from './CourseCard';

interface CourseListViewProps {
  courses: CourseData[];
  onCourseClick: (course: CourseData) => void;
  onPublish?: (course: CourseData) => void;
  selectionMode?: boolean;
  selectedCourses?: Set<string>;
  onSelectToggle?: (course: CourseData) => void;
}

export function CourseListView({ 
  courses, 
  onCourseClick, 
  onPublish,
  selectionMode,
  selectedCourses = new Set(),
  onSelectToggle
}: CourseListViewProps) {
  
  const handleRowClick = (course: CourseData) => {
    if (selectionMode && onSelectToggle) {
      onSelectToggle(course);
    } else {
      onCourseClick(course);
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {selectionMode && (
              <TableHead className="w-12"></TableHead>
            )}
            <TableHead className="font-semibold">Course Name</TableHead>
            <TableHead className="font-semibold">Content Area</TableHead>
            <TableHead className="font-semibold">School Level</TableHead>
            <TableHead className="font-semibold">Items</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Canvas Status</TableHead>
            <TableHead className="font-semibold">Canvas Course ID</TableHead>
            <TableHead className="font-semibold">Last Updated</TableHead>
            {!selectionMode && <TableHead className="w-24"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map(course => (
            <TableRow 
              key={course.id}
              className={cn(
                "cursor-pointer",
                selectionMode && selectedCourses.has(course.id) && "bg-primary/5"
              )}
              onClick={() => handleRowClick(course)}
            >
              {selectionMode && (
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedCourses.has(course.id)}
                    onCheckedChange={() => onSelectToggle?.(course)}
                    className="h-5 w-5"
                  />
                </TableCell>
              )}
              <TableCell className="font-medium">{course.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {course.contentArea}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{course.schoolLevel}</TableCell>
              <TableCell className="text-muted-foreground">{course.itemCount}</TableCell>
              <TableCell>
                <Badge 
                  variant={course.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {course.status === 'active' ? 'Active' : course.status}
                </Badge>
              </TableCell>
              <TableCell>
                {course.canvasPublishedAt ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit">
                    <Check className="w-3 h-3" />
                    <span>Published {course.canvasPublishedAt}</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">Not published</span>
                )}
              </TableCell>
              <TableCell>
                {course.canvasCourseId ? (
                  <div className="flex items-center gap-1 text-xs">
                    <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">
                      {course.canvasCourseId}
                    </code>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">{course.lastUpdated}</TableCell>
              {!selectionMode && (
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs gap-1.5"
                    onClick={() => onPublish?.(course)}
                  >
                    <Upload className="w-3 h-3" />
                    Publish
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
