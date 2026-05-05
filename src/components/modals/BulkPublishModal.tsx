import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Settings, 
  Plus, 
  Upload, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
  Check,
  CalendarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourseData } from '@/components/browse/CourseCard';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface BulkPublishModalProps {
  open: boolean;
  onClose: () => void;
  selectedCourses: CourseData[];
  allCourses: CourseData[];
}

interface PublishHistory {
  id: string;
  date: string;
  user: string;
  userInitials: string;
  status: 'success' | 'processing' | 'failed';
  account: string;
  subaccount: string;
  settings: string;
  courseName: string;
  canvasCourseId: string;
  timeTaken?: string;
}

const mockBulkPublishHistory: PublishHistory[] = [
  {
    id: '1',
    date: 'January 30, 2026 14:22',
    user: 'Sarah Chen',
    userInitials: 'SC',
    status: 'success',
    account: 'Canvas Production',
    subaccount: 'Elementary > Bed-Stuy School',
    settings: 'LTI 1.3 • Content Pages as LTI links',
    courseName: 'AP Calculus AB',
    canvasCourseId: 'canvas-12345',
    timeTaken: '3m 12s',
  },
  {
    id: '2',
    date: 'January 28, 2026 09:45',
    user: 'John Smith',
    userInitials: 'JS',
    status: 'success',
    account: 'Canvas Production',
    subaccount: 'High School > Liberal Arts Brooklyn',
    settings: 'LTI 1.1 • Non-LTI Package',
    courseName: 'English Literature 10',
    canvasCourseId: 'canvas-23456',
    timeTaken: '2m 45s',
  },
  {
    id: '3',
    date: 'January 25, 2026 16:30',
    user: 'Mike Johnson',
    userInitials: 'MJ',
    status: 'failed',
    account: 'Canvas Staging',
    subaccount: 'Mid School > Astor Place',
    settings: 'LTI 1.3 • Assessments as Editable',
    courseName: 'US History Grade 8',
    canvasCourseId: 'canvas-34567',
    timeTaken: '1m 23s',
  },
  {
    id: '4',
    date: 'January 22, 2026 11:00',
    user: 'Emily Davis',
    userInitials: 'ED',
    status: 'processing',
    account: 'Canvas Production',
    subaccount: 'Elementary > Bronx School',
    settings: 'LTI 1.1 • Content Pages as LTI links',
    courseName: 'Science Grade 5',
    canvasCourseId: 'canvas-45678',
  },
];

export function BulkPublishModal({ open, onClose, selectedCourses, allCourses }: BulkPublishModalProps) {
  const [activeTab, setActiveTab] = useState('publish');
  const [selectedLMS, setSelectedLMS] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings state
  const [accountName, setAccountName] = useState('');
  const [coursePrefix, setCoursePrefix] = useState('');
  const [packageType, setPackageType] = useState('lti');
  const [ltiVersion, setLtiVersion] = useState('1.1');
  const [overwriteGrades, setOverwriteGrades] = useState(false);
  const [overwriteRubrics, setOverwriteRubrics] = useState(false);
  const [openExternalInNewTab, setOpenExternalInNewTab] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Schedule state
  const [enableSchedule, setEnableSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [scheduleTime, setScheduleTime] = useState('09:00');

  // Get courses that have been published to Canvas (for history view)
  const publishedCourses = allCourses.filter(c => c.canvasPublishedAt);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setShowSettings(false);
      toast.success(`Published ${selectedCourses.length} courses to Canvas`, {
        description: 'All courses have been successfully published',
      });
      onClose();
    }, 2000);
  };

  const handleLMSSelect = (value: string) => {
    setSelectedLMS(value);
    if (value && value !== 'add' && value !== 'config') {
      setShowSettings(true);
    }
  };

  const getStatusBadge = (status: PublishHistory['status']) => {
    switch (status) {
      case 'success':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Published
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Processing...
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <AlertCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">Bulk Publish to LMS</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {selectedCourses.length} courses selected for publishing
              </DialogDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="grid w-[240px] grid-cols-2">
                <TabsTrigger value="publish" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Publish
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2">
                  <Clock className="w-4 h-4" />
                  History
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          {activeTab === 'publish' && !showSettings && (
            <div className="p-6">
              {/* Selected courses summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Selected Courses</h3>
                <div className="max-h-40 overflow-y-auto space-y-2 border border-border rounded-lg p-3">
                  {selectedCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <p className="text-sm font-medium">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.contentArea} • {course.schoolLevel}</p>
                      </div>
                      {course.canvasPublishedAt && (
                        <span className="text-xs text-muted-foreground">
                          Last published: {course.canvasPublishedAt}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="max-w-md mx-auto py-4">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Select LMS</Label>
                  <Select value={selectedLMS} onValueChange={handleLMSSelect}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select LMS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canvas-prod">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Canvas Production
                        </div>
                      </SelectItem>
                      <SelectItem value="canvas-staging">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Canvas Staging
                        </div>
                      </SelectItem>
                      <Separator className="my-2" />
                      <SelectItem value="add">
                        <div className="flex items-center gap-2 text-primary">
                          <Plus className="w-4 h-4" />
                          Add LMS
                        </div>
                      </SelectItem>
                      <SelectItem value="config">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Settings className="w-4 h-4" />
                          LMS Configuration
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'publish' && showSettings && (
            <div className="p-6 space-y-6">
              {/* Account & Course Details */}
              <div className="bg-secondary/30 rounded-lg p-6">
                <div className="grid grid-cols-[200px_1fr] gap-6">
                  <h3 className="text-sm font-semibold text-foreground">Account & Course Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Subaccount Name</Label>
                      <Select value={accountName} onValueChange={setAccountName}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subaccount" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {/* Elementary */}
                          <div className="px-2 py-1.5">
                            <div className="flex items-center gap-2 px-2 py-1.5 bg-green-100 text-green-800 rounded-md font-medium text-sm">
                              Elementary
                            </div>
                          </div>
                          <SelectItem value="bed-stuy" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> Bed-Stuy School
                            </span>
                          </SelectItem>
                          <SelectItem value="bronx" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> Bronx School
                            </span>
                          </SelectItem>
                          
                          {/* Mid School */}
                          <div className="px-2 py-1.5 mt-2">
                            <div className="flex items-center gap-2 px-2 py-1.5 bg-green-100 text-green-800 rounded-md font-medium text-sm">
                              Mid School
                            </div>
                          </div>
                          <SelectItem value="astor-place" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> Astor Place Middle School
                            </span>
                          </SelectItem>
                          <SelectItem value="ditmas-park" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> Ditmas Park Middle School
                            </span>
                          </SelectItem>
                          
                          {/* High School */}
                          <div className="px-2 py-1.5 mt-2">
                            <div className="flex items-center gap-2 px-2 py-1.5 bg-green-100 text-green-800 rounded-md font-medium text-sm">
                              High School
                            </div>
                          </div>
                          <SelectItem value="liberal-arts-brooklyn" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> Highschool of the Liberal Arts - Brooklyn
                            </span>
                          </SelectItem>
                          <SelectItem value="liberal-arts-harlem" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> Highschool of the Liberal Arts - Harlem
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Course Name Prefix (Optional)</Label>
                      <Input 
                        value={coursePrefix} 
                        onChange={(e) => setCoursePrefix(e.target.value)}
                        placeholder="e.g., Spring 2026 - "
                      />
                      <p className="text-xs text-muted-foreground">
                        This prefix will be added to all course names in Canvas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Publish */}
              <div className="bg-secondary/30 rounded-lg p-6">
                <div className="grid grid-cols-[200px_1fr] gap-6">
                  <h3 className="text-sm font-semibold text-foreground">Schedule Publish</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Schedule for later</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Set a specific date and time to publish these courses
                        </p>
                      </div>
                      <Switch
                        checked={enableSchedule}
                        onCheckedChange={setEnableSchedule}
                      />
                    </div>
                    
                    {enableSchedule && (
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !scheduleDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {scheduleDate ? format(scheduleDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={scheduleDate}
                                onSelect={setScheduleDate}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Select value={scheduleTime} onValueChange={setScheduleTime}>
                            <SelectTrigger>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select time" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="06:00">6:00 AM</SelectItem>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Advance Settings */}
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4 hover:text-primary transition-colors group w-full">
                  <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                  Advance Settings
                </CollapsibleTrigger>
                <CollapsibleContent>
                
                {/* Package Settings */}
                <div className="bg-secondary/30 rounded-lg p-6 mb-4">
                  <div className="grid grid-cols-[200px_1fr] gap-6">
                    <h3 className="text-sm font-semibold text-foreground">Package Settings</h3>
                    <div className="space-y-4">
                      <RadioGroup value={packageType} onValueChange={setPackageType}>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <RadioGroupItem value="non-lti" id="bulk-non-lti" className="mt-1" />
                            <div>
                              <Label htmlFor="bulk-non-lti" className="font-medium cursor-pointer">Non-LTI Package</Label>
                              <p className="text-xs text-muted-foreground mt-1">
                                Content pages as HTML pages (non editable on canvas).<br />
                                Assessment, Assignment and Forum - editable using Canvas native editor.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <RadioGroupItem value="lti" id="bulk-lti" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="bulk-lti" className="font-medium cursor-pointer">LTI Package</Label>
                              
                              {packageType === 'lti' && (
                                <div className="mt-3 pl-4 border-l-2 border-primary/20 space-y-3">
                                  <div>
                                    <p className="text-xs font-medium text-foreground">Content Pages</p>
                                    <p className="text-xs text-muted-foreground">As LTI links (non editable on Canvas)</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-foreground">Assessment/Assignment/Forum</p>
                                    <p className="text-xs text-muted-foreground">As editable (using the Canvas native editor)</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-foreground mb-2">Deep Publish Type</p>
                                    <RadioGroup value={ltiVersion} onValueChange={setLtiVersion} className="flex gap-4">
                                      <div className="flex items-center gap-2">
                                        <RadioGroupItem value="1.1" id="bulk-lti-1.1" />
                                        <Label htmlFor="bulk-lti-1.1" className="text-xs cursor-pointer">LTI 1.1</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <RadioGroupItem value="1.3" id="bulk-lti-1.3" />
                                        <Label htmlFor="bulk-lti-1.3" className="text-xs cursor-pointer">LTI 1.3</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Grade Settings */}
                <div className="bg-secondary/30 rounded-lg p-6 mb-4">
                  <div className="grid grid-cols-[200px_1fr] gap-6">
                    <h3 className="text-sm font-semibold text-foreground">Grade Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">Overwrite Grade settings on Canvas</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Any grade settings on Canvas will be overwritten. This applies to all graded objects.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{overwriteGrades ? 'On' : 'Off'}</span>
                          <Switch checked={overwriteGrades} onCheckedChange={setOverwriteGrades} />
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">Overwrite Rubric associations on Canvas</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Any rubric associations on Canvas will be overwritten by associated rubrics.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{overwriteRubrics ? 'On' : 'Off'}</span>
                          <Switch checked={overwriteRubrics} onCheckedChange={setOverwriteRubrics} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More Configurations */}
                <div className="bg-secondary/30 rounded-lg p-6">
                  <div className="grid grid-cols-[200px_1fr] gap-6">
                    <h3 className="text-sm font-semibold text-foreground">More Configurations</h3>
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">Open all external tools on a new tab</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            All external tools and links across the courses will open in a separate tab.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{openExternalInNewTab ? 'On' : 'Off'}</span>
                          <Switch checked={openExternalInNewTab} onCheckedChange={setOpenExternalInNewTab} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  Back
                </Button>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handlePublish} disabled={isPublishing} className="gap-2">
                    {isPublishing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Publishing {selectedCourses.length} courses...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        {enableSchedule && scheduleDate 
                          ? `Schedule ${selectedCourses.length} Courses` 
                          : `Publish ${selectedCourses.length} Courses`}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">All Course Publish History</h3>
                <p className="text-sm text-muted-foreground">
                  View all courses that have been published to Canvas with their publish details
                </p>
              </div>
              
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Date & By</TableHead>
                      <TableHead className="font-semibold">Course Name</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Canvas Account</TableHead>
                      <TableHead className="font-semibold">Subaccount</TableHead>
                      <TableHead className="font-semibold">Canvas Course ID</TableHead>
                      <TableHead className="font-semibold">Settings</TableHead>
                      <TableHead className="font-semibold">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBulkPublishHistory.map((item) => (
                      <TableRow 
                        key={item.id}
                        className={cn(
                          item.status === 'processing' && "bg-amber-50/50"
                        )}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                              {item.userInitials}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.user}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.courseName}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-sm">{item.account}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.subaccount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{item.canvasCourseId}</code>
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{item.settings}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.timeTaken || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <Select defaultValue="25">
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>Per Page</span>
                </div>
                <span>1 of 1</span>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
