import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Settings, 
  Plus, 
  Upload, 
  CheckCircle2,
  Loader2,
  ChevronRight,
  CalendarIcon,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContentItem } from '@/types/assessment';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ItemPublishModalProps {
  open: boolean;
  onClose: () => void;
  item: ContentItem | null;
}

export function ItemPublishModal({ open, onClose, item }: ItemPublishModalProps) {
  const [selectedLMS, setSelectedLMS] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings state
  const [accountName, setAccountName] = useState('');
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
    setTimeout(() => {
      setIsPublishing(false);
      setShowSettings(false);
      const scheduleInfo = enableSchedule && scheduleDate 
        ? ` scheduled for ${format(scheduleDate, 'MMM d, yyyy')} at ${scheduleTime}`
        : '';
      toast.success(`Published "${item?.name}" to Canvas${scheduleInfo}`, {
        description: 'Content has been successfully published',
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

  const handleClose = () => {
    setSelectedLMS('');
    setShowSettings(false);
    setAccountName('');
    setEnableSchedule(false);
    setScheduleDate(undefined);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold">Publish to LMS</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            {item.name}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          {!showSettings && (
            <div className="p-6">
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

          {showSettings && (
            <div className="p-6 space-y-6">
              {/* Account Details */}
              <div className="bg-secondary/30 rounded-lg p-6">
                <div className="grid grid-cols-[160px_1fr] gap-6">
                  <h3 className="text-sm font-semibold text-foreground">Account Details</h3>
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
                  </div>
                </div>
              </div>

              {/* Schedule Publish */}
              <div className="bg-secondary/30 rounded-lg p-6">
                <div className="grid grid-cols-[160px_1fr] gap-6">
                  <h3 className="text-sm font-semibold text-foreground">Schedule Publish</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Schedule for later</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Set a specific date and time to publish this content
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

              {/* Advanced Settings */}
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4 hover:text-primary transition-colors group w-full">
                  <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                  Advanced Settings
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {/* Package Settings */}
                  <div className="bg-secondary/30 rounded-lg p-6 mb-4">
                    <div className="grid grid-cols-[160px_1fr] gap-6">
                      <h3 className="text-sm font-semibold text-foreground">Package Settings</h3>
                      <div className="space-y-4">
                        <RadioGroup value={packageType} onValueChange={setPackageType}>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="non-lti" id="item-non-lti" className="mt-1" />
                              <div>
                                <Label htmlFor="item-non-lti" className="font-medium cursor-pointer">Non-LTI Package</Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Content pages as HTML pages (non editable on canvas).<br />
                                  Assessment, Assignment and Forum - editable using Canvas native editor.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <RadioGroupItem value="lti" id="item-lti" className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor="item-lti" className="font-medium cursor-pointer">LTI Package</Label>
                                
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
                                          <RadioGroupItem value="1.1" id="item-lti-1.1" />
                                          <Label htmlFor="item-lti-1.1" className="text-xs cursor-pointer">LTI 1.1</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <RadioGroupItem value="1.3" id="item-lti-1.3" />
                                          <Label htmlFor="item-lti-1.3" className="text-xs cursor-pointer">LTI 1.3</Label>
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

                  {/* Overwrite Settings */}
                  <div className="bg-secondary/30 rounded-lg p-6">
                    <div className="grid grid-cols-[160px_1fr] gap-6">
                      <h3 className="text-sm font-semibold text-foreground">Overwrite Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">Overwrite Grades</Label>
                            <p className="text-xs text-muted-foreground">Replace existing grade settings in Canvas</p>
                          </div>
                          <Switch
                            checked={overwriteGrades}
                            onCheckedChange={setOverwriteGrades}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">Overwrite Rubrics</Label>
                            <p className="text-xs text-muted-foreground">Replace existing rubrics in Canvas</p>
                          </div>
                          <Switch
                            checked={overwriteRubrics}
                            onCheckedChange={setOverwriteRubrics}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">Open External Links in New Tab</Label>
                            <p className="text-xs text-muted-foreground">External links will open in a new browser tab</p>
                          </div>
                          <Switch
                            checked={openExternalInNewTab}
                            onCheckedChange={setOpenExternalInNewTab}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleClose}>
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
                        {enableSchedule && scheduleDate ? 'Schedule Publish' : 'Publish Now'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
