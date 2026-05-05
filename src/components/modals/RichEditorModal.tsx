import { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Paragraph,
  Heading,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Alignment,
  List,
  TodoList,
  Link,
  Image,
  ImageUpload,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageCaption,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  MediaEmbed,
  BlockQuote,
  CodeBlock,
  HorizontalLine,
  Indent,
  IndentBlock,
  Undo,
  SourceEditing,
  GeneralHtmlSupport,
  SpecialCharacters,
  SpecialCharactersMathematical,
  FindAndReplace,
  Subscript,
  Superscript,
  RemoveFormat,
  Highlight,
  PageBreak,
  PasteFromOffice,
  TextTransformation,
  AutoImage,
  Base64UploadAdapter,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Save, Eye, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { ContentItem } from '@/types/assessment';

interface RichEditorModalProps {
  open: boolean;
  onClose: () => void;
  item: ContentItem | null;
  initialContent?: string;
}

export function RichEditorModal({ open, onClose, item, initialContent }: RichEditorModalProps) {
  const [editorContent, setEditorContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Generate demo content based on item or use provided initial content
  useEffect(() => {
    if (item && open) {
      if (initialContent) {
        setEditorContent(initialContent);
      } else {
        const demoContent = generateDemoContent(item);
        setEditorContent(demoContent);
      }
      setLastSaved(new Date());
      setIsDirty(false);
    }
  }, [item, open, initialContent]);

  const handleSave = () => {
    setLastSaved(new Date());
    setIsDirty(false);
    // In real app, would save to backend
  };

  const handleClose = () => {
    if (isDirty) {
      // In real app, would show unsaved changes warning
    }
    onClose();
  };

  if (!item || !open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shadow-sm">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          <div>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-xs">
                {item.type}
              </Badge>
              {lastSaved && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Last saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              {isDirty && (
                <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                  Unsaved changes
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button 
            size="sm" 
            className="gap-1.5"
            onClick={handleSave}
            disabled={!isDirty}
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      {/* CKEditor Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full ck-editor-container">
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            config={{
              licenseKey: 'GPL',
              plugins: [
                Essentials,
                Bold,
                Italic,
                Underline,
                Strikethrough,
                Paragraph,
                Heading,
                FontFamily,
                FontSize,
                FontColor,
                FontBackgroundColor,
                Alignment,
                List,
                TodoList,
                Link,
                Image,
                ImageUpload,
                ImageResize,
                ImageStyle,
                ImageToolbar,
                ImageCaption,
                Table,
                TableToolbar,
                TableProperties,
                TableCellProperties,
                MediaEmbed,
                BlockQuote,
                CodeBlock,
                HorizontalLine,
                Indent,
                IndentBlock,
                Undo,
                SourceEditing,
                GeneralHtmlSupport,
                SpecialCharacters,
                SpecialCharactersMathematical,
                FindAndReplace,
                Subscript,
                Superscript,
                RemoveFormat,
                Highlight,
                PageBreak,
                PasteFromOffice,
                TextTransformation,
                AutoImage,
                Base64UploadAdapter,
              ],
              toolbar: {
                items: [
                  'undo', 'redo',
                  '|',
                  'heading',
                  '|',
                  'fontFamily', 'fontSize',
                  '|',
                  'bold', 'italic', 'underline', 'strikethrough',
                  '|',
                  'fontColor', 'fontBackgroundColor', 'highlight',
                  '|',
                  'alignment',
                  '|',
                  'bulletedList', 'numberedList', 'todoList',
                  '|',
                  'outdent', 'indent',
                  '|',
                  'link', 'insertImage', 'insertTable', 'mediaEmbed',
                  '|',
                  'blockQuote', 'codeBlock', 'horizontalLine',
                  '|',
                  'subscript', 'superscript', 'specialCharacters',
                  '|',
                  'removeFormat',
                  '|',
                  'findAndReplace', 'sourceEditing',
                ],
                shouldNotGroupWhenFull: true,
              },
              heading: {
                options: [
                  { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                  { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                  { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                  { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                  { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                ],
              },
              fontFamily: {
                options: [
                  'default',
                  'Arial, Helvetica, sans-serif',
                  'Georgia, serif',
                  'Lucida Sans Unicode, Lucida Grande, sans-serif',
                  'Tahoma, Geneva, sans-serif',
                  'Times New Roman, Times, serif',
                  'Trebuchet MS, Helvetica, sans-serif',
                  'Verdana, Geneva, sans-serif',
                  'Courier New, Courier, monospace',
                ],
              },
              fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 24, 28, 32, 36],
              },
              image: {
                toolbar: [
                  'imageStyle:inline',
                  'imageStyle:wrapText',
                  'imageStyle:breakText',
                  '|',
                  'toggleImageCaption',
                  'imageTextAlternative',
                ],
              },
              table: {
                contentToolbar: [
                  'tableColumn', 'tableRow', 'mergeTableCells',
                  'tableProperties', 'tableCellProperties',
                ],
              },
              placeholder: 'Start typing your content here...',
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
              setIsDirty(true);
            }}
            onReady={(editor) => {
              // Focus the editor when ready
              editor.editing.view.focus();
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-card flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          <span>CKEditor 5 • </span>
          <span className="font-medium">Modern WYSIWYG Editor</span>
          <span> • Rich formatting, tables, images, and more</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => { handleSave(); handleClose(); }} disabled={!isDirty}>
            <CheckCircle className="w-4 h-4 mr-1.5" />
            Save & Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// Generate demo content based on item type
function generateDemoContent(item: ContentItem): string {
  // Check for Program Vision specifically
  if (item.id === 'cag-program-vision') {
    return getProgramVisionContent();
  }
  
  const isTask = item.type === 'task' || item.type === 'assessment';
  const isOverview = item.type === 'overview' || item.type === 'sequence-overview';
  
  if (isTask) {
    return `
      <h2>${item.name}</h2>
      <p>This assessment contains <strong>${item.questionCount || 10} questions</strong> designed to evaluate student understanding of key concepts.</p>
      
      <h3>Learning Objectives</h3>
      <ul>
        <li>Understand fundamental concepts and their applications</li>
        <li>Apply knowledge to solve real-world problems</li>
        <li>Analyze data and draw meaningful conclusions</li>
        <li>Communicate mathematical reasoning effectively</li>
      </ul>
      
      <h3>Instructions for Students</h3>
      <ol>
        <li>Read each question carefully before answering</li>
        <li>Show all work for full credit on extended response questions</li>
        <li>Check your answers before submitting</li>
        <li>You may use a calculator for designated questions</li>
      </ol>
      
      <blockquote>
        <p><strong>Note:</strong> This assessment is timed. Students have 45 minutes to complete all questions.</p>
      </blockquote>
      
      <h3>Standards Alignment</h3>
      <p>This task aligns with the following standards:</p>
      <table>
        <thead>
          <tr>
            <th>Standard Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>CCSS.MATH.CONTENT</code></td>
            <td>Apply mathematical concepts to real-world scenarios</td>
          </tr>
          <tr>
            <td><code>AP.STATISTICS.1.1</code></td>
            <td>Describe patterns in data distributions</td>
          </tr>
        </tbody>
      </table>
      
      ${item.learnosityId ? `<p><strong>Learnosity ID:</strong> <code>${item.learnosityId}</code></p>` : ''}
    `;
  }
  
  if (isOverview) {
    return `
      <h1>${item.name}</h1>
      <p>${item.description || 'This section provides an overview of the learning sequence.'}</p>
      
      <h2>Sequence Overview</h2>
      <p>This learning sequence introduces students to key concepts and builds foundational skills necessary for advanced study. Through a combination of direct instruction, guided practice, and independent exploration, students will develop a deep understanding of the material.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Concept 1:</strong> Introduction to foundational principles</li>
        <li><strong>Concept 2:</strong> Applying knowledge in context</li>
        <li><strong>Concept 3:</strong> Analyzing patterns and relationships</li>
        <li><strong>Concept 4:</strong> Synthesizing information</li>
      </ul>
      
      <h3>Learning Progression</h3>
      <p>Students will progress through the following stages:</p>
      <ol>
        <li>Exploration and discovery</li>
        <li>Concept development</li>
        <li>Guided practice</li>
        <li>Independent application</li>
        <li>Assessment and reflection</li>
      </ol>
      
      <h3>Materials Needed</h3>
      <ul>
        <li>Student workbook</li>
        <li>Calculator (graphing recommended)</li>
        <li>Graph paper</li>
        <li>Colored pencils</li>
      </ul>
    `;
  }
  
  return `
    <h2>${item.name}</h2>
    <p>${item.description || 'Content for this section.'}</p>
    
    <h3>Overview</h3>
    <p>This document contains comprehensive information about the topic, including key concepts, examples, and practice opportunities for students.</p>
    
    <h3>Content Details</h3>
    <p>Detailed content will be displayed here, including:</p>
    <ul>
      <li>Key concepts and definitions</li>
      <li>Examples and illustrations</li>
      <li>Practice problems</li>
      <li>Additional resources</li>
    </ul>
    
    <h3>Notes</h3>
    <blockquote>
      <p>This content was last updated on ${item.lastUpdated || 'Jan 2026'}.</p>
    </blockquote>
  `;
}

// Program Vision content from the PDF with exact styling
function getProgramVisionContent(): string {
  return `
<p><em>Conrad Wolfram, the European cofounder &amp; CEO of Wolfram Research, has charged educators to stop teaching calculating and start teaching math.</em></p>

<p>Success Academy's math program celebrates the beauty of mathematics, its inherent structure and certainty, alongside its far-reaching practical applications. Cultivating an appreciation of and expertise in math requires a definition of the subject, like Conrad Wolfram's, that extends far beyond simple arithmetic.</p>

<h2 style="color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 8px; margin-top: 32px;">Characteristics of Highly Prepared Scholars:</h2>

<p>Highly prepared math scholars have the following characteristics.</p>

<h3 style="color: #2563eb; margin-top: 24px;">1. Intellectual stamina and grit</h3>
<ol type="a" style="margin-left: 20px;">
  <li>Comfort working through challenging problems that do not have an obvious entry point</li>
  <li>Confidence to attempt methods or pathways without knowing if they will ultimately be successful</li>
  <li>Persistence to remain focused on the end goal, even when problems require prolonged thinking over multiple hours or days</li>
  <li>Enjoyment of challenge and a competitiveness to not let the problem "win"</li>
  <li>Motivation to explore advanced topics independently</li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">2. Skilled at problem solving, logic and reasoning, analysis, modeling, and unconventional thinking</h3>
<ol type="a" style="margin-left: 20px;">
  <li><strong>Problem solving:</strong> Conceptualizing the problem at hand, filtering out irrelevant details, and drawing on necessary information and tools.</li>
  <li><strong>Logic and reasoning:</strong> Methodically determining and working through a series of steps that are logically sound based on theorems, properties, facts, and/or relationships.</li>
  <li><strong>Analysis:</strong> Identifying patterns or relationships between quantities.</li>
  <li><strong>Modeling:</strong> Quantifying and representing the world using data, models, variables, and graphs.</li>
  <li><strong>Unconventional thinking:</strong> Identifying connections others might overlook in service of solving complex problems and understanding new concepts.</li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">3. Core knowledge with conceptual understanding</h3>
<ol type="a" style="margin-left: 20px;">
  <li><strong>Valuing more than the "answer":</strong> Understanding mathematics as the search for structure, relationships, and equivalence.</li>
  <li><strong>Theorizing about patterns:</strong> In service of synthesizing their understanding of new concepts.</li>
  <li><strong>Having proficiency with core knowledge:</strong> From select college-level courses as well as all standard high school math courses.</li>
  <li><strong>Possessing fluency:</strong> That is grounded in a strong grasp of the "why" behind computational procedures.</li>
  <li><strong>Being able to meet computational fluency standards:</strong> Of each course (e.g., solving x problems of this skill in under y minutes).</li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">4. Ability to collaborate</h3>
<ol type="a" style="margin-left: 20px;">
  <li><strong>Having self-awareness:</strong> Of what they are confused about so that they can productively learn from their peers (e.g., asking targeted questions; recognizing how their thinking differs from someone else).</li>
  <li><strong>Listening to others:</strong> With a desire to understand their way of thinking.</li>
  <li><strong>Viewing other scholars:</strong> As sources of knowledge and being able to leverage others to address gaps in their thought process.</li>
  <li><strong>Working with others:</strong> On long-term, open-ended problems.</li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">5. Oral and written communication skills</h3>
<ol type="a" style="margin-left: 20px;">
  <li><strong>Effective representation and communication of reasoning:</strong>
    <ul style="margin-left: 20px; margin-top: 8px;">
      <li>Arguments, whether oral or written, are clear and organized such that anyone else can follow the thought process.</li>
      <li>Mathematical ideas are expressed as complete thoughts that are supported with evidence.</li>
    </ul>
  </li>
  <li><strong>Ability to discover lapses in thinking and revise work</strong></li>
</ol>

<hr style="margin: 32px 0; border-color: #e5e7eb;" />

<h2 style="color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 8px;">Characteristics of an Exemplary Program:</h2>

<p>An exemplary Math program that achieves the above must:</p>

<h3 style="color: #2563eb; margin-top: 24px;">1. Develop intellectual stamina and grit</h3>
<ol type="a" style="margin-left: 20px;">
  <li>Provide a collegiate experience beginning in high school:
    <ul style="margin-left: 20px; margin-top: 8px;">
      <li>Offer an AP Calculus BC course beginning in Grade 10 for our prepared and highly prepared math scholars</li>
      <li>Include high school electives (Linear Algebra, Game Theory, etc.) that will ensure that college is not the first time scholars encounter advanced math topics</li>
    </ul>
  </li>
  <li>View middle school math as a crucial time to develop the math culture and problem-solving habits needed for success in upper-level math courses</li>
  <li>Pose challenging and novel problems to be solved over prolonged periods of time (multiple hours or days)</li>
  <li>Encourage scholars to take intellectual risks (e.g., try a pathway even if they do not know if it will work; challenge commonly held assumptions about math), learn from mistakes, and self-correct before teacher intervention</li>
  <li>Create a culture of competitive joy around math (formally through external competitions and informally by celebrating scholars who tackle "juicy" problems)</li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">2. Develop problem solving, logic and reasoning, analysis, modeling, and unconventional thinking</h3>
<ol type="a" style="margin-left: 20px;">
  <li>Incorporate both abstract problems that demand logical and proof-based thinking and real-world applications that require modeling</li>
  <li>Value multiple ways of arriving at the solution</li>
  <li>Prioritize discussing the reasoning, not just the answer, to help scholars develop as creative problem solvers</li>
  <li>Hold scholars accountable for evaluating the quality and accuracy of their own work</li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">3. Develop core knowledge with conceptual understanding</h3>
<ol type="a" style="margin-left: 20px;">
  <li>Prioritize conceptual understanding and the "why" behind facts and procedures</li>
  <li>Limit the amount of materials provided to allow for depth of conceptual understanding, not content coverage</li>
  <li>Provide materials that emphasize mathematics as the search for structure, relationships, and equivalence</li>
  <li>Set rigorous goals related to computational fluency (e.g., solving x problems of this skill in under y minutes) to ensure that scholars have the skills needed to be successful on high-stakes exams (PSAT, SAT, and APs) and in college-level math courses</li>
  <li>Minimize the amount of time spent reteaching content:
    <ul style="margin-left: 20px; margin-top: 8px;">
      <li>Minimize the time between each step in the learning process. Scholars are exposed to a topic, they develop conceptual understanding, they become computationally fluent, and then they are asked to apply that understanding and fluency to learn a more advanced topic.</li>
      <li>Provide structures for scholars to independently review previously learned material</li>
    </ul>
  </li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">4. Create the need for peer-to-peer collaboration at all levels</h3>
<ol type="a" style="margin-left: 20px;">
  <li>Content materials provide problems that are worthy of collaboration (e.g., rigorous, multiple possible approaches, and no one correct answer).</li>
  <li>Minimized reteaching results in a need for scholars to leverage each other as a resource to address content gaps.</li>
  <li>In upper grades, scholars have collaborative assignments that take place outside school and over a longer time period.</li>
  <li>Prepared and highly prepared scholars are able to serve as peer-leaders to help address knowledge gaps.</li>
</ol>

<h3 style="color: #2563eb; margin-top: 24px;">5. Develop oral and written communication skills</h3>
<ol type="a" style="margin-left: 20px;">
  <li>Require clear, concise, and convincing communication in all math classrooms.</li>
  <li>Evaluate work holistically, making sure the pathway from problem to answer is clear.</li>
  <li>Hold scholars accountable for using appropriate language, facts, properties and relationships when explaining their ideas.</li>
  <li>Hold scholars accountable for precisely articulating their thinking:
    <ul style="margin-left: 20px; margin-top: 8px;">
      <li>Scholars should be able to state what they are confused by, what they learned from errors made, how their thinking has evolved following discussions, and what new questions they have.</li>
    </ul>
  </li>
</ol>

<hr style="margin: 32px 0; border-color: #e5e7eb;" />

<h2 style="color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 8px;">Purpose of Math, Science, Computer Science, and Engineering:</h2>

<p>The purpose of the study of Math, Science, Computer Science, and Engineering:</p>

<ol style="margin-left: 20px;">
  <li>Conceptualizing quantitative relationships and thinking logically to solve problems.</li>
  <li>Modeling quantitative relationships to explain observable patterns.</li>
  <li>Joy in persisting to solve hard problems.</li>
  <li>Curiosity about how things work.</li>
</ol>

<p style="color: #6b7280; font-style: italic; margin-top: 32px;">Last updated: January 21, 2026</p>
  `;
}
