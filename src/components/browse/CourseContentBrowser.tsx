import { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  BookOpen,
  FileText,
  Layers,
  ClipboardList,
  ArrowLeft,
  Zap,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FolderNode, ContentItem } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface CourseContentBrowserProps {
  courseName: string;
  courseStructure: FolderNode;
  onBack: () => void;
  onSelectContent: (items: ContentItem[], breadcrumbs: string[]) => void;
}

// Content type icon mapping
function getContentIcon(type: string) {
  const iconClass = "w-4 h-4";
  switch (type) {
    case 'sequence-overview':
    case 'sequence-content':
    case 'overview':
      return <Layers className={iconClass} />;
    case 'task':
    case 'assessment':
      return <ClipboardList className={iconClass} />;
    case 'content-area-guide':
    case 'course-guide':
      return <BookOpen className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
}

interface TreeNodeProps {
  node: FolderNode;
  level: number;
  breadcrumbs: string[];
  onSelectContent: (items: ContentItem[], breadcrumbs: string[]) => void;
}

function TreeNode({ node, level, breadcrumbs, onSelectContent }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const hasContent = node.contentItems && node.contentItems.length > 0;
  const currentBreadcrumbs = [...breadcrumbs, node.name];

  // Skip task type nodes
  if (node.type === 'task') return null;

  const handleClick = () => {
    if (hasContent) {
      onSelectContent(node.contentItems!, currentBreadcrumbs);
    }
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm transition-all",
          "hover:bg-accent/50",
          hasContent && "hover:bg-emerald-50"
        )}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleClick}
      >
        {/* Expand chevron */}
        <div className="w-4 flex-shrink-0">
          {hasChildren && (
            <div className={cn(
              "transition-transform duration-200",
              isExpanded && "rotate-90"
            )}>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
        
        {/* Folder icon */}
        {isExpanded ? (
          <FolderOpen className="w-4 h-4 text-primary flex-shrink-0" />
        ) : (
          <Folder className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
        
        {/* Name */}
        <span className="truncate flex-1">{node.name}</span>
        
        {/* Content indicator */}
        {hasContent && (
          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
        )}
      </div>
      
      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              breadcrumbs={currentBreadcrumbs}
              onSelectContent={onSelectContent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CourseContentBrowser({ 
  courseName, 
  courseStructure, 
  onBack,
  onSelectContent 
}: CourseContentBrowserProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mb-3 -ml-2 h-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Courses
        </Button>
        <h2 className="text-lg font-semibold text-foreground">{courseName}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Browse course structure
        </p>
      </div>
      
      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Course-level content items */}
        {courseStructure.contentItems && courseStructure.contentItems.length > 0 && (
          <div className="px-3 mb-2">
            {courseStructure.contentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm bg-emerald-50 hover:bg-emerald-100 transition-colors mb-1"
                onClick={() => onSelectContent([item], [courseName])}
              >
                {getContentIcon(item.type)}
                <span className="truncate">{item.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 ml-auto" />
              </div>
            ))}
          </div>
        )}
        
        {/* Children folders */}
        {courseStructure.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            level={0}
            breadcrumbs={[courseName]}
            onSelectContent={onSelectContent}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="p-4 border-t border-border bg-background/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Viewable content</span>
        </div>
      </div>
    </div>
  );
}
