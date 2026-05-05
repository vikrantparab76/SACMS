import { X, Clock, HelpCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Assessment } from '@/types/assessment';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PreviewModalProps {
  assessment: Assessment | null;
  open: boolean;
  onClose: () => void;
  onAddToCourse: (assessment: Assessment) => void;
}

function QuestionPlaceholder({ number }: { number: number }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-secondary/30">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
          {number}
        </div>
        <div className="flex-1">
          <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-border"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-border"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-border"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-border"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewModal({ assessment, open, onClose, onAddToCourse }: PreviewModalProps) {
  if (!assessment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {assessment.title}
            </DialogTitle>
          </div>
          
          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              {assessment.questionCount} questions
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Estimated time: {assessment.estimatedTime} minutes
            </span>
            <span className="text-xs px-2 py-0.5 bg-secondary rounded">
              {assessment.taskType}
            </span>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <QuestionPlaceholder number={1} />
          <QuestionPlaceholder number={2} />
          <QuestionPlaceholder number={3} />
          
          <div className="text-center py-4 text-sm text-muted-foreground">
            + {assessment.questionCount - 3} more questions
          </div>
        </div>
        
        <div className="flex-shrink-0 flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onAddToCourse(assessment)}>
            <Plus className="w-4 h-4 mr-1" />
            Add to Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
