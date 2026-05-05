import { useState, useEffect } from 'react';
import { 
  X, Sparkles, Check, Loader2, ArrowRight, 
  BookOpen, FileText, Lightbulb, Target, Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ContentItem } from '@/types/assessment';

interface ContentScreenCreatorModalProps {
  open: boolean;
  onClose: () => void;
  onCreateContent: (content: ContentItem, generatedHtml: string) => void;
  currentFolder?: string;
}

type Step = 'configure' | 'generating' | 'preview' | 'editor';

interface ContentConfig {
  title: string;
  contentType: string;
  topic: string;
  learningObjectives: string;
  targetAudience: string;
  additionalContext: string;
}

const CONTENT_TYPES = [
  { value: 'lesson', label: 'Lesson Content', icon: BookOpen, description: 'Educational lesson with explanations and examples' },
  { value: 'overview', label: 'Overview/Introduction', icon: Target, description: 'Introduction to a topic or unit' },
  { value: 'reference', label: 'Reference Material', icon: FileText, description: 'Quick reference guide or summary' },
  { value: 'activity', label: 'Learning Activity', icon: Lightbulb, description: 'Interactive activity instructions' },
];

const SAMPLE_TOPICS = [
  'One-Variable Data Analysis',
  'Measures of Central Tendency',
  'Introduction to Probability',
  'Sampling Methods',
  'Hypothesis Testing Basics',
];

export function ContentScreenCreatorModal({
  open,
  onClose,
  onCreateContent,
  currentFolder = 'Learning Sequence',
}: ContentScreenCreatorModalProps) {
  const [step, setStep] = useState<Step>('configure');
  const [progress, setProgress] = useState(0);
  const [config, setConfig] = useState<ContentConfig>({
    title: '',
    contentType: 'lesson',
    topic: '',
    learningObjectives: '',
    targetAudience: 'High School AP Statistics Students',
    additionalContext: '',
  });
  const [generatedContent, setGeneratedContent] = useState('');

  useEffect(() => {
    if (open) {
      setStep('configure');
      setProgress(0);
      setConfig({
        title: '',
        contentType: 'lesson',
        topic: '',
        learningObjectives: '',
        targetAudience: 'High School AP Statistics Students',
        additionalContext: '',
      });
      setGeneratedContent('');
    }
  }, [open]);

  const handleGenerate = () => {
    setStep('generating');
    setProgress(0);

    // Simulate AI generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Generate content after "loading"
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const content = generateAIContent(config);
      setGeneratedContent(content);
      setTimeout(() => setStep('preview'), 500);
    }, 2500);
  };

  const handleOpenEditor = () => {
    const newItem: ContentItem = {
      id: `content-${Date.now()}`,
      name: config.title || `${config.topic} Content`,
      type: 'content-screen',
      description: `AI-generated ${config.contentType} content about ${config.topic}`,
      lastUpdated: 'Just now',
    };
    onCreateContent(newItem, generatedContent);
    onClose();
  };

  const handleRegenerateWithAI = () => {
    setStep('generating');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const content = generateAIContent(config, true);
      setGeneratedContent(content);
      setTimeout(() => setStep('preview'), 300);
    }, 1500);
  };

  const isConfigValid = config.title.trim() && config.topic.trim();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span>AI Content Screen Creator</span>
              <Badge variant="secondary" className="ml-2 text-xs">AI Powered</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 px-1 py-2 border-b">
          {['Configure', 'Generate', 'Preview & Edit'].map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                idx === 0 && step === 'configure' ? "bg-primary text-primary-foreground" :
                idx === 1 && step === 'generating' ? "bg-primary text-primary-foreground" :
                idx === 2 && step === 'preview' ? "bg-primary text-primary-foreground" :
                idx < ['configure', 'generating', 'preview'].indexOf(step) ? "bg-green-500 text-white" :
                "bg-muted text-muted-foreground"
              )}>
                {idx < ['configure', 'generating', 'preview'].indexOf(step) ? (
                  <Check className="w-3 h-3" />
                ) : (
                  idx + 1
                )}
              </div>
              <span className={cn(
                "text-sm",
                ['configure', 'generating', 'preview'][idx] === step ? "font-medium" : "text-muted-foreground"
              )}>{label}</span>
              {idx < 2 && <ArrowRight className="w-4 h-4 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>

        <ScrollArea className="flex-1 px-1">
          {step === 'configure' && (
            <div className="space-y-6 py-4">
              {/* Content Type Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Content Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {CONTENT_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setConfig(prev => ({ ...prev, contentType: type.value }))}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all",
                        config.contentType === type.value 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <type.icon className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">{type.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Content Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Data Analysis"
                  value={config.title}
                  onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <div className="flex gap-2">
                  <Select
                    value={config.topic}
                    onValueChange={(value) => setConfig(prev => ({ ...prev, topic: value }))}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select or type a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {SAMPLE_TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Or type a custom topic..."
                  value={!SAMPLE_TOPICS.includes(config.topic) ? config.topic : ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, topic: e.target.value }))}
                  className="mt-2"
                />
              </div>

              {/* Learning Objectives */}
              <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives (Optional)</Label>
                <Textarea
                  id="objectives"
                  placeholder="What should students learn from this content?"
                  value={config.learningObjectives}
                  onChange={(e) => setConfig(prev => ({ ...prev, learningObjectives: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., High School AP Statistics Students"
                  value={config.targetAudience}
                  onChange={(e) => setConfig(prev => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>

              {/* Additional Context */}
              <div className="space-y-2">
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Any specific requirements or context for the content..."
                  value={config.additionalContext}
                  onChange={(e) => setConfig(prev => ({ ...prev, additionalContext: e.target.value }))}
                  rows={2}
                />
              </div>
            </div>
          )}

          {step === 'generating' && (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generating Content with AI</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                Creating {config.contentType} content about "{config.topic}" tailored for {config.targetAudience}
              </p>
              <div className="w-64 space-y-2">
                <Progress value={Math.min(progress, 100)} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Generating...</span>
                  <span>{Math.round(Math.min(progress, 100))}%</span>
                </div>
              </div>
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {progress < 30 && <p className="animate-pulse">📚 Analyzing topic structure...</p>}
                {progress >= 30 && progress < 60 && <p className="animate-pulse">✍️ Writing content sections...</p>}
                {progress >= 60 && progress < 90 && <p className="animate-pulse">🎨 Formatting and styling...</p>}
                {progress >= 90 && <p className="animate-pulse">✅ Finalizing content...</p>}
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Generated Content Preview</h3>
                  <p className="text-sm text-muted-foreground">Review the AI-generated content before editing</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRegenerateWithAI}>
                  <Wand2 className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 bg-card max-h-[350px] overflow-y-auto">
                <div 
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: generatedContent }}
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ready to edit in CKEditor 5</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click "Open in Editor" to fine-tune the content with the full-featured rich text editor. 
                      You can also use AI to update specific sections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="flex-shrink-0 flex items-center justify-between pt-4 border-t mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {step === 'configure' && (
              <Button onClick={handleGenerate} disabled={!isConfigValid}>
                <Sparkles className="w-4 h-4 mr-1" />
                Generate with AI
              </Button>
            )}
            {step === 'preview' && (
              <>
                <Button variant="outline" onClick={() => setStep('configure')}>
                  Back to Configure
                </Button>
                <Button onClick={handleOpenEditor}>
                  Open in Editor
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Generate AI content based on configuration
function generateAIContent(config: ContentConfig, variation = false): string {
  const { title, contentType, topic, learningObjectives, targetAudience } = config;

  const baseContent = `
    <h1>${title || topic}</h1>
    
    <p>Welcome to this ${contentType === 'lesson' ? 'comprehensive lesson' : contentType === 'overview' ? 'introductory overview' : contentType === 'reference' ? 'reference guide' : 'learning activity'} on <strong>${topic}</strong>. This content is designed specifically for ${targetAudience}.</p>
    
    <h2>Learning Objectives</h2>
    <p>By the end of this ${contentType}, students will be able to:</p>
    <ul>
      <li>Understand the fundamental concepts of ${topic}</li>
      <li>Apply ${topic.toLowerCase()} techniques to solve real-world problems</li>
      <li>Analyze and interpret data using appropriate methods</li>
      ${learningObjectives ? `<li>${learningObjectives}</li>` : '<li>Communicate findings effectively using statistical vocabulary</li>'}
    </ul>
    
    <h2>Key Concepts</h2>
    <p>Understanding ${topic} is essential for building a strong foundation in statistics. Let's explore the main ideas:</p>
    
    <h3>1. Introduction to ${topic}</h3>
    <p>${topic} involves examining and describing ${variation ? 'patterns and characteristics within' : 'the distribution of values in'} a dataset. This includes understanding:</p>
    <ul>
      <li><strong>Shape</strong>: The overall pattern of the distribution (symmetric, skewed, bimodal, etc.)</li>
      <li><strong>Center</strong>: Measures like mean, median, and mode that represent typical values</li>
      <li><strong>Spread</strong>: Measures like range, IQR, and standard deviation that describe variability</li>
      <li><strong>Unusual Features</strong>: Outliers, gaps, and clusters in the data</li>
    </ul>
    
    <h3>2. Graphical Representations</h3>
    <p>Visual displays help us understand data patterns. Common graphs include:</p>
    <table>
      <thead>
        <tr>
          <th>Graph Type</th>
          <th>Best Used For</th>
          <th>Key Features</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Histogram</td>
          <td>Continuous data distribution</td>
          <td>Shows shape and spread</td>
        </tr>
        <tr>
          <td>Box Plot</td>
          <td>Comparing distributions</td>
          <td>Displays five-number summary</td>
        </tr>
        <tr>
          <td>Stem-and-Leaf</td>
          <td>Small datasets</td>
          <td>Preserves individual values</td>
        </tr>
        <tr>
          <td>Dot Plot</td>
          <td>Small discrete datasets</td>
          <td>Shows individual data points</td>
        </tr>
      </tbody>
    </table>
    
    <h3>3. Numerical Summaries</h3>
    <p>Numerical measures provide precise descriptions of data:</p>
    <blockquote>
      <p><strong>Key Insight:</strong> The choice between mean/standard deviation and median/IQR depends on the shape of the distribution and presence of outliers.</p>
    </blockquote>
    
    <h2>Practice Problems</h2>
    <p>Apply what you've learned with these practice questions:</p>
    <ol>
      <li>A dataset has mean = 75 and median = 82. Describe the likely shape of this distribution and explain your reasoning.</li>
      <li>Given the five-number summary: Min = 15, Q1 = 28, Median = 35, Q3 = 42, Max = 95. Identify any potential outliers using the 1.5×IQR rule.</li>
      <li>Compare and contrast when you would use a histogram versus a box plot to display data.</li>
    </ol>
    
    <h2>Summary</h2>
    <p>In this ${contentType}, we covered the essential concepts of ${topic}. Remember these key takeaways:</p>
    <ul>
      <li>Always describe distributions in terms of shape, center, and spread</li>
      <li>Choose appropriate graphical and numerical summaries based on data characteristics</li>
      <li>Consider the context when interpreting statistical measures</li>
    </ul>
    
    <p><em>Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</em></p>
  `;

  return baseContent;
}
