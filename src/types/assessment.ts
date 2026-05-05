export interface Assessment {
  id: string;
  title: string;
  subject: string;
  gradeBand: string;
  grade: string;
  course: string;
  learningSequence: string;
  learningSequenceCode: string;
  taskType: string;
  questionCount: number;
  standards: string;
  lastUpdated: string;
  estimatedTime: number;
  usageCount: number;
  learnosityId: string;
}

export type ContentType = 
  | 'content-area-guide' 
  | 'course-guide' 
  | 'sequence-overview' 
  | 'sequence-content' 
  | 'overview'
  | 'task' 
  | 'nhm' 
  | 'scholar-work' 
  | 'assessment'
  | 'folder'
  | 'content-screen';

export interface ContentItem {
  id: string;
  name: string;
  type: ContentType;
  description?: string;
  questionCount?: number;
  lastUpdated?: string;
  learnosityId?: string;
  usageCount?: number;
}

export interface FolderNode {
  id: string;
  name: string;
  type: 'folder' | 'task' | 'content';
  contentType?: ContentType;
  children?: FolderNode[];
  assessment?: Assessment;
  contentItems?: ContentItem[];
}

export interface FilterState {
  subjects: string[];
  gradeBands: string[];
  grades: string[];
  courses: string[];
  learningSequences: string[];
}

export interface Course {
  id: string;
  name: string;
  section: string;
}

export interface PlacementOption {
  id: string;
  name: string;
  code: string;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
  node: FolderNode;
}
