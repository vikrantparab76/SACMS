import { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Tag, 
  FileText, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  Filter,
  LayoutGrid,
  List,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Trash2,
  CheckCircle2,
  Circle,
  AlertCircle,
  Layers,
  BookOpen,
  Settings,
  HelpCircle,
  Check,
  Sparkles,
  X,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { GeneratedQuestion, AssessmentConfig } from '@/types/learnosity';
import { LearnosityAIChatbot } from '@/components/chat/LearnosityAIChatbot';


interface LearnosityItem {
  id: string;
  title: string;
  itemCount: number;
  lastUpdated: string;
  courseName: string;
  learningSequence: string;
  subject: string;
  gradeLevel?: string;
  tags: string[];
  status: 'published' | 'draft' | 'review';
  aiGenerated?: boolean;
}

interface LearnosityModalProps {
  open: boolean;
  onClose: () => void;
  courseName: string;
  contentArea: string;
  onAddItem?: (item: LearnosityItem) => void;
  generatedQuestions?: GeneratedQuestion[];
  assessmentConfig?: AssessmentConfig;
}

// Mock data generator based on course
function generateCourseItems(courseName: string, contentArea: string): LearnosityItem[] {
  const baseItems: LearnosityItem[] = [];
  
  const coursePrefix = contentArea === 'Math' ? 'Math' : contentArea === 'English' ? 'English' : contentArea;
  const gradeMatch = courseName.match(/Grade (\d+|K)/);
  const gradeLevel = gradeMatch ? (gradeMatch[1] === 'K' ? 'Kindergarten' : `Grade ${gradeMatch[1]}`) : 'High School';
  
  const sequences = [
    '1.1 Exploring One-Variable Data',
    '1.2 Exploring Two-Variable Data', 
    '2.1 Collecting Data',
    '2.2 Probability Distributions',
    '3.1 Statistical Inference'
  ];
  
  const taskNames = ['Task 1', 'Task 2', 'Task 3', 'Tasks 2-4', 'Tasks 5-8'];
  const statuses: Array<'published' | 'draft' | 'review'> = ['published', 'draft', 'review'];
  
  sequences.forEach((seq) => {
    taskNames.slice(0, Math.floor(Math.random() * 3) + 2).forEach((task) => {
      baseItems.push({
        id: `${courseName.replace(/\s+/g, '_')}_LS_${seq.split(' ')[0]}_${task.replace(' ', '')}`,
        title: `${coursePrefix}_HS_${courseName.replace(/[:\s]+/g, '_')}_LS_${seq.replace(/\s+/g, '_')}_${task}`,
        itemCount: Math.floor(Math.random() * 5) + 1,
        lastUpdated: `${Math.floor(Math.random() * 24) + 1} hours ago`,
        courseName: courseName,
        learningSequence: seq,
        subject: contentArea,
        gradeLevel: gradeLevel,
        tags: [contentArea, gradeLevel, seq.split(' ')[0], task].filter(Boolean),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        aiGenerated: Math.random() > 0.6, // ~40% chance of being AI generated
      });
    });
  });
  
  return baseItems;
}

// Question type categories with icons
const questionCategories = [
  { id: 'multiple-choice', name: 'Multiple Choice', icon: CheckCircle2, color: 'text-blue-500' },
  { id: 'fill-blanks', name: 'Fill in the Blanks', icon: FileText, color: 'text-purple-500' },
  { id: 'classify', name: 'Classify & Match', icon: Layers, color: 'text-green-500' },
  { id: 'written', name: 'Written Response', icon: Pencil, color: 'text-orange-500' },
  { id: 'math', name: 'Math', icon: Circle, color: 'text-red-500' },
  { id: 'graphing', name: 'Graphing', icon: LayoutGrid, color: 'text-teal-500' },
  { id: 'other', name: 'Other Types', icon: MoreHorizontal, color: 'text-gray-500' },
];

const questionTypes = {
  'multiple-choice': [
    { id: 'mc-standard', name: 'Multiple choice – standard', description: 'Single correct answer from options', icon: '○' },
    { id: 'mc-multiple', name: 'Multiple choice – multiple response', description: 'Select all that apply', icon: '☑' },
    { id: 'true-false', name: 'True or false', description: 'Binary true/false choice', icon: '◐' },
    { id: 'mc-block', name: 'Multiple choice – block layout', description: 'Large clickable option blocks', icon: '▣' },
    { id: 'matrix-standard', name: 'Choice matrix – standard', description: 'Grid-based selections', icon: '▦' },
    { id: 'matrix-inline', name: 'Choice matrix – inline', description: 'Inline grid format', icon: '▤' },
  ],
  'fill-blanks': [
    { id: 'cloze-text', name: 'Cloze with text', description: 'Type answers in blanks', icon: '▢' },
    { id: 'cloze-dropdown', name: 'Cloze with dropdown', description: 'Select from dropdown menus', icon: '▼' },
    { id: 'cloze-drag', name: 'Cloze with drag & drop', description: 'Drag words to blanks', icon: '↔' },
  ],
  'math': [
    { id: 'math-formula', name: 'Math formula', description: 'Enter mathematical expressions', icon: 'ƒ' },
    { id: 'math-essay', name: 'Math essay', description: 'Show work with equations', icon: '∑' },
    { id: 'number-line', name: 'Number line', description: 'Interactive number line', icon: '—' },
    { id: 'graphing', name: 'Graph plotting', description: 'Plot points and functions', icon: '📈' },
  ],
  'classify': [
    { id: 'match-list', name: 'Match list', description: 'Match items between columns', icon: '⟷' },
    { id: 'order-list', name: 'Order list', description: 'Arrange items in order', icon: '↕' },
    { id: 'classify', name: 'Classification', description: 'Sort items into categories', icon: '▥' },
  ],
  'written': [
    { id: 'essay', name: 'Essay', description: 'Long-form written response', icon: '¶' },
    { id: 'short-text', name: 'Short text', description: 'Brief text answer', icon: 'T' },
    { id: 'audio', name: 'Audio response', description: 'Record spoken answer', icon: '🎤' },
  ],
  'graphing': [
    { id: 'graph-plot', name: 'Graph plotting', description: 'Plot on coordinate plane', icon: '📊' },
    { id: 'number-line-plot', name: 'Number line plot', description: 'Mark points on line', icon: '━' },
  ],
  'other': [
    { id: 'hotspot', name: 'Image hotspot', description: 'Click areas on image', icon: '🎯' },
    { id: 'highlight', name: 'Text highlight', description: 'Highlight text passages', icon: '🖍' },
    { id: 'drawing', name: 'Drawing', description: 'Freehand drawing response', icon: '✏️' },
  ],
};

function getStatusConfig(status: 'published' | 'draft' | 'review') {
  switch (status) {
    case 'published':
      return { label: 'Published', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
    case 'review':
      return { label: 'In Review', className: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' };
    case 'draft':
      return { label: 'Draft', className: 'bg-secondary text-muted-foreground border-border', dot: 'bg-muted-foreground' };
  }
}

export function LearnosityModal({ 
  open, 
  onClose, 
  courseName, 
  contentArea, 
  onAddItem,
  generatedQuestions,
  assessmentConfig 
}: LearnosityModalProps) {
  const [view, setView] = useState<'list' | 'create' | 'ai-generated'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('multiple-choice');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeTab, setActiveTab] = useState('items');
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [localGeneratedQuestions, setLocalGeneratedQuestions] = useState<GeneratedQuestion[] | undefined>(generatedQuestions);
  const [editingQuestion, setEditingQuestion] = useState<GeneratedQuestion | null>(null);
  const [editingField, setEditingField] = useState<{ questionId: string; fieldName: string; fieldLabel: string; currentValue: string } | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'review' | 'draft' | 'ai-generated'>('all');
  
  const items = useMemo(() => generateCourseItems(courseName, contentArea), [courseName, contentArea]);
  
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.courseName.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      
      if (statusFilter === 'all') return true;
      if (statusFilter === 'ai-generated') return item.aiGenerated === true;
      return item.status === statusFilter;
    });
  }, [items, searchQuery, statusFilter]);

  // Switch to AI-generated view when questions are provided externally
  useEffect(() => {
    if (generatedQuestions && generatedQuestions.length > 0) {
      setLocalGeneratedQuestions(generatedQuestions);
      setView('ai-generated');
      setSelectedQuestions(new Set(generatedQuestions.map(q => q.id)));
    }
  }, [generatedQuestions]);

  // Handle questions generated from the embedded chatbot
  const handleChatbotGenerateQuestions = useCallback((questions: GeneratedQuestion[]) => {
    setLocalGeneratedQuestions(questions);
    setView('ai-generated');
    setSelectedQuestions(new Set(questions.map(q => q.id)));
  }, []);

  // Handle question update from chatbot
  const handleUpdateQuestion = useCallback((questionId: string, updatedQuestion: GeneratedQuestion) => {
    setLocalGeneratedQuestions(prev => 
      prev?.map(q => q.id === questionId ? updatedQuestion : q)
    );
  }, []);

  // Handle field update from chatbot
  const handleFieldUpdate = useCallback((questionId: string, fieldPath: string, newValue: string) => {
    setLocalGeneratedQuestions(prev => 
      prev?.map(q => {
        if (q.id !== questionId) return q;
        
        // Handle nested field paths like "extras.instructorStimulus"
        const pathParts = fieldPath.split('.');
        if (pathParts.length === 2) {
          const [section, field] = pathParts;
          return {
            ...q,
            [section]: {
              ...(q as any)[section],
              [field]: newValue
            }
          };
        }
        return { ...q, [fieldPath]: newValue };
      })
    );
    setEditingField(null);
  }, []);

  const handleClose = () => {
    setView('list');
    setSearchQuery('');
    setSelectedQuestions(new Set());
    setEditingQuestion(null);
    setEditingField(null);
    onClose();
  };

  const toggleQuestionSelection = (id: string) => {
    setSelectedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handlePublishSelected = () => {
    // Simulate publishing
    setTimeout(() => {
      setView('list');
    }, 500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Clean White Header */}
      <div className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            className="gap-2 text-foreground hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to CMS
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-semibold text-sm text-foreground">Assessment Author</h1>
              <p className="text-xs text-muted-foreground">{courseName || 'Assessment Items'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-muted h-9">
              <TabsTrigger value="items" className="text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Items
              </TabsTrigger>
              <TabsTrigger value="activities" className="text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Activities
              </TabsTrigger>
              <TabsTrigger value="tags" className="text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Tags
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="h-6 w-px bg-border ml-2" />
          
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted h-9 w-9 p-0">
            <HelpCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted h-9 w-9 p-0">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {view === 'ai-generated' && localGeneratedQuestions ? (
        <>
          {/* AI Generated Questions Header */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold">AI-Generated Assessment Items</h2>
                    <Badge variant="secondary" className="text-xs">
                      {localGeneratedQuestions.length} items
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Topic: {assessmentConfig?.topic || 'One-Variable Data Analysis'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setView('list')}>
                  View All Items
                </Button>
                <Button 
                  size="sm"
                  onClick={handlePublishSelected}
                  disabled={selectedQuestions.size === 0}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Publish {selectedQuestions.size} Selected
                </Button>
              </div>
            </div>
          </div>

          {/* Selection Summary */}
          <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => {
                  if (selectedQuestions.size === localGeneratedQuestions.length) {
                    setSelectedQuestions(new Set());
                  } else {
                    setSelectedQuestions(new Set(localGeneratedQuestions.map(q => q.id)));
                  }
                }}
              >
                <div className={cn(
                  "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                  selectedQuestions.size === localGeneratedQuestions.length 
                    ? "bg-primary border-primary" 
                    : "border-muted-foreground/30"
                )}>
                  {selectedQuestions.size === localGeneratedQuestions.length && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                Select All
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedQuestions.size} of {localGeneratedQuestions.length} selected
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {localGeneratedQuestions.filter(q => q.status === 'published').length} published
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {localGeneratedQuestions.filter(q => q.status === 'review').length} in review
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                {localGeneratedQuestions.filter(q => q.status === 'draft').length} draft
              </span>
            </div>
          </div>

          {/* Generated Questions List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {localGeneratedQuestions.map((question, index) => {
                const statusConfig = getStatusConfig(question.status);
                const isSelected = selectedQuestions.has(question.id);
                
                return (
                  <div 
                    key={question.id}
                    className={cn(
                      "border rounded-xl overflow-hidden transition-all",
                      isSelected 
                        ? "border-primary/50 bg-primary/5 shadow-md" 
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    {/* Question Header */}
                    <div className="px-4 py-3 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleQuestionSelection(question.id)}
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                            isSelected 
                              ? "bg-primary border-primary" 
                              : "border-muted-foreground/30 hover:border-primary"
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </button>
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {index + 1}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", statusConfig.className)}
                        >
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-2 px-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 shadow-sm"
                          onClick={() => setEditingQuestion(question)}
                          title="Edit with AI"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-medium">AI Edit</span>
                        </Button>
                        <span className="text-xs text-muted-foreground font-mono">
                          {question.id}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => setEditingQuestion(question)}>
                              <Sparkles className="w-4 h-4" />
                              Edit with AI
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Pencil className="w-4 h-4" />
                              Edit Manually
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Copy className="w-4 h-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {/* Question Content */}
                    <div className="p-4">
                      <p className="text-sm font-medium mb-4">{question.questionText}</p>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div 
                            key={optIndex}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                              option.isCorrect 
                                ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800" 
                                : "bg-muted/30 border-border"
                            )}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                              option.isCorrect 
                                ? "bg-emerald-500 border-emerald-500" 
                                : "border-muted-foreground/30"
                            )}>
                              {option.isCorrect && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className={cn(
                              "text-sm",
                              option.isCorrect && "font-medium text-emerald-700 dark:text-emerald-300"
                            )}>
                              {option.text}
                            </span>
                            {option.isCorrect && (
                              <Badge className="ml-auto bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-0 text-xs">
                                Correct
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Question Metadata */}
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-3 flex-wrap">
                        <Badge variant="outline" className="text-xs gap-1">
                          <span className="font-bold">{question.points}</span> Point{question.points !== 1 ? 's' : ''}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.scoringType}
                        </Badge>
                        {question.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* More Options - Collapsible */}
                      {(question.scoring || question.layout || question.extras) && (
                        <Collapsible className="mt-4 border border-border rounded-lg">
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium text-primary hover:bg-muted/50 transition-colors group">
                            <span className="flex items-center gap-2">
                              <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                              More options
                            </span>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 pt-0 space-y-6">
                              {/* Scoring Section */}
                              {question.scoring && (
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm">Scoring</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                      <Checkbox checked={question.scoring.unscoredPractice} disabled />
                                      <span className="text-xs text-muted-foreground">Unscored/Practice usage</span>
                                    </div>
                                    <div>
                                      <span className="text-xs text-muted-foreground">Penalty point(s)</span>
                                      <Input value={question.scoring.penaltyPoints} disabled className="h-8 mt-1 text-xs" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Checkbox checked={question.scoring.checkAnswerButton} disabled />
                                      <span className="text-xs text-muted-foreground">Check answer button</span>
                                    </div>
                                    <div>
                                      <span className="text-xs text-muted-foreground">Check answer attempts</span>
                                      <Input value={question.scoring.checkAnswerAttempts} disabled className="h-8 mt-1 text-xs" />
                                    </div>
                                    <div>
                                      <span className="text-xs text-muted-foreground">Scoring type</span>
                                      <Input value={question.scoring.scoringType} disabled className="h-8 mt-1 text-xs" />
                                    </div>
                                    <div>
                                      <span className="text-xs text-muted-foreground">Minimum points if attempted</span>
                                      <Input value={question.scoring.minimumPointsIfAttempted} disabled className="h-8 mt-1 text-xs" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Checkbox checked={question.scoring.enableAutoScoring} disabled />
                                      <span className="text-xs text-muted-foreground">Enable auto scoring</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Layout and Selection Section */}
                              {question.layout && (
                                <>
                                  <Separator />
                                  <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">Layout and Selection</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <span className="text-xs text-muted-foreground">Style</span>
                                        <Input value={question.layout.style} disabled className="h-8 mt-1 text-xs" />
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">Number of columns</span>
                                        <Input value={question.layout.numberOfColumns} disabled className="h-8 mt-1 text-xs" />
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">Orientation</span>
                                        <Input value={question.layout.orientation} disabled className="h-8 mt-1 text-xs" />
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">Font size</span>
                                        <Input value={question.layout.fontSize} disabled className="h-8 mt-1 text-xs" />
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">Stem numeration (review only)</span>
                                        <Input value={question.layout.stemNumeration} disabled className="h-8 mt-1 text-xs" />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Extras Section */}
                              {question.extras && (
                                <>
                                  <Separator />
                                  <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">Extras</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <span className="text-xs text-muted-foreground">Acknowledgements</span>
                                        <div className="relative mt-1">
                                          <Input value={question.extras.acknowledgements} disabled className="h-8 text-xs text-primary pr-8" />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-purple-100 text-purple-500"
                                            onClick={() => setEditingField({ 
                                              questionId: question.id, 
                                              fieldName: 'extras.acknowledgements', 
                                              fieldLabel: 'Acknowledgements',
                                              currentValue: question.extras?.acknowledgements || ''
                                            })}
                                          >
                                            <Sparkles className="w-3.5 h-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">Distractor rationale</span>
                                        <div className="relative mt-1">
                                          <Input value={question.extras.distractorRationale} disabled className="h-8 text-xs pr-8" />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-purple-100 text-purple-500"
                                            onClick={() => setEditingField({ 
                                              questionId: question.id, 
                                              fieldName: 'extras.distractorRationale', 
                                              fieldLabel: 'Distractor Rationale',
                                              currentValue: question.extras?.distractorRationale || ''
                                            })}
                                          >
                                            <Sparkles className="w-3.5 h-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">Rubric reference</span>
                                        <div className="relative mt-1">
                                          <Input value={question.extras.rubricReference} disabled className="h-8 text-xs pr-8" />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-purple-100 text-purple-500"
                                            onClick={() => setEditingField({ 
                                              questionId: question.id, 
                                              fieldName: 'extras.rubricReference', 
                                              fieldLabel: 'Rubric Reference',
                                              currentValue: question.extras?.rubricReference || ''
                                            })}
                                          >
                                            <Sparkles className="w-3.5 h-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">Stimulus (review only)</span>
                                        <div className="relative mt-1">
                                          <Input value={question.extras.stimulus || ""} disabled className="h-8 text-xs pr-8" />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-purple-100 text-purple-500"
                                            onClick={() => setEditingField({ 
                                              questionId: question.id, 
                                              fieldName: 'extras.stimulus', 
                                              fieldLabel: 'Stimulus',
                                              currentValue: question.extras?.stimulus || ''
                                            })}
                                          >
                                            <Sparkles className="w-3.5 h-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div className="col-span-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-muted-foreground">Instructor stimulus</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 gap-1 px-2 text-xs hover:bg-purple-100 text-purple-500"
                                            onClick={() => setEditingField({ 
                                              questionId: question.id, 
                                              fieldName: 'extras.instructorStimulus', 
                                              fieldLabel: 'Instructor Stimulus',
                                              currentValue: question.extras?.instructorStimulus || ''
                                            })}
                                          >
                                            <Sparkles className="w-3 h-3" />
                                            AI Edit
                                          </Button>
                                        </div>
                                        <div className="mt-1 p-3 bg-muted/50 rounded-md text-xs whitespace-pre-wrap max-h-48 overflow-y-auto border">
                                          {question.extras.instructorStimulus}
                                        </div>
                                      </div>
                                      <div className="col-span-2">
                                        <span className="text-xs text-muted-foreground">Sample answer</span>
                                        <div className="relative mt-1">
                                          <Input value={question.extras.sampleAnswer} disabled className="h-8 text-xs pr-8" />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-purple-100 text-purple-500"
                                            onClick={() => setEditingField({ 
                                              questionId: question.id, 
                                              fieldName: 'extras.sampleAnswer', 
                                              fieldLabel: 'Sample Answer',
                                              currentValue: question.extras?.sampleAnswer || ''
                                            })}
                                          >
                                            <Sparkles className="w-3.5 h-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-background flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setView('list')}>
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Generate More
              </Button>
              <Button 
                size="sm"
                onClick={handlePublishSelected}
                disabled={selectedQuestions.size === 0}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Publish {selectedQuestions.size} to Item Bank
              </Button>
            </div>
          </div>

          {/* Floating AI Chatbot for ai-generated view */}
          <LearnosityAIChatbot 
            onGenerateQuestions={handleChatbotGenerateQuestions}
            onUpdateQuestion={handleUpdateQuestion}
            onUpdateField={handleFieldUpdate}
            courseName={courseName}
            contentArea={contentArea}
            editingQuestion={editingQuestion}
            editingField={editingField}
            onClearEditingQuestion={() => setEditingQuestion(null)}
            onClearEditingField={() => setEditingField(null)}
          />
        </>
      ) : view === 'list' ? (
        <>
          {/* Search and Actions Bar */}
          <div className="px-4 py-3 border-b border-border bg-background">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search items by name, tag, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9 bg-background"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Select value={statusFilter} onValueChange={(value: 'all' | 'published' | 'review' | 'draft' | 'ai-generated') => setStatusFilter(value)}>
                <SelectTrigger className="w-36 h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="ai-generated">AI Generated</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex-1" />
              
              <div className="flex items-center border border-border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="h-8 rounded-none border-0"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
                <div className="w-px h-4 bg-border" />
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="h-8 rounded-none border-0"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 h-9">
                    <Plus className="w-4 h-4" />
                    Create New
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setView('create')} className="gap-2">
                    <FileText className="w-4 h-4" />
                    New Question
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    New Activity
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2">
                    <Copy className="w-4 h-4" />
                    Import Items
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results Info Bar */}
          <div className="px-4 py-2 border-b border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {filteredItems.length} items
              </span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {items.filter(i => i.status === 'published').length} published
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {items.filter(i => i.status === 'review').length} in review
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  {items.filter(i => i.status === 'draft').length} draft
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {items.filter(i => i.aiGenerated).length} AI generated
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-8 text-xs border-0 bg-transparent">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="updated">Last Updated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" disabled>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <span className="px-1">1-{filteredItems.length} of {filteredItems.length}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" disabled>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Items List */}
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border/60">
              {filteredItems.map((item) => {
                const statusConfig = getStatusConfig(item.status);
                return (
                  <div 
                    key={item.id}
                    className="px-4 py-3.5 hover:bg-muted/30 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Status indicator */}
                      <div className={cn(
                        "mt-2 w-2 h-2 rounded-full shrink-0",
                        statusConfig.dot
                      )} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground text-sm">
                            {item.title}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs shrink-0 font-normal", statusConfig.className)}
                          >
                            {statusConfig.label}
                          </Badge>
                          {item.aiGenerated && (
                            <Badge 
                              variant="secondary"
                              className="text-xs shrink-0 gap-1 bg-emerald-50 text-emerald-700 border-emerald-200"
                            >
                              <Sparkles className="w-3 h-3" />
                              AI Generated
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {item.itemCount} item{item.itemCount !== 1 ? 's' : ''}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.lastUpdated}
                          </span>
                          {item.learningSequence && (
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {item.learningSequence}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 gap-1 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddItem) {
                              onAddItem(item);
                            }
                          }}
                          title="Add to Learning Sequence"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Add</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2 text-sm">
                              <Copy className="w-4 h-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-sm">
                              <Tag className="w-4 h-4" />
                              Add Tags
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-sm text-destructive">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Floating AI Chatbot */}
          <LearnosityAIChatbot 
            onGenerateQuestions={handleChatbotGenerateQuestions}
            onUpdateQuestion={handleUpdateQuestion}
            onUpdateField={handleFieldUpdate}
            courseName={courseName}
            contentArea={contentArea}
            editingQuestion={editingQuestion}
            editingField={editingField}
            onClearEditingQuestion={() => setEditingQuestion(null)}
            onClearEditingField={() => setEditingField(null)}
          />
        </>
      ) : (
        <>
          {/* Create View - Header */}
          <div className="px-4 py-3 border-b border-border bg-background flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setView('list')}>
              <ArrowLeft className="w-4 h-4" />
              Back to Items
            </Button>
            <h2 className="text-sm font-semibold">Create New Question</h2>
            <div className="w-24" />
          </div>

          {/* Create View */}
          <div className="flex-1 flex">
            {/* Sidebar - Question Categories */}
            <div className="w-56 border-r border-border bg-muted/20 p-3">
              <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3 px-2">Question Types</h3>
              <div className="space-y-0.5">
                {questionCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors text-left",
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", selectedCategory === category.id ? "" : "text-muted-foreground")} />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Main Content - Question Type Selection */}
            <div className="flex-1 p-5 overflow-auto">
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold">
                      {questionCategories.find(c => c.id === selectedCategory)?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">Click to add a question type</p>
                  </div>
                  <Input 
                    placeholder="Search question types..." 
                    className="max-w-xs h-8 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {(questionTypes[selectedCategory as keyof typeof questionTypes] || questionTypes['multiple-choice']).map((type) => (
                  <div 
                    key={type.id}
                    className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-md cursor-pointer transition-all bg-card"
                  >
                    <div className="bg-slate-800 text-white px-3 py-2.5 flex items-center gap-2">
                      <span className="text-lg">{type.icon}</span>
                      <span className="font-medium text-xs">{type.name}</span>
                    </div>
                    <div className="p-3 min-h-[60px] flex items-center">
                      <p className="text-xs text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                    <div className="px-3 py-2 border-t border-border bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="w-full gap-1.5 h-7 text-xs">
                        <Plus className="w-3 h-3" />
                        Add Question
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-background flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setView('list')}>
              Cancel
            </Button>
            <Button size="sm" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Save Question
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
