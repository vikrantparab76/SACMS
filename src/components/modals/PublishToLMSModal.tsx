import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  ChevronDown,
  CalendarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface PublishToLMSModalProps {
  open: boolean;
  onClose: () => void;
  courseName: string;
}

interface LMSConnection {
  id: string;
  name: string;
  type: 'canvas' | 'blackboard' | 'moodle';
  connected: boolean;
}

interface PublishHistory {
  id: string;
  date: string;
  user: string;
  userInitials: string;
  status: 'success' | 'processing' | 'failed';
  account: string;
  settings: string;
  targetCourse: string;
  timeTaken?: string;
}

const mockLMSConnections: LMSConnection[] = [
  { id: '1', name: 'Canvas Production', type: 'canvas', connected: true },
  { id: '2', name: 'Canvas Staging', type: 'canvas', connected: true },
  { id: '3', name: 'Blackboard Learn', type: 'blackboard', connected: false },
];

const mockPublishHistory: PublishHistory[] = [
  {
    id: '1',
    date: 'January 15, 2026 00:58',
    user: 'Vikrant Parab',
    userInitials: 'VP',
    status: 'processing',
    account: 'Frost Playground',
    settings: 'LTI 1.1 • Content Pages as LTI links • Assessments as Editable',
    targetCourse: 'Vik Test 2',
    timeTaken: undefined,
  },
  {
    id: '2',
    date: 'January 14, 2026 15:30',
    user: 'John Smith',
    userInitials: 'JS',
    status: 'success',
    account: 'Frost Playground',
    settings: 'LTI 1.3 • Non-LTI Package',
    targetCourse: 'AP Statistics - Spring 2026',
    timeTaken: '2m 34s',
  },
];

export function PublishToLMSModal({ open, onClose, courseName }: PublishToLMSModalProps) {
  const [activeTab, setActiveTab] = useState('publish');
  const [selectedLMS, setSelectedLMS] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings state
  const [accountName, setAccountName] = useState('LearningMate');
  const [targetCourseName, setTargetCourseName] = useState(courseName);
  const [courseDescription, setCourseDescription] = useState('');
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

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate publishing
    setTimeout(() => {
      setIsPublishing(false);
      setShowSettings(false);
      setActiveTab('history');
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
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">Publish to LMS</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{courseName}</p>
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
              <div className="max-w-md mx-auto py-8">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Select LMS</Label>
                  <Select value={selectedLMS} onValueChange={handleLMSSelect}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select LMS" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockLMSConnections.filter(c => c.connected).map(lms => (
                        <SelectItem key={lms.id} value={lms.id}>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            {lms.name}
                          </div>
                        </SelectItem>
                      ))}
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
                          <SelectValue />
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
                          <SelectItem value="elem-xyz" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> School XYZ
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
                          <SelectItem value="mid-xyz" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> School XYZ
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
                          <SelectItem value="high-xyz" className="pl-8">
                            <span className="flex items-center gap-2">
                              <span className="text-primary">→</span> School XYZ
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>New Course on Canvas</Label>
                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                          Or Select Existing Course
                        </Button>
                      </div>
                      <Input 
                        value={targetCourseName} 
                        onChange={(e) => setTargetCourseName(e.target.value)}
                        placeholder="Course name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Course Description (Optional)</Label>
                      <Textarea 
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Course Description"
                        rows={3}
                      />
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
                          Set a specific date and time to publish this course
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
                            <RadioGroupItem value="non-lti" id="non-lti" className="mt-1" />
                            <div>
                              <Label htmlFor="non-lti" className="font-medium cursor-pointer">Non-LTI Package</Label>
                              <p className="text-xs text-muted-foreground mt-1">
                                Content pages as HTML pages (non editable on canvas).<br />
                                Assessment (including description), Assignment and Forum - editable using Canvas native editor.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <RadioGroupItem value="lti" id="lti" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="lti" className="font-medium cursor-pointer">LTI Package</Label>
                              
                              {packageType === 'lti' && (
                                <div className="mt-3 pl-4 border-l-2 border-primary/20 space-y-3">
                                  <div>
                                    <p className="text-xs font-medium text-foreground">Content Pages</p>
                                    <p className="text-xs text-muted-foreground">As LTI links (non editable on Canvas)</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-foreground">Assessment (including description)/Assignment/Forum</p>
                                    <p className="text-xs text-muted-foreground">As editable (using the Canvas native editor)</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-foreground mb-2">Deep Publish Type</p>
                                    <RadioGroup value={ltiVersion} onValueChange={setLtiVersion} className="flex gap-4">
                                      <div className="flex items-center gap-2">
                                        <RadioGroupItem value="1.1" id="lti-1.1" />
                                        <Label htmlFor="lti-1.1" className="text-xs cursor-pointer">LTI 1.1</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <RadioGroupItem value="1.3" id="lti-1.3" />
                                        <Label htmlFor="lti-1.3" className="text-xs cursor-pointer">LTI 1.3</Label>
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
                            Any grade settings that are already done on Canvas will be overwritten by settings from Frost. This applies to all graded objects.
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
                            Any rubric associations done to manually graded objects on Canvas will be overwritten by associated rubrics from Frost.
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
                            All external tools and links across the course will open in a separate tab.
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
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        {enableSchedule && scheduleDate ? 'Schedule Publish' : 'Publish to LMS'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-6">
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/50 border-b border-border">
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date & By</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Account & Org</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Publish Settings</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Canvas Course</th>
                      <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Time Taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPublishHistory.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className={cn(
                          "border-b border-border last:border-0",
                          item.status === 'processing' && "bg-amber-50/50"
                        )}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                              {item.userInitials}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.user}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-foreground">{item.account}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-muted-foreground">{item.settings}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-foreground">{item.targetCourse}</span>
                            {item.status === 'success' && (
                              <ExternalLink className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-muted-foreground">{item.timeTaken || '-'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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