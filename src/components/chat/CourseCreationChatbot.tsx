import { useState, useEffect, useRef } from "react";
import { 
  X, Send, Sparkles, ChevronRight, Bot, 
  Check, BookOpen, FileText, ListChecks, 
  GraduationCap, Loader2, Minimize2, Maximize2, 
  PanelLeft, PanelRight, MessageCircle, ClipboardList,
  FileQuestion, LayoutList, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { AssessmentConfig, GeneratedQuestion } from "@/types/learnosity";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: SuggestedAction[];
  component?: React.ReactNode;
}

interface SuggestedAction {
  label: string;
  description?: string;
  value?: string;
  icon?: React.ReactNode;
}

type ChatMode = "main" | "create-course" | "create-assessment" | "create-sequence-overview" | "create-sequence-content" | "create-overview";

interface CourseCreationStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const CREATION_STEPS: CourseCreationStep[] = [
  { id: "welcome", title: "Welcome", icon: <Sparkles className="w-4 h-4" />, description: "Getting started" },
  { id: "basics", title: "Course Basics", icon: <BookOpen className="w-4 h-4" />, description: "Name & subject" },
  { id: "structure", title: "Structure", icon: <ListChecks className="w-4 h-4" />, description: "Content areas & guides" },
  { id: "sequences", title: "Learning Sequences", icon: <FileText className="w-4 h-4" />, description: "Tasks & assessments" },
  { id: "review", title: "Review", icon: <GraduationCap className="w-4 h-4" />, description: "Final review" },
];

const ASSESSMENT_STEPS: CourseCreationStep[] = [
  { id: "topic", title: "Topic", icon: <FileQuestion className="w-4 h-4" />, description: "Select topic" },
  { id: "configure", title: "Configure", icon: <ClipboardList className="w-4 h-4" />, description: "Set options" },
  { id: "generate", title: "Generate", icon: <Sparkles className="w-4 h-4" />, description: "AI generation" },
];

const CONTENT_STEPS: CourseCreationStep[] = [
  { id: "context", title: "Context", icon: <BookOpen className="w-4 h-4" />, description: "Learning context" },
  { id: "generate", title: "Generate", icon: <Sparkles className="w-4 h-4" />, description: "AI generation" },
  { id: "review", title: "Review", icon: <Check className="w-4 h-4" />, description: "Review & save" },
];

// Sample generated questions for demo
const SAMPLE_GENERATED_QUESTIONS: GeneratedQuestion[] = [
  {
    id: "Math_HS_AP_Statistics_LS_1.1_Item_1",
    title: "Gaps and Clusters Display",
    questionText: "Which of the following can best display or summarize the multiple gaps and clusters of a data distribution?",
    options: [
      { text: "Mean and standard deviation", isCorrect: false },
      { text: "Median and IQR", isCorrect: false },
      { text: "Boxplot", isCorrect: false },
      { text: "Stem-and-leaf plot", isCorrect: true },
      { text: "None of the above is really helpful", isCorrect: false },
    ],
    status: "published",
    points: 1,
    scoringType: "Exact Match",
    tags: ["AP Statistics", "Data Display", "1.1"],
  },
  {
    id: "Math_HS_AP_Statistics_LS_1.1_Item_2",
    title: "Distribution Shape",
    questionText: "A dataset has mean 45 and median 52. What is the most likely shape of this distribution?",
    options: [
      { text: "Skewed left", isCorrect: true },
      { text: "Skewed right", isCorrect: false },
      { text: "Symmetric", isCorrect: false },
      { text: "Uniform", isCorrect: false },
    ],
    status: "review",
    points: 1,
    scoringType: "Exact Match",
    tags: ["AP Statistics", "Distribution Shape", "1.1"],
  },
  {
    id: "Math_HS_AP_Statistics_LS_1.1_Item_3",
    title: "Measure of Center",
    questionText: "For the dataset: 12, 15, 18, 22, 25, 28, 30, 35, 42, 88. Which measure of center best represents the typical value?",
    options: [
      { text: "Mean, because it uses all values", isCorrect: false },
      { text: "Median, because of the outlier", isCorrect: true },
      { text: "Mode, because it's most frequent", isCorrect: false },
      { text: "Range, because it shows spread", isCorrect: false },
    ],
    status: "published",
    points: 1,
    scoringType: "Auto-scored",
    tags: ["AP Statistics", "Center", "1.1"],
  },
  {
    id: "Math_HS_AP_Statistics_LS_1.1_Item_4",
    title: "IQR Resistance",
    questionText: "The interquartile range (IQR) is resistant to outliers because it:",
    options: [
      { text: "Uses all data points in calculation", isCorrect: false },
      { text: "Is always larger than the standard deviation", isCorrect: false },
      { text: "Only uses the middle 50% of data", isCorrect: true },
      { text: "Is calculated using the mean", isCorrect: false },
    ],
    status: "draft",
    points: 1,
    scoringType: "Exact Match",
    tags: ["AP Statistics", "Spread", "1.1"],
  },
  {
    id: "Math_HS_AP_Statistics_LS_1.1_Item_5",
    title: "Bell-Shaped Distribution",
    questionText: "A histogram of test scores shows a bell-shaped distribution. Which statement is most likely true?",
    options: [
      { text: "Mean ≈ Median ≈ Mode", isCorrect: true },
      { text: "Mean > Median > Mode", isCorrect: false },
      { text: "Mode > Median > Mean", isCorrect: false },
      { text: "The measures cannot be compared", isCorrect: false },
    ],
    status: "published",
    points: 1,
    scoringType: "Auto-scored",
    tags: ["AP Statistics", "Normal Distribution", "1.1"],
  },
  {
    id: "Math_HS_AP_Statistics_LS_1.1_Item_6",
    title: "Comparing Distributions",
    questionText: "Which graphical display would be MOST appropriate for comparing the distribution of test scores between two different classes?",
    options: [
      { text: "Pie charts", isCorrect: false },
      { text: "Scatter plot", isCorrect: false },
      { text: "Side-by-side boxplots", isCorrect: true },
      { text: "Line graph", isCorrect: false },
    ],
    status: "draft",
    points: 1,
    scoringType: "Exact Match",
    tags: ["AP Statistics", "Data Display", "1.1"],
  },
];

interface CourseCreationChatbotProps {
  onComplete: (courseName: string) => void;
  onOpenLearnosity?: (config: AssessmentConfig, questions: GeneratedQuestion[]) => void;
  position?: "left" | "right";
}

export function CourseCreationChatbot({ 
  onComplete,
  onOpenLearnosity,
  position = "right" 
}: CourseCreationChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [chatPosition, setChatPosition] = useState<"left" | "right">(position);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mode, setMode] = useState<ChatMode>("main");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [courseData, setCourseData] = useState({
    name: "",
    contentArea: "",
    schoolLevel: "",
  });
  const [assessmentConfig, setAssessmentConfig] = useState<Partial<AssessmentConfig>>({});

  const getStepsForMode = () => {
    switch (mode) {
      case "create-course": return CREATION_STEPS;
      case "create-assessment": return ASSESSMENT_STEPS;
      case "create-sequence-overview":
      case "create-sequence-content":
      case "create-overview": return CONTENT_STEPS;
      default: return [];
    }
  };

  const currentSteps = getStepsForMode();
  const currentStepInfo = currentSteps[currentStep];
  const progress = currentSteps.length > 0 ? ((currentStep + 1) / currentSteps.length) * 100 : 0;

  const getModeTitle = () => {
    switch (mode) {
      case "create-course": return "Course Creation Wizard";
      case "create-assessment": return "AI Assessment Builder";
      case "create-sequence-overview": return "Sequence Overview Generator";
      case "create-sequence-content": return "Sequence Content Generator";
      case "create-overview": return "Overview Generator";
      default: return "AI Content Assistant";
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      showMainMenu();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const showMainMenu = () => {
    setMode("main");
    setCurrentStep(0);
    setAssessmentConfig({});
    addAssistantMessage(
      "👋 Hi! I'm your AI Content Assistant. I can help you create content using AI.\n\nWhat would you like to do?",
      [
        { label: "Create Assessment", description: "Generate assessment questions using AI", icon: <ClipboardList className="w-4 h-4" /> },
        { label: "Create Course", description: "Build a new course from scratch", icon: <BookOpen className="w-4 h-4" /> },
        { label: "Create Sequence Overview", description: "Generate a sequence overview", icon: <LayoutList className="w-4 h-4" /> },
        { label: "Create Sequence Content", description: "Generate detailed sequence content", icon: <FileText className="w-4 h-4" /> },
        { label: "Create Overview", description: "Generate an introduction overview", icon: <Home className="w-4 h-4" /> },
      ]
    );
  };

  const addAssistantMessage = (content: string, actions?: SuggestedAction[], component?: React.ReactNode) => {
    const message: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content,
      actions,
      component,
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };
    setMessages(prev => [...prev, message]);
  };

  const simulateTyping = (callback: () => void, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleMainMenuChoice = (choice: string) => {
    addUserMessage(choice);

    if (choice.includes("Create Assessment")) {
      setMode("create-assessment");
      setCurrentStep(0);
      simulateTyping(() => {
        addAssistantMessage(
          "🎯 Let's create an assessment using AI!\n\nI'll help you configure the assessment, then open **Assessment Author** to generate and preview the questions.\n\nWhat topic should this assessment cover?",
          [
            { label: "One-Variable Data Analysis", description: "Distributions, histograms, box plots" },
            { label: "Two-Variable Data Analysis", description: "Scatter plots, correlation, regression" },
            { label: "Probability Concepts", description: "Random events, conditional probability" },
            { label: "Custom topic", description: "Specify your own topic" },
          ]
        );
      });
    } else if (choice.includes("Create Course")) {
      setMode("create-course");
      setCurrentStep(0);
      simulateTyping(() => {
        addAssistantMessage(
          "Let's create a new course! I'll guide you through the process step-by-step.\n\nFirst, what would you like to name your course?",
          [
            { label: "AP Statistics", description: "Use example course name" },
            { label: "AP Calculus", description: "Use example course name" },
            { label: "Custom name", description: "Enter your own name" },
          ]
        );
      });
    } else if (choice.includes("Sequence Overview")) {
      handleContentCreationFlow("sequence-overview");
    } else if (choice.includes("Sequence Content")) {
      handleContentCreationFlow("sequence-content");
    } else if (choice.includes("Create Overview")) {
      handleContentCreationFlow("overview");
    }
  };

  const handleContentCreationFlow = (type: string) => {
    // Simplified content creation - just show a success message for demo
    setMode(type === "sequence-overview" ? "create-sequence-overview" : 
            type === "sequence-content" ? "create-sequence-content" : "create-overview");
    setCurrentStep(0);
    simulateTyping(() => {
      addAssistantMessage(
        `📋 I'll help you generate ${type.replace("-", " ")}.\n\nWhich learning sequence is this for?`,
        [
          { label: "1.1 Exploring One-Variable Data", description: "Conceptual understanding" },
          { label: "1.2 Exploring Two-Variable Data", description: "Correlation and regression" },
          { label: "2.1 Sampling Distributions", description: "Statistical inference" },
          { label: "Custom sequence", description: "Specify your own sequence" },
        ]
      );
    });
  };

  // Learnosity Assessment creation flow
  const handleAssessmentFlow = (choice: string) => {
    addUserMessage(choice);

    switch (currentStep) {
      case 0: // Topic selection
        setAssessmentConfig(prev => ({ ...prev, topic: choice }));
        simulateTyping(() => {
          setCurrentStep(1);
          addAssistantMessage(
            `Great! Creating an assessment on "${choice}".\n\nWhat type of questions would you like?`,
            [
              { label: "Multiple Choice Only", description: "Standard single-answer questions" },
              { label: "Mixed Question Types", description: "MCQ + multi-select + short answer" },
              { label: "Advanced Configuration", description: "Customize scoring & options" },
            ]
          );
        });
        break;

      case 1: // Configuration
        setAssessmentConfig(prev => ({ ...prev, questionType: choice, questionCount: 6 }));
        simulateTyping(() => {
          setCurrentStep(2);
          
          // Show generating message
          const generatingComponent = (
            <div className="mt-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                   <div className="font-medium text-sm">Generating Assessment Items...</div>
                   <div className="text-xs text-muted-foreground">Creating 6 assessment questions</div>
                </div>
              </div>
              <div className="mt-3">
                <Progress value={65} className="h-2" />
              </div>
            </div>
          );
          
          addAssistantMessage(
            `Configuration set: ${choice}\n\n🤖 Generating your assessment...`,
            undefined,
            generatingComponent
          );

          // After "generation" completes, show success and prompt to open Learnosity
          setTimeout(() => {
            const successComponent = (
              <div className="mt-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-300 text-sm">6 Questions Generated!</div>
                    <div className="text-xs text-green-600 dark:text-green-400">Ready to preview in Assessment Author</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                  <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                    <div className="font-bold text-green-600">3</div>
                    <div className="text-muted-foreground">Published</div>
                  </div>
                  <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                    <div className="font-bold text-yellow-600">1</div>
                    <div className="text-muted-foreground">Review</div>
                  </div>
                  <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                    <div className="font-bold text-gray-600">2</div>
                    <div className="text-muted-foreground">Draft</div>
                  </div>
                </div>
              </div>
            );
            
            addAssistantMessage(
              "✅ Assessment items generated successfully!\n\nClick below to open **Assessment Author** and review your AI-generated questions:",
              [
                { label: "Open in Assessment Author", description: "Preview and edit generated questions", icon: <Sparkles className="w-4 h-4" /> },
                { label: "Generate More Questions", description: "Create additional items" },
                { label: "Back to Menu", description: "Return to main menu" },
              ],
              successComponent
            );
          }, 2000);
        }, 1000);
        break;

      case 2: // After generation
        if (choice.includes("Open in Assessment")) {
          // Trigger opening Learnosity with generated questions
          const config: AssessmentConfig = {
            topic: assessmentConfig.topic || "One-Variable Data Analysis",
            questionType: assessmentConfig.questionType || "Mixed",
            questionCount: 6,
            courseName: "AP Statistics",
            contentArea: "Math",
          };
          
          onOpenLearnosity?.(config, SAMPLE_GENERATED_QUESTIONS);
          
          addAssistantMessage(
            "🚀 Opening Assessment Author with your generated questions!\n\nYou can now:\n• Preview each question\n• Edit content and options\n• Publish to your item bank\n• Add more questions",
            [
              { label: "Generate More Questions", description: "Create additional items" },
              { label: "Back to Menu", description: "Return to main menu" },
            ]
          );
        } else if (choice.includes("Generate More")) {
          setCurrentStep(0);
          simulateTyping(() => {
            addAssistantMessage(
              "Let's generate more questions!\n\nWhat topic should this next batch cover?",
              [
                { label: "Same topic (more questions)", description: assessmentConfig.topic },
                { label: "Two-Variable Data Analysis", description: "Scatter plots, correlation" },
                { label: "Probability Concepts", description: "Random events, conditional" },
                { label: "Custom topic", description: "Specify your own" },
              ]
            );
          });
        } else if (choice.includes("Back to Menu")) {
          showMainMenu();
        }
        break;
    }
  };

  const handleAction = (action: SuggestedAction) => {
    if (mode === "main") {
      handleMainMenuChoice(action.label);
    } else if (mode === "create-assessment") {
      handleAssessmentFlow(action.label);
    } else if (mode === "create-course") {
      handleCourseCreationFlow(action.label);
    } else {
      handleGenericContentFlow(action.label);
    }
  };

  const handleCourseCreationFlow = (choice: string) => {
    addUserMessage(choice);
    // Simplified course creation for demo
    if (choice.includes("Back to Menu")) {
      showMainMenu();
    } else {
      simulateTyping(() => {
        setCurrentStep(prev => Math.min(prev + 1, CREATION_STEPS.length - 1));
        addAssistantMessage(
          "Course creation flow continues...\n\nFor this demo, the full course creation is simplified.",
          [
            { label: "Continue", description: "Next step" },
            { label: "Back to Menu", description: "Return to main menu" },
          ]
        );
      });
    }
  };

  const handleGenericContentFlow = (choice: string) => {
    addUserMessage(choice);
    if (choice.includes("Back to Menu")) {
      showMainMenu();
    } else {
      simulateTyping(() => {
        addAssistantMessage(
          "Content generated successfully! (Demo placeholder)\n\nWhat would you like to do next?",
          [
            { label: "Generate More", description: "Create additional content" },
            { label: "Back to Menu", description: "Return to main menu" },
          ]
        );
      });
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    setInput("");
    
    if (mode === "create-assessment") {
      handleAssessmentFlow(userInput);
    } else if (mode === "create-course") {
      handleCourseCreationFlow(userInput);
    } else {
      handleGenericContentFlow(userInput);
    }
  };

  if (!isOpen) {
    // Floating button when closed
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 z-50 h-14 w-14 rounded-full shadow-lg",
          "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
          "flex items-center justify-center",
          chatPosition === "right" ? "right-6" : "left-6"
        )}
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </Button>
    );
  }

  return (
    <div 
      className={cn(
        "fixed z-50 bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300",
        isMaximized 
          ? "inset-4" 
          : isMinimized 
            ? "bottom-6 w-80 h-14" 
            : "bottom-6 w-96 h-[600px]",
        chatPosition === "right" ? "right-6" : "left-6"
      )}
    >
      {/* Header */}
      <div className="h-14 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{getModeTitle()}</h3>
            {currentStepInfo && !isMinimized && (
              <p className="text-xs text-primary-foreground/70">
                Step {currentStep + 1}: {currentStepInfo.title}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setChatPosition(chatPosition === "right" ? "left" : "right")}
              >
                {chatPosition === "right" ? <PanelLeft className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to {chatPosition === "right" ? "left" : "right"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => {
                  setIsMinimized(!isMinimized);
                  if (isMaximized) setIsMaximized(false);
                }}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isMinimized ? "Expand" : "Minimize"}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => {
                  setIsMaximized(!isMaximized);
                  if (isMinimized) setIsMinimized(false);
                }}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isMaximized ? "Restore" : "Maximize"}</TooltipContent>
          </Tooltip>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Progress indicator for modes with steps */}
          {currentSteps.length > 0 && (
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{currentStepInfo?.description}</span>
                <span>{currentStep + 1} / {currentSteps.length}</span>
              </div>
              <Progress value={progress} className="h-1.5" />
              <div className="flex justify-between mt-2">
                {currentSteps.map((step, i) => (
                  <Tooltip key={step.id}>
                    <TooltipTrigger asChild>
                      <div 
                        className={cn(
                          "flex items-center justify-center w-6 h-6 rounded-full transition-all",
                          i <= currentStep 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {i < currentStep ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          step.icon
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{step.title}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] rounded-xl px-4 py-3",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.component && (
                      <div className="mt-2">{message.component}</div>
                    )}
                    
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.actions.map((action, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start gap-2 h-auto py-2 px-3 bg-background hover:bg-accent"
                            onClick={() => handleAction(action)}
                          >
                            {action.icon}
                            <div className="text-left">
                              <div className="font-medium text-xs">{action.label}</div>
                              {action.description && (
                                <div className="text-[10px] text-muted-foreground">{action.description}</div>
                              )}
                            </div>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
