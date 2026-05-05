import { Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Assessment } from '@/types/assessment';

interface TaskTableProps {
  assessments: Assessment[];
  onPreview: (assessment: Assessment) => void;
  onAddToCourse: (assessment: Assessment) => void;
}

export function TaskTable({ assessments, onPreview, onAddToCourse }: TaskTableProps) {
  if (assessments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Select a folder to view tasks
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="font-semibold">Task Name</TableHead>
            <TableHead className="font-semibold">Assessment ID</TableHead>
            <TableHead className="font-semibold text-center">Questions</TableHead>
            <TableHead className="font-semibold text-center">Usage</TableHead>
            <TableHead className="font-semibold">Last Modified</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments.map((assessment) => (
            <TableRow key={assessment.id} className="hover:bg-secondary/30">
              <TableCell className="font-medium">{assessment.title}</TableCell>
              <TableCell className="text-muted-foreground font-mono text-xs">
                {assessment.learnosityId}
              </TableCell>
              <TableCell className="text-center">{assessment.questionCount}</TableCell>
              <TableCell className="text-center">{assessment.usageCount}</TableCell>
              <TableCell className="text-muted-foreground">{assessment.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onPreview(assessment)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onAddToCourse(assessment)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
