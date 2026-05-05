import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Assessment } from '@/types/assessment';
import { courses, placementOptions } from '@/data/mockData';
import { toast } from 'sonner';

interface AddToCourseModalProps {
  assessment: Assessment | null;
  open: boolean;
  onClose: () => void;
}

export function AddToCourseModal({ assessment, open, onClose }: AddToCourseModalProps) {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState('');
  const [uniqueInstance, setUniqueInstance] = useState(true);
  const [inheritDates, setInheritDates] = useState(true);
  const [syncGrades, setSyncGrades] = useState(true);

  const handleSubmit = () => {
    if (!selectedCourse || !selectedPlacement) {
      toast.error('Please select a course and placement');
      return;
    }
    
    toast.success(`"${assessment?.title}" added to course successfully`);
    onClose();
    setSelectedCourse('');
    setSelectedPlacement('');
  };

  if (!assessment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Assessment to Course
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Configure how "{assessment.title}" will be added to your course.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="course" className="text-sm font-medium">
              Target Course
            </Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger id="course" className="w-full bg-background">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="placement" className="text-sm font-medium">
              Placement
            </Label>
            <Select value={selectedPlacement} onValueChange={setSelectedPlacement}>
              <SelectTrigger id="placement" className="w-full bg-background">
                <SelectValue placeholder="Select placement" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {placementOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3 pt-2">
            <Label className="text-sm font-medium">Configuration</Label>
            
            <div className="flex items-start gap-3">
              <Checkbox
                id="unique-instance"
                checked={uniqueInstance}
                onCheckedChange={(checked) => setUniqueInstance(checked as boolean)}
              />
              <Label 
                htmlFor="unique-instance" 
                className="text-sm text-foreground leading-tight cursor-pointer"
              >
                Create unique assessment instance per section
              </Label>
            </div>
            
            <div className="flex items-start gap-3">
              <Checkbox
                id="inherit-dates"
                checked={inheritDates}
                onCheckedChange={(checked) => setInheritDates(checked as boolean)}
              />
              <Label 
                htmlFor="inherit-dates" 
                className="text-sm text-foreground leading-tight cursor-pointer"
              >
                Inherit start/end dates from pacing guide
              </Label>
            </div>
            
            <div className="flex items-start gap-3">
              <Checkbox
                id="sync-grades"
                checked={syncGrades}
                onCheckedChange={(checked) => setSyncGrades(checked as boolean)}
              />
              <Label 
                htmlFor="sync-grades" 
                className="text-sm text-foreground leading-tight cursor-pointer"
              >
                Sync grades automatically to Canvas gradebook
              </Label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Check className="w-4 h-4 mr-1" />
            Add Assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
