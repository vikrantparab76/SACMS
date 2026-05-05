import { Eye, Plus, FolderOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Assessment } from '@/types/assessment';

interface AssessmentCardProps {
  assessment: Assessment;
  onPreview: (assessment: Assessment) => void;
  onAddToCourse: (assessment: Assessment) => void;
  onLocateInFolder: (assessment: Assessment) => void;
  onViewMetadata: (assessment: Assessment) => void;
}

export function AssessmentCard({
  assessment,
  onPreview,
  onAddToCourse,
  onLocateInFolder,
  onViewMetadata,
}: AssessmentCardProps) {
  return (
    <div className="result-card animate-fade-in">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {assessment.title}
          </h3>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
            <div className="flex gap-2">
              <span className="text-muted-foreground">Subject:</span>
              <span className="text-foreground">{assessment.subject}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Task Type:</span>
              <span className="text-foreground">{assessment.taskType}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Grade Band:</span>
              <span className="text-foreground">{assessment.gradeBand}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Questions:</span>
              <span className="text-foreground">{assessment.questionCount}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Course:</span>
              <span className="text-foreground">{assessment.course}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Standards:</span>
              <span className="text-foreground">{assessment.standards}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Learning Sequence:</span>
              <span className="text-foreground">{assessment.learningSequenceCode}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="text-foreground">{assessment.lastUpdated}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onPreview(assessment)}
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onAddToCourse(assessment)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add to Course
          </Button>
          <Button 
            variant="action" 
            size="sm"
            onClick={() => onLocateInFolder(assessment)}
          >
            <FolderOpen className="w-4 h-4 mr-1" />
            Locate in Folder
          </Button>
          <Button 
            variant="action" 
            size="sm"
            onClick={() => onViewMetadata(assessment)}
          >
            <FileText className="w-4 h-4 mr-1" />
            View Metadata
          </Button>
        </div>
      </div>
    </div>
  );
}
