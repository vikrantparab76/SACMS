import { useState } from 'react';
import { 
  Eye, 
  Plus, 
  FileText, 
  BookOpen, 
  ClipboardList, 
  Layers, 
  Calculator, 
  Users,
  Pencil,
  MoreHorizontal,
  Copy,
  Archive,
  History,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderPlus,
  MonitorPlay,
  MessageSquare,
  FileBox,
  Zap,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RichEditorModal } from '@/components/modals/RichEditorModal';
import { ItemPublishModal } from '@/components/modals/ItemPublishModal';
import { ContentItem, ContentType, FolderNode } from '@/types/assessment';
import { cn } from '@/lib/utils';

interface ContentPanelProps {
  folder: FolderNode | null;
  breadcrumbs: FolderNode[];
  onPreview: (item: ContentItem) => void;
  onAddToCourse: (item: ContentItem) => void;
  addedItems?: ContentItem[];
  onLaunchLearnosity?: () => void;
}

// Content status for CMS demo
type ContentStatus = 'published' | 'draft' | 'review';

function getContentStatus(item: ContentItem): ContentStatus {
  // Demo logic - based on usage count or random
  if (item.usageCount && item.usageCount > 40) return 'published';
  if (item.usageCount && item.usageCount > 20) return 'review';
  return 'draft';
}

function getStatusBadge(status: ContentStatus) {
  switch (status) {
    case 'published':
      return { label: 'Published', icon: CheckCircle2, className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    case 'review':
      return { label: 'In Review', icon: Clock, className: 'bg-amber-100 text-amber-700 border-amber-200' };
    case 'draft':
      return { label: 'Draft', icon: AlertCircle, className: 'bg-secondary text-muted-foreground border-border' };
  }
}

// Get icon for content type
function getContentIcon(type: ContentType) {
  const iconClass = "w-4 h-4";
  switch (type) {
    case 'content-area-guide':
      return <BookOpen className={iconClass} />;
    case 'course-guide':
      return <FileText className={iconClass} />;
    case 'sequence-overview':
    case 'sequence-content':
    case 'overview':
      return <Layers className={iconClass} />;
    case 'task':
      return <ClipboardList className={iconClass} />;
    case 'nhm':
      return <Calculator className={iconClass} />;
    case 'scholar-work':
      return <Users className={iconClass} />;
    case 'assessment':
      return <FileText className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
}

// Get badge color for content type
function getContentTypeBadge(type: ContentType) {
  switch (type) {
    case 'content-area-guide':
      return { label: 'Guide', variant: 'secondary' as const };
    case 'course-guide':
      return { label: 'Course', variant: 'secondary' as const };
    case 'sequence-overview':
      return { label: 'Overview', variant: 'outline' as const };
    case 'sequence-content':
      return { label: 'Content', variant: 'outline' as const };
    case 'overview':
      return { label: 'Overview', variant: 'outline' as const };
    case 'task':
      return { label: 'Task', variant: 'default' as const };
    case 'nhm':
      return { label: 'NHM', variant: 'secondary' as const };
    case 'scholar-work':
      return { label: 'Scholar Work', variant: 'secondary' as const };
    case 'assessment':
      return { label: 'Assessment', variant: 'default' as const };
    default:
      return { label: 'Content', variant: 'outline' as const };
  }
}

// Random version numbers for demo
function getVersion(id: string) {
  const versions = ['v1.0', 'v1.1', 'v1.2', 'v2.0', 'v2.1', 'v3.0'];
  const index = id.charCodeAt(0) % versions.length;
  return versions[index];
}

// Random editors for demo
function getLastEditor(id: string) {
  const editors = ['Sarah M.', 'John D.', 'Emily R.', 'Michael T.', 'Lisa K.'];
  const index = id.charCodeAt(id.length - 1) % editors.length;
  return editors[index];
}

function ContentCard({ item, onPreview, onAddToCourse, onEdit, onPublish }: { 
  item: ContentItem; 
  onPreview: (item: ContentItem) => void;
  onAddToCourse: (item: ContentItem) => void;
  onEdit: (item: ContentItem) => void;
  onPublish: (item: ContentItem) => void;
}) {
  const typeBadge = getContentTypeBadge(item.type);
  const status = getContentStatus(item);
  const statusBadge = getStatusBadge(status);
  const StatusIcon = statusBadge.icon;
  
  return (
    <div className={cn(
      "group p-3 rounded-lg border bg-card",
      "hover:shadow-md transition-all duration-200",
      status === 'published' && "border-emerald-200/70",
      status === 'review' && "border-amber-200/70",
      status === 'draft' && "border-border"
    )}>
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={cn(
          "p-2 rounded-lg shrink-0",
          status === 'published' ? "bg-emerald-50 text-emerald-600" : 
          status === 'review' ? "bg-amber-50 text-amber-600" :
          "bg-secondary text-muted-foreground"
        )}>
          {getContentIcon(item.type)}
        </div>
        
        {/* Content - simplified */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground truncate">{item.name}</h4>
            <Badge variant={typeBadge.variant} className="text-xs shrink-0">
              {typeBadge.label}
            </Badge>
            <div className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border shrink-0",
              statusBadge.className
            )}>
              <StatusIcon className="w-3 h-3" />
              {statusBadge.label}
            </div>
          </div>
          
          {/* Minimal metadata - only show question count for tasks */}
          {item.questionCount && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {item.questionCount} questions
            </p>
          )}
          {!item.questionCount && item.description && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {item.description}
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onPreview(item)}
            className="h-8 gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onEdit(item)}
            title="Edit content"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onPublish(item)}>
                <Upload className="w-4 h-4 mr-2" />
                Publish to LMS
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onAddToCourse(item)}>
                <Plus className="w-4 h-4 mr-2" />
                Add to Course
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <History className="w-4 h-4 mr-2" />
                Version History
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export function ContentPanel({ folder, breadcrumbs, onPreview, onAddToCourse, addedItems = [], onLaunchLearnosity }: ContentPanelProps) {
  const [editorItem, setEditorItem] = useState<ContentItem | null>(null);
  const [publishItem, setPublishItem] = useState<ContentItem | null>(null);

  // Show added items when no folder is selected
  if (!folder || !folder.contentItems || folder.contentItems.length === 0) {
    if (addedItems.length > 0) {
      // Show added items from Assessment Author
      return (
        <div className="h-full flex flex-col">
          <div className="border-b border-border pb-5 mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Added Assessments</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {addedItems.length} item{addedItems.length !== 1 ? 's' : ''} added from Assessment Author
            </p>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {addedItems.map(item => (
              <ContentCard 
                key={item.id} 
                item={item} 
                onPreview={onPreview}
                onAddToCourse={onAddToCourse}
                onEdit={setEditorItem}
                onPublish={setPublishItem}
              />
            ))}
          </div>
          <RichEditorModal
            open={!!editorItem}
            onClose={() => setEditorItem(null)}
            item={editorItem}
          />
          <ItemPublishModal
            open={!!publishItem}
            onClose={() => setPublishItem(null)}
            item={publishItem}
          />
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary/40" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Select Content to Manage</h3>
          <p className="text-sm leading-relaxed">
            Navigate the curriculum structure and select a folder with 
            <span className="inline-flex items-center mx-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mx-1" />
            </span>
            indicator to view and manage assessments, guides, and learning resources.
          </p>
        </div>
      </div>
    );
  }

  const contentItems = folder.contentItems;
  
  // Count by status
  const publishedCount = contentItems.filter(i => getContentStatus(i) === 'published').length;
  const reviewCount = contentItems.filter(i => getContentStatus(i) === 'review').length;
  const draftCount = contentItems.filter(i => getContentStatus(i) === 'draft').length;

  return (
    <div className="h-full flex flex-col">
      {/* Header with breadcrumbs */}
      <div className="border-b border-border pb-5 mb-6">
        {/* Breadcrumb trail */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 flex-wrap">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.id} className="flex items-center gap-1.5">
              {index > 0 && <span className="text-muted-foreground/40">/</span>}
              <span className={cn(
                "hover:text-foreground cursor-pointer transition-colors",
                index === breadcrumbs.length - 1 && "text-foreground font-medium"
              )}>
                {crumb.name}
              </span>
            </span>
          ))}
        </div>
        
        {/* Title and stats */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{folder.name}</h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-muted-foreground">
                {contentItems.length} item{contentItems.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {publishedCount} published
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {reviewCount} in review
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  {draftCount} draft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content list */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {contentItems.map(item => (
          <ContentCard 
            key={item.id} 
            item={item} 
            onPreview={onPreview}
            onAddToCourse={onAddToCourse}
            onEdit={setEditorItem}
            onPublish={setPublishItem}
          />
        ))}
        
        {/* Added items from Assessment Author */}
        {addedItems.length > 0 && (
          <>
            <div className="pt-4 pb-2 border-t border-dashed border-border mt-4">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Added from Assessment Author
              </p>
            </div>
            {addedItems.map(item => (
              <ContentCard 
                key={item.id} 
                item={item} 
                onPreview={onPreview}
                onAddToCourse={onAddToCourse}
                onEdit={setEditorItem}
                onPublish={setPublishItem}
              />
            ))}
          </>
        )}
      </div>

      {/* Rich Editor Modal */}
      <RichEditorModal
        open={!!editorItem}
        onClose={() => setEditorItem(null)}
        item={editorItem}
      />

      {/* Item Publish Modal */}
      <ItemPublishModal
        open={!!publishItem}
        onClose={() => setPublishItem(null)}
        item={publishItem}
      />
    </div>
  );
}
