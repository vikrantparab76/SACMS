import { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  BookOpen,
  GraduationCap,
  Building2,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FolderNode } from '@/types/assessment';

interface FolderTreeProps {
  node: FolderNode;
  level?: number;
  onSelectFolder?: (node: FolderNode, path: FolderNode[]) => void;
  selectedFolderId?: string;
  parentPath?: FolderNode[];
}

// Check if folder has content items (green items in the reference)
function hasContentItems(node: FolderNode): boolean {
  return (node.contentItems && node.contentItems.length > 0) || false;
}

// Get appropriate icon based on folder name/type
function getFolderIcon(node: FolderNode, isExpanded: boolean, isSelected: boolean) {
  const name = node.name.toLowerCase();
  const iconClass = cn(
    "w-4 h-4 flex-shrink-0 transition-colors",
    isSelected ? "text-primary" : "text-muted-foreground"
  );
  
  // Content Areas (top level subjects)
  if (['english', 'history', 'math', 'science', 'scholar talent'].includes(name)) {
    return <BookOpen className={iconClass} />;
  }
  
  // School levels
  if (name.includes('school')) {
    return <Building2 className={iconClass} />;
  }
  
  // Courses (AP, specific subject courses)
  if (name.startsWith('ap ') || name.includes('grade') || name.includes('ela')) {
    return <GraduationCap className={iconClass} />;
  }
  
  // Learning Sequences folder
  if (name === 'learning sequences') {
    return <Layers className={iconClass} />;
  }
  
  // Default folder icons
  if (isExpanded) {
    return <FolderOpen className={cn(iconClass, isSelected && "text-primary")} />;
  }
  return <Folder className={iconClass} />;
}

export function FolderTree({ 
  node, 
  level = 0, 
  onSelectFolder,
  selectedFolderId,
  parentPath = []
}: FolderTreeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.id === selectedFolderId;
  const hasContent = hasContentItems(node);
  const currentPath = [...parentPath, node];

  // Skip task type nodes - only show folders
  if (node.type === 'task') return null;

  const handleClick = () => {
    // If this folder has content items, select it to show content on the right
    if (hasContent && onSelectFolder) {
      onSelectFolder(node, currentPath);
    }
    
    // Toggle expansion if has children
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  // Calculate if we should show the content indicator
  const showContentIndicator = hasContent;

  return (
    <div className="select-none">
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm transition-all duration-150',
          'hover:bg-accent/50',
          isSelected && 'bg-primary/10 text-primary font-medium',
          level === 0 && 'font-medium'
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {/* Expand/Collapse chevron */}
        <div className="w-4 flex-shrink-0">
          {hasChildren && (
            <div className={cn(
              "transition-transform duration-200",
              isExpanded && "transform rotate-90"
            )}>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
        
        {/* Folder icon */}
        {getFolderIcon(node, isExpanded, isSelected)}
        
        {/* Folder name */}
        <span className={cn(
          'truncate flex-1',
          isSelected && 'text-primary'
        )}>
          {node.name}
        </span>
        
        {/* Content indicator dot */}
        {showContentIndicator && (
          <div className={cn(
            "w-2 h-2 rounded-full flex-shrink-0 transition-colors",
            isSelected ? "bg-primary" : "bg-emerald-500"
          )} />
        )}
      </div>
      
      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="overflow-hidden">
          {node.children?.map((child) => (
            <FolderTree
              key={child.id}
              node={child}
              level={level + 1}
              onSelectFolder={onSelectFolder}
              selectedFolderId={selectedFolderId}
              parentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
