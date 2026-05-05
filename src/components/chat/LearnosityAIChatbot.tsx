import { useState, useEffect, useRef } from "react";
import { 
  X, Send, Sparkles, ChevronRight, Bot, 
  Check, Loader2, MessageCircle, ClipboardList,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GeneratedQuestion } from "@/types/learnosity";

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

// Sample generated questions with additional settings
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
    scoring: {
      unscoredPractice: false,
      penaltyPoints: 0,
      checkAnswerButton: false,
      checkAnswerAttempts: 0,
      scoringType: "Exact match",
      enableAutoScoring: true,
      minimumPointsIfAttempted: 0,
    },
    layout: {
      style: "Standard",
      numberOfColumns: 1,
      orientation: "Vertical",
      fontSize: "Normal",
      stemNumeration: "Numerical",
    },
    extras: {
      acknowledgements: "Accountability Guide",
      distractorRationale: "Options test understanding of graphical displays vs summary statistics for distribution shape analysis.",
      rubricReference: "AP-STATS-1.1-A",
      stimulus: "",
      instructorStimulus: "**Answer Analysis:**\nThis question assesses scholars' understanding that dotplots, stem-and-leaf displays, and histograms can best show the overall shape of the distribution, including gaps and clusters.\n\n• A: Mean and standard deviation summarize center and variability, but they alone do not tell anything about the shape of the distribution.\n• B: Median and IQR summarize center and variability, but they alone do not tell anything about the shape of the distribution.\n• C: Boxplots can show skewness and outliers, but they cannot tell whether the distribution is unimodal, bimodal, or multiple clusters.\n• D: Stem-and-leaf plots can show gaps and clusters through displaying every individual value in \"bins\" of 10s.\n\n**Correct Answer:** D.\n\n**Scoring:** Evaluated out of 1 point",
      sampleAnswer: "D - Stem-and-leaf plot",
    },
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
    scoring: {
      unscoredPractice: false,
      penaltyPoints: 0,
      checkAnswerButton: true,
      checkAnswerAttempts: 1,
      scoringType: "Exact match",
      enableAutoScoring: true,
      minimumPointsIfAttempted: 0,
    },
    layout: {
      style: "Standard",
      numberOfColumns: 1,
      orientation: "Vertical",
      fontSize: "Normal",
      stemNumeration: "Uppercase",
    },
    extras: {
      acknowledgements: "Accountability Guide",
      distractorRationale: "Tests understanding of relationship between mean, median, and distribution shape.",
      rubricReference: "AP-STATS-1.1-B",
      stimulus: "",
      instructorStimulus: "**Answer Analysis:**\nWhen mean < median, the distribution is skewed left (negatively skewed). Lower values pull the mean down.\n\n**Correct Answer:** A.\n\n**Scoring:** Evaluated out of 1 point",
      sampleAnswer: "A - Skewed left",
    },
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
    scoring: {
      unscoredPractice: false,
      penaltyPoints: 0,
      checkAnswerButton: false,
      checkAnswerAttempts: 0,
      scoringType: "Exact match",
      enableAutoScoring: true,
      minimumPointsIfAttempted: 0,
    },
    layout: {
      style: "Standard",
      numberOfColumns: 1,
      orientation: "Vertical",
      fontSize: "Normal",
      stemNumeration: "Numerical",
    },
    extras: {
      acknowledgements: "Accountability Guide",
      distractorRationale: "Assesses understanding of when median is preferred over mean due to outliers.",
      rubricReference: "AP-STATS-1.1-C",
      stimulus: "",
      instructorStimulus: "**Answer Analysis:**\nThe value 88 is an outlier. The median is resistant to outliers and better represents typical values.\n\n**Correct Answer:** B.\n\n**Scoring:** Evaluated out of 1 point",
      sampleAnswer: "B - Median, because of the outlier",
    },
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
    scoring: {
      unscoredPractice: false,
      penaltyPoints: 0,
      checkAnswerButton: false,
      checkAnswerAttempts: 0,
      scoringType: "Exact match",
      enableAutoScoring: true,
      minimumPointsIfAttempted: 0,
    },
    layout: {
      style: "Standard",
      numberOfColumns: 2,
      orientation: "Horizontal",
      fontSize: "Normal",
      stemNumeration: "Lowercase",
    },
    extras: {
      acknowledgements: "Accountability Guide",
      distractorRationale: "Tests understanding of why IQR is considered a resistant measure of spread.",
      rubricReference: "AP-STATS-1.1-D",
      stimulus: "",
      instructorStimulus: "**Answer Analysis:**\nIQR only considers Q1 and Q3 (middle 50%), ignoring extreme values that could be outliers.\n\n**Correct Answer:** C.\n\n**Scoring:** Evaluated out of 1 point",
      sampleAnswer: "C - Only uses the middle 50% of data",
    },
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
    scoring: {
      unscoredPractice: false,
      penaltyPoints: 0,
      checkAnswerButton: true,
      checkAnswerAttempts: 2,
      scoringType: "Exact match",
      enableAutoScoring: true,
      minimumPointsIfAttempted: 0,
    },
    layout: {
      style: "Standard",
      numberOfColumns: 1,
      orientation: "Vertical",
      fontSize: "Normal",
      stemNumeration: "Numerical",
    },
    extras: {
      acknowledgements: "Accountability Guide",
      distractorRationale: "Tests knowledge of symmetric distribution properties.",
      rubricReference: "AP-STATS-1.1-E",
      stimulus: "",
      instructorStimulus: "**Answer Analysis:**\nIn a symmetric (bell-shaped) distribution, the mean, median, and mode are all approximately equal.\n\n**Correct Answer:** A.\n\n**Scoring:** Evaluated out of 1 point",
      sampleAnswer: "A - Mean ≈ Median ≈ Mode",
    },
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
    scoring: {
      unscoredPractice: true,
      penaltyPoints: 0,
      checkAnswerButton: true,
      checkAnswerAttempts: 3,
      scoringType: "Exact match",
      enableAutoScoring: false,
      minimumPointsIfAttempted: 0,
    },
    layout: {
      style: "Block",
      numberOfColumns: 2,
      orientation: "Vertical",
      fontSize: "Large",
      stemNumeration: "Uppercase",
    },
    extras: {
      acknowledgements: "Accountability Guide",
      distractorRationale: "Tests ability to select appropriate graphical displays for comparing distributions.",
      rubricReference: "AP-STATS-1.1-F",
      stimulus: "Consider which display allows comparison of center, spread, and shape simultaneously.",
      instructorStimulus: "**Answer Analysis:**\nSide-by-side boxplots allow easy comparison of center (median), spread (IQR), and identification of outliers between groups.\n\n**Correct Answer:** C.\n\n**Scoring:** Evaluated out of 1 point",
      sampleAnswer: "C - Side-by-side boxplots",
    },
  },
];

interface EditingField {
  questionId: string;
  fieldName: string;
  fieldLabel: string;
  currentValue: string;
}

interface LearnosityAIChatbotProps {
  onGenerateQuestions: (questions: GeneratedQuestion[]) => void;
  onUpdateQuestion?: (questionId: string, updatedQuestion: GeneratedQuestion) => void;
  onUpdateField?: (questionId: string, fieldPath: string, newValue: string) => void;
  courseName: string;
  contentArea: string;
  editingQuestion?: GeneratedQuestion | null;
  editingField?: EditingField | null;
  onClearEditingQuestion?: () => void;
  onClearEditingField?: () => void;
}

type FlowStep = "welcome" | "topic" | "questionType" | "configure" | "generating" | "complete" | "editing" | "updating" | "field-editing" | "field-updating";

export function LearnosityAIChatbot({ 
  onGenerateQuestions,
  onUpdateQuestion,
  onUpdateField,
  courseName,
  contentArea,
  editingQuestion,
  editingField,
  onClearEditingQuestion,
  onClearEditingField
}: LearnosityAIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowStep>("welcome");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle field editing mode
  useEffect(() => {
    if (editingField) {
      setIsOpen(true);
      setMessages([]);
      setCurrentStep("field-editing");
      setTimeout(() => {
        addAssistantMessage(
          `✏️ **Edit ${editingField.fieldLabel}**\n\nCurrent value:\n\n"${editingField.currentValue.substring(0, 150)}${editingField.currentValue.length > 150 ? '...' : ''}"\n\nHow would you like to modify this text?`,
          [
            { label: "Expand with more detail", description: "Add more comprehensive content", icon: <Sparkles className="w-4 h-4" /> },
            { label: "Make it more concise", description: "Shorten and simplify" },
            { label: "Improve clarity", description: "Make it easier to understand" },
            { label: "Rewrite completely", description: "Generate new content" },
          ]
        );
      }, 100);
    }
  }, [editingField]);

  // Handle editing mode when a question is passed
  useEffect(() => {
    if (editingQuestion && !editingField) {
      setIsOpen(true);
      setMessages([]);
      setCurrentStep("editing");
      setTimeout(() => {
        addAssistantMessage(
          `✏️ **Edit Question**\n\nYou're editing:\n\n"${editingQuestion.questionText}"\n\nHow would you like to modify this question?`,
          [
            { label: "Make it harder", description: "Increase difficulty level", icon: <Sparkles className="w-4 h-4" /> },
            { label: "Make it easier", description: "Simplify the question" },
            { label: "Change the topic focus", description: "Adjust what's being tested" },
            { label: "Rewrite completely", description: "Generate a new question" },
          ]
        );
      }, 100);
    }
  }, [editingQuestion, editingField]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !editingQuestion && !editingField) {
      showWelcome();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const showWelcome = () => {
    setCurrentStep("welcome");
    addAssistantMessage(
      `✨ **AI Assessment Generator**\n\nI can help you create assessment questions for **${courseName || 'your course'}** using AI.\n\nWould you like me to generate questions?`,
      [
        { label: "Generate Questions", description: "Create AI-powered assessment items", icon: <Sparkles className="w-4 h-4" /> },
        { label: "Help me decide", description: "I'm not sure what I need" },
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

  const simulateTyping = (callback: () => void, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleAction = (action: SuggestedAction) => {
    addUserMessage(action.label);

    switch (currentStep) {
      case "welcome":
        if (action.label.includes("Generate")) {
          simulateTyping(() => {
            setCurrentStep("topic");
            addAssistantMessage(
              "What topic should these questions cover?",
              [
                { label: "One-Variable Data Analysis", description: "Distributions, histograms, box plots" },
                { label: "Two-Variable Data Analysis", description: "Scatter plots, correlation, regression" },
                { label: "Probability Concepts", description: "Random events, conditional probability" },
                { label: "Sampling & Inference", description: "Confidence intervals, hypothesis testing" },
              ]
            );
          });
        } else {
          simulateTyping(() => {
            addAssistantMessage(
              "I can generate multiple choice, fill-in-the-blank, or written response questions.\n\nFor best results, tell me:\n• The topic or learning objective\n• Question type preference\n• Number of questions needed",
              [
                { label: "Generate Questions", description: "Let's get started", icon: <Sparkles className="w-4 h-4" /> },
              ]
            );
          });
        }
        break;

      case "topic":
        setSelectedTopic(action.label);
        simulateTyping(() => {
          setCurrentStep("questionType");
          addAssistantMessage(
            `Great choice! **${action.label}**.\n\nWhat types of questions would you like to generate?`,
            [
              { label: "Multiple Choice", description: "Single or multiple correct answers", icon: <Check className="w-4 h-4" /> },
              { label: "Fill in the Blanks", description: "Text input or dropdown selections" },
              { label: "Written Response", description: "Short or long form answers" },
              { label: "Mix of All Types", description: "Variety of question formats", icon: <Sparkles className="w-4 h-4" /> },
            ]
          );
        });
        break;

      case "questionType":
        setSelectedQuestionTypes([action.label]);
        simulateTyping(() => {
          setCurrentStep("configure");
          addAssistantMessage(
            `Perfect! I'll create **${action.label}** questions on **${selectedTopic}**.\n\nHow many questions would you like?`,
            [
              { label: "6 questions", description: "Quick assessment" },
              { label: "10 questions", description: "Standard assessment" },
              { label: "15 questions", description: "Comprehensive assessment" },
            ]
          );
        });
        break;

      case "configure":
        simulateTyping(() => {
          setCurrentStep("generating");
          
          const generatingComponent = (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Generating questions...</div>
                  <div className="text-xs text-muted-foreground">Analyzing {selectedTopic || "topic"}</div>
                </div>
              </div>
              <Progress value={35} className="h-1.5" />
            </div>
          );
          
          addAssistantMessage(
            "🤖 AI is generating your assessment...",
            undefined,
            generatingComponent
          );

          // Simulate generation
          setTimeout(() => {
            setCurrentStep("complete");
            
            const successComponent = (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium text-green-700 dark:text-green-300 text-sm">6 questions ready!</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="p-1.5 bg-white/50 dark:bg-black/20 rounded">
                    <div className="font-bold text-green-600">3</div>
                    <div className="text-muted-foreground text-[10px]">Published</div>
                  </div>
                  <div className="p-1.5 bg-white/50 dark:bg-black/20 rounded">
                    <div className="font-bold text-yellow-600">1</div>
                    <div className="text-muted-foreground text-[10px]">Review</div>
                  </div>
                  <div className="p-1.5 bg-white/50 dark:bg-black/20 rounded">
                    <div className="font-bold text-gray-600">2</div>
                    <div className="text-muted-foreground text-[10px]">Draft</div>
                  </div>
                </div>
              </div>
            );
            
            addAssistantMessage(
              "✅ Your assessment is ready!",
              [
                { label: "View Generated Questions", description: "Preview and edit your questions", icon: <ClipboardList className="w-4 h-4" /> },
                { label: "Generate More", description: "Create additional questions" },
              ],
              successComponent
            );
          }, 2500);
        }, 500);
        break;

      case "complete":
        if (action.label.includes("View")) {
          // Trigger the callback to show generated questions
          onGenerateQuestions(SAMPLE_GENERATED_QUESTIONS);
        } else if (action.label.includes("Generate More")) {
          simulateTyping(() => {
            setCurrentStep("topic");
            addAssistantMessage(
              "What topic should the next batch cover?",
              [
                { label: "Same topic (more questions)", description: selectedTopic },
                { label: "Two-Variable Data Analysis", description: "Scatter plots, correlation" },
                { label: "Probability Concepts", description: "Random events" },
              ]
            );
          });
        } else if (action.label.includes("Done Editing")) {
          // Close the chatbot and clear editing state
          setIsOpen(false);
          setMessages([]);
          setCurrentStep("welcome");
          onClearEditingQuestion?.();
        } else if (action.label.includes("Edit Another")) {
          // Clear editing state and close - user can click another question's AI icon
          setIsOpen(false);
          setMessages([]);
          setCurrentStep("welcome");
          onClearEditingQuestion?.();
        }
        break;

      case "field-editing":
        // Handle field edit actions
        simulateTyping(() => {
          setCurrentStep("field-updating");
          
          const updatingComponent = (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Updating {editingField?.fieldLabel}...</div>
                  <div className="text-xs text-muted-foreground">Applying: {action.label}</div>
                </div>
              </div>
              <Progress value={50} className="h-1.5" />
            </div>
          );
          
          addAssistantMessage(
            "🤖 Regenerating text content...",
            undefined,
            updatingComponent
          );

          // Simulate field update
          setTimeout(() => {
            if (editingField && onUpdateField) {
              let newValue = editingField.currentValue;
              
              if (action.label.includes("Expand")) {
                newValue = `${editingField.currentValue}\n\n**Additional Details:**\nThis content has been expanded with more comprehensive information to provide deeper understanding and context for instructors and students alike.`;
              } else if (action.label.includes("concise")) {
                newValue = editingField.currentValue.split('.').slice(0, 2).join('.') + '.';
              } else if (action.label.includes("clarity")) {
                newValue = `**Clarified:** ${editingField.currentValue.replace(/\*\*/g, '')}`;
              } else {
                newValue = `[AI Generated] New content for ${editingField.fieldLabel}: This field has been completely rewritten to provide clearer, more actionable guidance.`;
              }
              
              onUpdateField(editingField.questionId, editingField.fieldName, newValue);
            }
            
            addAssistantMessage(
              `✅ ${editingField?.fieldLabel} updated successfully!`,
              [
                { label: "Edit Another Field", description: "Continue editing", icon: <Sparkles className="w-4 h-4" /> },
                { label: "Done", description: "Close the editor" },
              ]
            );
            setCurrentStep("complete");
          }, 1500);
        }, 500);
        break;

      case "editing":
        // Handle edit actions
        simulateTyping(() => {
          setCurrentStep("updating");
          
          const updatingComponent = (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Updating question...</div>
                  <div className="text-xs text-muted-foreground">Applying: {action.label}</div>
                </div>
              </div>
              <Progress value={50} className="h-1.5" />
            </div>
          );
          
          addAssistantMessage(
            "🤖 Regenerating your question...",
            undefined,
            updatingComponent
          );

          // Simulate update
          setTimeout(() => {
            if (editingQuestion && onUpdateQuestion) {
              // Create updated question (simulated)
              const updatedQuestion: GeneratedQuestion = {
                ...editingQuestion,
                questionText: action.label.includes("harder") 
                  ? `[Advanced] ${editingQuestion.questionText.replace("Which of the following", "Analyze and determine which of the following")}`
                  : action.label.includes("easier")
                  ? editingQuestion.questionText.replace("best display or summarize", "show")
                  : action.label.includes("topic")
                  ? editingQuestion.questionText.replace("gaps and clusters", "central tendency measures")
                  : `A researcher collected data on student test scores. ${editingQuestion.questionText}`,
                status: 'review',
              };
              
              onUpdateQuestion(editingQuestion.id, updatedQuestion);
            }
            
            addAssistantMessage(
              "✅ Question updated successfully!",
              [
                { label: "Edit Another Question", description: "Continue editing", icon: <Sparkles className="w-4 h-4" /> },
                { label: "Done Editing", description: "Close the editor" },
              ]
            );
            setCurrentStep("complete");
          }, 2000);
        }, 500);
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    setInput("");
    addUserMessage(userInput);
    
    // Handle editing mode - use custom prompt
    if (currentStep === "editing" && editingQuestion) {
      simulateTyping(() => {
        setCurrentStep("updating");
        
        const updatingComponent = (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Updating question...</div>
                <div className="text-xs text-muted-foreground">Applying: {userInput}</div>
              </div>
            </div>
            <Progress value={50} className="h-1.5" />
          </div>
        );
        
        addAssistantMessage(
          "🤖 Regenerating your question...",
          undefined,
          updatingComponent
        );

        // Simulate update with custom prompt
        setTimeout(() => {
          if (onUpdateQuestion) {
            const updatedQuestion: GeneratedQuestion = {
              ...editingQuestion,
              questionText: `[Modified] ${editingQuestion.questionText}`,
              status: 'review',
            };
            
            onUpdateQuestion(editingQuestion.id, updatedQuestion);
          }
          
          addAssistantMessage(
            "✅ Question updated successfully!",
            [
              { label: "Edit Another Question", description: "Continue editing", icon: <Sparkles className="w-4 h-4" /> },
              { label: "Done Editing", description: "Close the editor" },
            ]
          );
          setCurrentStep("complete");
        }, 2000);
      }, 500);
      return;
    }
    
    // Treat any input as a custom topic
    if (currentStep === "topic") {
      setSelectedTopic(userInput);
      simulateTyping(() => {
        setCurrentStep("configure");
        addAssistantMessage(
          `Creating questions on **${userInput}**.\n\nHow many questions would you like?`,
          [
            { label: "6 questions", description: "Quick assessment" },
            { label: "10 questions", description: "Standard assessment" },
          ]
        );
      });
    } else {
      simulateTyping(() => {
        addAssistantMessage(
          "I can help you generate assessment questions. What topic would you like to cover?",
          [
            { label: "One-Variable Data Analysis", description: "Distributions, histograms" },
            { label: "Two-Variable Data Analysis", description: "Correlation, regression" },
          ]
        );
        setCurrentStep("topic");
      });
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case "welcome": return 0;
      case "topic": return 25;
      case "questionType": return 50;
      case "configure": return 75;
      case "generating": return 85;
      case "complete": return 100;
      case "editing": return 50;
      case "updating": return 75;
      case "field-editing": return 50;
      case "field-updating": return 75;
      default: return 0;
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg p-0",
          "bg-blue-500 hover:bg-blue-600",
          "text-white"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px]">
      {/* Header */}
      <div className="h-14 bg-primary text-primary-foreground flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assessment Generator</h3>
            <p className="text-xs text-primary-foreground/70">{courseName || 'Create questions with AI'}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>
            {currentStep === "welcome" && "Get started"}
            {currentStep === "topic" && "Select topic"}
            {currentStep === "questionType" && "Question type"}
            {currentStep === "configure" && "Configure"}
            {currentStep === "generating" && "Generating..."}
            {currentStep === "complete" && "Complete!"}
            {currentStep === "editing" && "Edit question"}
            {currentStep === "updating" && "Updating..."}
            {currentStep === "field-editing" && "Edit field"}
            {currentStep === "field-updating" && "Updating field..."}
          </span>
          <span>{getStepProgress()}%</span>
        </div>
        <Progress value={getStepProgress()} className="h-1" />
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 h-[350px]" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}>
              <div className={cn(
                "max-w-[90%] rounded-xl px-3 py-2.5",
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {message.component && (
                  <div className="mt-2">{message.component}</div>
                )}
                
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {message.actions.map((action, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2 h-auto py-2 px-3 bg-background hover:bg-accent text-left"
                        onClick={() => handleAction(action)}
                      >
                        {action.icon}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs">{action.label}</div>
                          {action.description && (
                            <div className="text-[10px] text-muted-foreground truncate">{action.description}</div>
                          )}
                        </div>
                        <ChevronRight className="w-3 h-3 opacity-50 shrink-0" />
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
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Type a topic or question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 h-9 text-sm"
          />
          <Button 
            onClick={handleSend} 
            size="sm" 
            disabled={!input.trim()}
            className="h-9 w-9 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
