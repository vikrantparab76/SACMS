import { Assessment, FolderNode, Course, PlacementOption, ContentItem } from '@/types/assessment';

export const assessments: Assessment[] = [
  {
    id: '1',
    title: 'Exploring One-Variable Data',
    subject: 'Math',
    gradeBand: 'High School',
    grade: 'HS',
    course: 'AP Statistics',
    learningSequence: 'Exploring One-Variable Data',
    learningSequenceCode: '1.1',
    taskType: 'Assessment',
    questionCount: 12,
    standards: 'AP Statistics – Data Analysis',
    lastUpdated: 'Jan 2026',
    estimatedTime: 25,
    usageCount: 47,
    learnosityId: 'LEARN-AP-STAT-1101',
  },
  {
    id: '2',
    title: 'Dotplots & Histograms',
    subject: 'Math',
    gradeBand: 'High School',
    grade: 'HS',
    course: 'AP Statistics',
    learningSequence: 'Exploring One-Variable Data',
    learningSequenceCode: '1.1',
    taskType: 'Assessment',
    questionCount: 8,
    standards: 'AP Statistics – Data Analysis',
    lastUpdated: 'Dec 2025',
    estimatedTime: 15,
    usageCount: 32,
    learnosityId: 'LEARN-AP-STAT-1102',
  },
  {
    id: '3',
    title: 'Mean vs Median',
    subject: 'Math',
    gradeBand: 'High School',
    grade: 'HS',
    course: 'AP Statistics',
    learningSequence: 'Exploring One-Variable Data',
    learningSequenceCode: '1.1',
    taskType: 'Assessment',
    questionCount: 10,
    standards: 'AP Statistics – Data Analysis',
    lastUpdated: 'Jan 2026',
    estimatedTime: 20,
    usageCount: 28,
    learnosityId: 'LEARN-AP-STAT-1103',
  },
  {
    id: '4',
    title: 'Outliers & Spread',
    subject: 'Math',
    gradeBand: 'High School',
    grade: 'HS',
    course: 'AP Statistics',
    learningSequence: 'Exploring One-Variable Data',
    learningSequenceCode: '1.1',
    taskType: 'Assessment',
    questionCount: 9,
    standards: 'AP Statistics – Data Analysis',
    lastUpdated: 'Nov 2025',
    estimatedTime: 18,
    usageCount: 19,
    learnosityId: 'LEARN-AP-STAT-1104',
  },
  {
    id: '5',
    title: 'Describing Distributions',
    subject: 'Math',
    gradeBand: 'High School',
    grade: 'HS',
    course: 'AP Statistics',
    learningSequence: 'Describing Distributions',
    learningSequenceCode: '1.2',
    taskType: 'Assessment',
    questionCount: 14,
    standards: 'AP Statistics – Data Analysis',
    lastUpdated: 'Jan 2026',
    estimatedTime: 30,
    usageCount: 41,
    learnosityId: 'LEARN-AP-STAT-1201',
  },
  {
    id: '6',
    title: 'Linear Equations Review',
    subject: 'Math',
    gradeBand: 'Middle School',
    grade: '8',
    course: 'Pre-Algebra',
    learningSequence: 'Linear Relationships',
    learningSequenceCode: '3.1',
    taskType: 'Assessment',
    questionCount: 15,
    standards: 'CCSS.MATH.8.EE',
    lastUpdated: 'Dec 2025',
    estimatedTime: 25,
    usageCount: 56,
    learnosityId: 'LEARN-MS-MATH-0301',
  },
  {
    id: '7',
    title: 'Reading Comprehension: Informational Text',
    subject: 'ELA',
    gradeBand: 'Middle School',
    grade: '7',
    course: 'English Language Arts 7',
    learningSequence: 'Informational Text Analysis',
    learningSequenceCode: '2.3',
    taskType: 'Assessment',
    questionCount: 18,
    standards: 'CCSS.ELA-LITERACY.RI.7',
    lastUpdated: 'Jan 2026',
    estimatedTime: 35,
    usageCount: 63,
    learnosityId: 'LEARN-ELA-07-0203',
  },
  {
    id: '8',
    title: 'Scientific Method Assessment',
    subject: 'Science',
    gradeBand: 'High School',
    grade: 'HS',
    course: 'Biology',
    learningSequence: 'Introduction to Biology',
    learningSequenceCode: '1.1',
    taskType: 'Assessment',
    questionCount: 12,
    standards: 'NGSS HS-LS1',
    lastUpdated: 'Nov 2025',
    estimatedTime: 22,
    usageCount: 38,
    learnosityId: 'LEARN-SCI-BIO-0101',
  },
];

// Content items for Learning Sequences - these are the green highlighted items
const apStatsLS1ContentItems: ContentItem[] = [
  { id: 'ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', description: 'Overview of 1.1 Exploring One-Variable Data', lastUpdated: 'Jan 2026' },
  { id: 'ls1-content', name: 'Sequence Content', type: 'sequence-content', description: 'Detailed content and materials', lastUpdated: 'Jan 2026' },
  { id: 'ls1-intro', name: 'Overview', type: 'overview', description: 'Introduction to concepts', lastUpdated: 'Jan 2026' },
  { id: 'ls1-task1', name: 'Math_HS_AP_Statistics_LS_1.1_Exploring_One-Variable_Data_Task 1', type: 'task', questionCount: 4, learnosityId: 'LEARN-AP-STAT-1101', usageCount: 47, lastUpdated: '10 hours ago' },
  { id: 'ls1-task2', name: 'Math_HS_AP_Statistics_LS_1.1_Exploring_One-Variable_Data_Task 2', type: 'task', questionCount: 5, learnosityId: 'LEARN-AP-STAT-1102', usageCount: 32, lastUpdated: '10 hours ago' },
];

const apStatsLS2ContentItems: ContentItem[] = [
  { id: 'ls2-overview', name: 'Sequence Overview', type: 'sequence-overview', description: 'Overview of 1.2 Exploring Two-Variable Data', lastUpdated: 'Jan 2026' },
  { id: 'ls2-content', name: 'Sequence Content', type: 'sequence-content', description: 'Detailed content and materials', lastUpdated: 'Jan 2026' },
  { id: 'ls2-task1', name: 'Math_HS_AP_Statistics_LS_1.2_Exploring_Two-Variable_Data_Task 1', type: 'task', questionCount: 3, learnosityId: 'LEARN-AP-STAT-1201', usageCount: 41, lastUpdated: '3 hours ago' },
  { id: 'ls2-task2', name: 'Math_HS_AP_Statistics_LS_1.2_Exploring_Two-Variable_Data_Task 2', type: 'task', questionCount: 5, learnosityId: 'LEARN-AP-STAT-1202', usageCount: 35, lastUpdated: '22 hours ago' },
  { id: 'ls2-task3', name: 'Math_HS_AP_Statistics_LS_1.2_Exploring_Two-Variable_Data_Task 3', type: 'task', questionCount: 4, learnosityId: 'LEARN-AP-STAT-1203', usageCount: 28, lastUpdated: '7 hours ago' },
];

const apStatsLS21ContentItems: ContentItem[] = [
  { id: 'ls21-overview', name: 'Sequence Overview', type: 'sequence-overview', description: 'Overview of 2.1 Collecting Data', lastUpdated: 'Jan 2026' },
  { id: 'ls21-content', name: 'Sequence Content', type: 'sequence-content', description: 'Detailed content and materials', lastUpdated: 'Jan 2026' },
  { id: 'ls21-task1', name: 'Math_HS_AP_Statistics_LS_2.1_Collecting_Data_Task 1', type: 'task', questionCount: 5, learnosityId: 'LEARN-AP-STAT-2101', usageCount: 20, lastUpdated: '20 hours ago' },
  { id: 'ls21-task2', name: 'Math_HS_AP_Statistics_LS_2.1_Collecting_Data_Task 2', type: 'task', questionCount: 2, learnosityId: 'LEARN-AP-STAT-2102', usageCount: 15, lastUpdated: '13 hours ago' },
];

// Content Area Guide pages
const apStatsContentAreaGuideItems: ContentItem[] = [
  { id: 'cag-program-vision', name: 'Program Vision', type: 'content-area-guide', description: 'Vision and goals for AP Statistics program', lastUpdated: 'Jan 2026' },
  { id: 'cag-k12-progression', name: 'K-12 Content Progression', type: 'content-area-guide', description: 'How statistics concepts build across K-12', lastUpdated: 'Jan 2026' },
  { id: 'cag-design-features', name: 'Key Design Features', type: 'content-area-guide', description: 'Core design principles and features', lastUpdated: 'Jan 2026' },
  { id: 'cag-learning-tasks', name: 'Learning Tasks', type: 'content-area-guide', description: 'Task design and implementation guidance', lastUpdated: 'Jan 2026' },
  { id: 'cag-assessment-design', name: 'Assessment Design', type: 'content-area-guide', description: 'Assessment philosophy and structure', lastUpdated: 'Jan 2026' },
  { id: 'cag-citations', name: 'Citations and References', type: 'content-area-guide', description: 'References and citations for course materials', lastUpdated: 'Jan 2026' },
];

const apStatsCourseContent: ContentItem[] = [
  { id: 'ap-stats-guide', name: 'Content Area Guide', type: 'content-area-guide', description: 'Complete guide for AP Statistics content area', lastUpdated: 'Jan 2026' },
  { id: 'ap-stats-course-guide', name: 'Course Guide', type: 'course-guide', description: 'Course structure and pacing guide', lastUpdated: 'Jan 2026' },
];

const apStatsResources: ContentItem[] = [
  { id: 'nhm-1', name: 'NHM (No Hesitation Math)', type: 'nhm', description: 'Quick practice problems for fluency', lastUpdated: 'Jan 2026' },
  { id: 'scholar-work-1', name: 'Scholar Work Resources', type: 'scholar-work', description: 'Student work samples and rubrics', lastUpdated: 'Dec 2025' },
  { id: 'assessments-1', name: 'Assessments', type: 'assessment', description: 'Unit and cumulative assessments', lastUpdated: 'Jan 2026' },
];

export const folderStructure: FolderNode = {
  id: 'root',
  name: 'Content Areas',
  type: 'folder',
  children: [
    {
      id: 'english',
      name: 'English',
      type: 'folder',
      children: [
        {
          id: 'english-es',
          name: 'Elementary School',
          type: 'folder',
          children: [
            {
              id: 'grade-k-english-history',
              name: 'Grade K English and History',
              type: 'folder',
              contentItems: [
                { id: 'gk-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade K English and History guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'gk-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'gk-eng-ls-1',
                      name: '1.1 Introduction (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'gk-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'gk-eng-task1', name: 'Task 1', type: 'task', questionCount: 5, learnosityId: 'LEARN-ENG-K-0101', usageCount: 20, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-1-english-history',
              name: 'Grade 1 English and History',
              type: 'folder',
              contentItems: [
                { id: 'g1-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 1 English and History guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g1-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g1-eng-ls-1',
                      name: '1.1 Introduction (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g1-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g1-eng-task1', name: 'Task 1', type: 'task', questionCount: 6, learnosityId: 'LEARN-ENG-1-0101', usageCount: 22, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-2-english-history',
              name: 'Grade 2 English and History',
              type: 'folder',
              contentItems: [
                { id: 'g2-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 2 English and History guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g2-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g2-eng-ls-1',
                      name: '1.1 Introduction (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g2-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g2-eng-task1', name: 'Task 1', type: 'task', questionCount: 8, learnosityId: 'LEARN-ENG-2-0101', usageCount: 25, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-3-english',
              name: 'Grade 3 English',
              type: 'folder',
              contentItems: [
                { id: 'g3-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 3 English guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g3-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g3-eng-ls-1',
                      name: '1.1 Introduction (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g3-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g3-eng-task1', name: 'Task 1', type: 'task', questionCount: 10, learnosityId: 'LEARN-ENG-3-0101', usageCount: 28, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-4-english',
              name: 'Grade 4 English',
              type: 'folder',
              contentItems: [
                { id: 'g4-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 4 English guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g4-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g4-eng-ls-1',
                      name: '1.1 Introduction (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g4-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g4-eng-task1', name: 'Task 1', type: 'task', questionCount: 12, learnosityId: 'LEARN-ENG-4-0101', usageCount: 30, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'english-ms',
          name: 'Middle School',
          type: 'folder',
          children: [
            {
              id: 'grade-5-english',
              name: 'Grade 5 English: Survey of Literature I',
              type: 'folder',
              contentItems: [
                { id: 'g5-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Survey of Literature I guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g5-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g5-eng-ls-1',
                      name: '1.1 Literary Analysis (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g5-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g5-eng-task1', name: 'Task 1', type: 'task', questionCount: 14, learnosityId: 'LEARN-ENG-5-0101', usageCount: 35, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-6-english',
              name: 'Grade 6 English: Survey of Literature II',
              type: 'folder',
              contentItems: [
                { id: 'g6-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Survey of Literature II guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g6-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g6-eng-ls-1',
                      name: '1.1 Literary Analysis (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g6-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g6-eng-task1', name: 'Task 1', type: 'task', questionCount: 16, learnosityId: 'LEARN-ENG-6-0101', usageCount: 40, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-7-english',
              name: 'Grade 7 English: Survey of Literature III',
              type: 'folder',
              contentItems: [
                { id: 'g7-eng-guide', name: 'Course Guide', type: 'course-guide', description: 'Survey of Literature III guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g7-eng-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g7-eng-ls-1',
                      name: '1.1 Literary Analysis (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g7-eng-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g7-eng-task1', name: 'Task 1', type: 'task', questionCount: 18, learnosityId: 'LEARN-ENG-7-0101', usageCount: 45, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'ap-lang-comp-1-ms',
              name: 'AP Language and Composition I',
              type: 'folder',
              contentItems: [
                { id: 'aplc1-guide', name: 'Course Guide', type: 'course-guide', description: 'AP Language and Composition I guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'aplc1-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'aplc1-ls-1',
                      name: '1.1 Rhetorical Analysis (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'aplc1-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'aplc1-task1', name: 'Task 1', type: 'task', questionCount: 20, learnosityId: 'LEARN-APLC-1-0101', usageCount: 50, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'english-hs',
          name: 'High School',
          type: 'folder',
          children: [
            {
              id: 'ap-lang-comp-2',
              name: 'AP Language and Composition II',
              type: 'folder',
              contentItems: [
                { id: 'aplc2-guide', name: 'Course Guide', type: 'course-guide', description: 'AP Language and Composition II guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'aplc2-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'aplc2-ls-1',
                      name: '1.1 Advanced Rhetorical Analysis (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'aplc2-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'aplc2-task1', name: 'Task 1', type: 'task', questionCount: 22, learnosityId: 'LEARN-APLC-2-0101', usageCount: 55, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'ap-lit-comp-1',
              name: 'AP Literature and Composition I: American Literature',
              type: 'folder',
              contentItems: [
                { id: 'aplit1-guide', name: 'Course Guide', type: 'course-guide', description: 'AP Literature American guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'aplit1-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'aplit1-ls-1',
                      name: '1.1 American Literary Traditions (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'aplit1-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'aplit1-task1', name: 'Task 1', type: 'task', questionCount: 24, learnosityId: 'LEARN-APLIT-1-0101', usageCount: 60, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'ap-lit-comp-2',
              name: 'AP Literature and Composition II: World Literature',
              type: 'folder',
              contentItems: [
                { id: 'aplit2-guide', name: 'Course Guide', type: 'course-guide', description: 'AP Literature World guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'aplit2-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'aplit2-ls-1',
                      name: '1.1 World Literary Traditions (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'aplit2-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'aplit2-task1', name: 'Task 1', type: 'task', questionCount: 26, learnosityId: 'LEARN-APLIT-2-0101', usageCount: 65, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'film-20th-century',
              name: 'Film in the 20th Century',
              type: 'folder',
              contentItems: [
                { id: 'film-guide', name: 'Course Guide', type: 'course-guide', description: 'Film in the 20th Century guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'film-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'film-ls-1',
                      name: '1.1 Early Cinema (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'film-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'film-task1', name: 'Task 1', type: 'task', questionCount: 15, learnosityId: 'LEARN-FILM-0101', usageCount: 35, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'history',
      name: 'History',
      type: 'folder',
      children: [
        {
          id: 'history-es',
          name: 'Elementary School',
          type: 'folder',
          children: [],
        },
        {
          id: 'history-ms',
          name: 'Middle School',
          type: 'folder',
          children: [],
        },
        {
          id: 'history-hs',
          name: 'High School',
          type: 'folder',
          children: [
            {
              id: 'us-history',
              name: 'US History',
              type: 'folder',
              contentItems: [
                { id: 'ush-guide', name: 'Content Area Guide', type: 'content-area-guide', description: 'US History content guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'ush-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'ush-ls-1-1',
                      name: '1.1 Colonial America (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ush-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ush-task1', name: 'Task 1', type: 'task', questionCount: 15, learnosityId: 'LEARN-HIST-0101', usageCount: 34, lastUpdated: 'Dec 2025' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'math',
      name: 'Math',
      type: 'folder',
      children: [
        {
          id: 'math-es',
          name: 'Elementary School',
          type: 'folder',
          children: [
            {
              id: 'grade-k-math',
              name: 'Grade K Math',
              type: 'folder',
              contentItems: [
                { id: 'gk-math-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade K Math guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'gk-math-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'gk-math-ls-1',
                      name: '1.1 Counting and Numbers (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'gk-math-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'gk-math-task1', name: 'Task 1', type: 'task', questionCount: 5, learnosityId: 'LEARN-MATH-K-0101', usageCount: 18, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-1-math',
              name: 'Grade 1 Math',
              type: 'folder',
              contentItems: [
                { id: 'g1-math-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 1 Math guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g1-math-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g1-math-ls-1',
                      name: '1.1 Addition and Subtraction (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g1-math-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g1-math-task1', name: 'Task 1', type: 'task', questionCount: 8, learnosityId: 'LEARN-MATH-1-0101', usageCount: 22, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-2-math',
              name: 'Grade 2 Math',
              type: 'folder',
              contentItems: [
                { id: 'g2-math-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 2 Math guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g2-math-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g2-math-ls-1',
                      name: '1.1 Place Value (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g2-math-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g2-math-task1', name: 'Task 1', type: 'task', questionCount: 10, learnosityId: 'LEARN-MATH-2-0101', usageCount: 25, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-3-math',
              name: 'Grade 3 Math',
              type: 'folder',
              contentItems: [
                { id: 'g3-math-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 3 Math guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g3-math-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g3-math-ls-1',
                      name: '1.1 Multiplication and Division (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g3-math-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g3-math-task1', name: 'Task 1', type: 'task', questionCount: 12, learnosityId: 'LEARN-MATH-3-0101', usageCount: 30, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-4-math',
              name: 'Grade 4 Math',
              type: 'folder',
              contentItems: [
                { id: 'g4-math-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 4 Math guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g4-math-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g4-math-ls-1',
                      name: '1.1 Fractions (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g4-math-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g4-math-task1', name: 'Task 1', type: 'task', questionCount: 14, learnosityId: 'LEARN-MATH-4-0101', usageCount: 32, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'math-ms',
          name: 'Middle School',
          type: 'folder',
          children: [
            {
              id: 'grade-5-math',
              name: 'Grade 5 Math',
              type: 'folder',
              contentItems: [
                { id: 'g5-math-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 5 Math guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g5-math-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g5-math-ls-1',
                      name: '1.1 Decimals and Percentages (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g5-math-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g5-math-task1', name: 'Task 1', type: 'task', questionCount: 15, learnosityId: 'LEARN-MATH-5-0101', usageCount: 35, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-6-math',
              name: 'Grade 6 Math',
              type: 'folder',
              contentItems: [
                { id: 'g6-math-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 6 Math guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g6-math-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g6-math-ls-1',
                      name: '1.1 Ratios and Proportions (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g6-math-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g6-math-task1', name: 'Task 1', type: 'task', questionCount: 16, learnosityId: 'LEARN-MATH-6-0101', usageCount: 40, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-7-algebra-1a',
              name: 'Grade 7 Algebra I.A',
              type: 'folder',
              contentItems: [
                { id: 'g7-alg-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 7 Algebra I.A guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g7-alg-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g7-alg-ls-1',
                      name: '1.1 Linear Equations (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g7-alg-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g7-alg-task1', name: 'Task 1', type: 'task', questionCount: 18, learnosityId: 'LEARN-ALG-7A-0101', usageCount: 45, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'grade-8-algebra-1b',
              name: 'Grade 8 Algebra I.B',
              type: 'folder',
              contentItems: [
                { id: 'g8-alg-guide', name: 'Course Guide', type: 'course-guide', description: 'Grade 8 Algebra I.B guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'g8-alg-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'g8-alg-ls-1',
                      name: '1.1 Quadratic Equations (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'g8-alg-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'g8-alg-task1', name: 'Task 1', type: 'task', questionCount: 20, learnosityId: 'LEARN-ALG-8B-0101', usageCount: 50, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'math-hs',
          name: 'High School',
          type: 'folder',
          children: [
            {
              id: 'ap-precalc',
              name: 'AP Precalculus',
              type: 'folder',
              contentItems: [
                { id: 'ap-precalc-guide', name: 'Course Guide', type: 'course-guide', description: 'AP Precalculus guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'ap-precalc-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'ap-precalc-ls-1',
                      name: '1.1 Functions and Graphs (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ap-precalc-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ap-precalc-task1', name: 'Task 1', type: 'task', questionCount: 18, learnosityId: 'LEARN-PRECALC-0101', usageCount: 40, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'ap-calc-bc1',
              name: 'AP Calculus BC I: Differential Calculus',
              type: 'folder',
              contentItems: [
                { id: 'ap-calc-bc1-guide', name: 'Course Guide', type: 'course-guide', description: 'AP Calculus BC I guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'ap-calc-bc1-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'ap-calc-bc1-ls-1',
                      name: '1.1 Limits and Continuity (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ap-calc-bc1-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ap-calc-bc1-task1', name: 'Task 1', type: 'task', questionCount: 20, learnosityId: 'LEARN-CALCBC1-0101', usageCount: 55, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'ap-calc-bc2',
              name: 'AP Calculus BC II: Integral Calculus',
              type: 'folder',
              contentItems: [
                { id: 'ap-calc-bc2-guide', name: 'Course Guide', type: 'course-guide', description: 'AP Calculus BC II guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'ap-calc-bc2-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'ap-calc-bc2-ls-1',
                      name: '1.1 Integration Techniques (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ap-calc-bc2-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ap-calc-bc2-task1', name: 'Task 1', type: 'task', questionCount: 22, learnosityId: 'LEARN-CALCBC2-0101', usageCount: 48, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'ap-stats',
              name: 'AP Statistics',
              type: 'folder',
              contentItems: apStatsCourseContent,
              children: [
                {
                  id: 'ap-stats-cag',
                  name: 'Content Area Guide',
                  type: 'folder',
                  contentItems: apStatsContentAreaGuideItems,
                },
                {
                  id: 'ap-stats-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'ls-1-1',
                      name: '1.1 Exploring One-Variable Data (Conceptual)',
                      type: 'folder',
                      contentItems: apStatsLS1ContentItems,
                    },
                    {
                      id: 'ls-1-2',
                      name: '1.2 Exploring Two-Variable Data (Conceptual)',
                      type: 'folder',
                      contentItems: apStatsLS2ContentItems,
                    },
                    {
                      id: 'ls-2-1',
                      name: '2.1 Collecting Data (Conceptual)',
                      type: 'folder',
                      contentItems: apStatsLS21ContentItems,
                    },
                    {
                      id: 'tet-daily',
                      name: 'TET of Daily Mastery',
                      type: 'folder',
                      contentItems: [
                        { id: 'tet-overview', name: 'Overview', type: 'overview', lastUpdated: 'Jan 2026' },
                        { id: 'tet-task1', name: 'Task 1', type: 'task', questionCount: 8, learnosityId: 'LEARN-AP-STAT-TET1', usageCount: 88, lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-1-3',
                      name: '1.3 Data Analysis (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls3-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls3-task1', name: 'Task 1', type: 'task', questionCount: 10, learnosityId: 'LEARN-AP-STAT-1301', usageCount: 25, lastUpdated: 'Dec 2025' },
                      ],
                    },
                    {
                      id: 'ls-1-4',
                      name: '1.4 Probability, Random Variables, and Probability Distributions (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls4-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls4-task1', name: 'Task 1', type: 'task', questionCount: 16, learnosityId: 'LEARN-AP-STAT-1401', usageCount: 30, lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-1-5',
                      name: '1.5 Trimester 1 Review',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls5-review', name: 'Review Materials', type: 'overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls5-task1', name: 'Review Assessment', type: 'task', questionCount: 25, learnosityId: 'LEARN-AP-STAT-1501', usageCount: 45, lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-2-1',
                      name: '2.1 Sampling Distributions and Confidence Intervals (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls21-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls21-task1', name: 'Task 1', type: 'task', questionCount: 14, learnosityId: 'LEARN-AP-STAT-2101', usageCount: 28, lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-2-2',
                      name: '2.2 Hypothesis Testing (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls22-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls22-task1', name: 'Task 1', type: 'task', questionCount: 12, learnosityId: 'LEARN-AP-STAT-2201', usageCount: 22, lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-2-3',
                      name: '2.3 Chi-Square Tests (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls23-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls23-task1', name: 'Task 1', type: 'task', questionCount: 10, learnosityId: 'LEARN-AP-STAT-2301', usageCount: 18, lastUpdated: 'Dec 2025' },
                      ],
                    },
                    {
                      id: 'ls-2-4',
                      name: '2.4 Trimester 2 Assessment',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls24-assessment', name: 'Trimester Assessment', type: 'assessment', questionCount: 30, learnosityId: 'LEARN-AP-STAT-2401', usageCount: 52, lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-review',
                      name: 'Review',
                      type: 'folder',
                      contentItems: [
                        { id: 'review-materials', name: 'Review Materials', type: 'overview', lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-3-1',
                      name: '3.1 Inference on Slopes (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls31-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls31-task1', name: 'Task 1', type: 'task', questionCount: 12, learnosityId: 'LEARN-AP-STAT-3101', usageCount: 15, lastUpdated: 'Jan 2026' },
                      ],
                    },
                    {
                      id: 'ls-3-2',
                      name: '3.2 AP Exam Review',
                      type: 'folder',
                      contentItems: [
                        { id: 'ls32-overview', name: 'Exam Prep Overview', type: 'overview', lastUpdated: 'Jan 2026' },
                        { id: 'ls32-practice', name: 'Practice Exam', type: 'assessment', questionCount: 40, learnosityId: 'LEARN-AP-STAT-EXAM', usageCount: 120, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
                {
                  id: 'ap-stats-nhm',
                  name: 'NHM (No Hesitation Math)',
                  type: 'folder',
                  contentItems: [apStatsResources[0]],
                },
                {
                  id: 'ap-stats-scholar',
                  name: 'Scholar Work Resources',
                  type: 'folder',
                  contentItems: [apStatsResources[1]],
                },
                {
                  id: 'ap-stats-assessments',
                  name: 'Assessments',
                  type: 'folder',
                  contentItems: [apStatsResources[2]],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'science',
      name: 'Science',
      type: 'folder',
      children: [
        {
          id: 'science-es',
          name: 'Elementary School',
          type: 'folder',
          children: [],
        },
        {
          id: 'science-ms',
          name: 'Middle School',
          type: 'folder',
          children: [],
        },
        {
          id: 'science-hs',
          name: 'High School',
          type: 'folder',
          children: [
            {
              id: 'biology',
              name: 'Biology',
              type: 'folder',
              contentItems: [
                { id: 'bio-guide', name: 'Content Area Guide', type: 'content-area-guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'bio-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'bio-ls-1-1',
                      name: '1.1 Introduction to Biology (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'bio-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Nov 2025' },
                        { id: 'bio-task1', name: 'Task 1', type: 'task', questionCount: 12, learnosityId: 'LEARN-SCI-BIO-0101', usageCount: 38, lastUpdated: 'Nov 2025' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'scholar-talent',
      name: 'Scholar Talent',
      type: 'folder',
      children: [
        {
          id: 'scholar-enrichment',
          name: 'Enrichment Programs',
          type: 'folder',
          children: [
            {
              id: 'advanced-stem',
              name: 'Advanced STEM',
              type: 'folder',
              contentItems: [
                { id: 'stem-guide', name: 'Program Guide', type: 'content-area-guide', lastUpdated: 'Jan 2026' },
              ],
              children: [
                {
                  id: 'stem-ls',
                  name: 'Learning Sequences',
                  type: 'folder',
                  children: [
                    {
                      id: 'stem-ls-1-1',
                      name: '1.1 Problem Solving Skills (Conceptual)',
                      type: 'folder',
                      contentItems: [
                        { id: 'stem-ls1-overview', name: 'Sequence Overview', type: 'sequence-overview', lastUpdated: 'Jan 2026' },
                        { id: 'stem-task1', name: 'Task 1', type: 'task', questionCount: 10, learnosityId: 'LEARN-STEM-0101', usageCount: 24, lastUpdated: 'Jan 2026' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const courses: Course[] = [
  // Math - High School
  { id: '1', name: 'AP Statistics – HS – Section A', section: 'Section A' },
  { id: '2', name: 'AP Calculus BC I – HS – Section A', section: 'Section A' },
  { id: '3', name: 'AP Calculus BC II – HS – Section A', section: 'Section A' },
  { id: '4', name: 'AP Precalculus – HS – Section A', section: 'Section A' },
  // Math - Middle School
  { id: '5', name: 'Grade 8 Algebra I.B – Section A', section: 'Section A' },
  { id: '6', name: 'Grade 7 Algebra I.A – Section A', section: 'Section A' },
  { id: '7', name: 'Grade 6 Math – Section A', section: 'Section A' },
  { id: '8', name: 'Grade 5 Math – Section A', section: 'Section A' },
  // English - High School
  { id: '9', name: 'AP Language and Composition II – HS – Section A', section: 'Section A' },
  { id: '10', name: 'AP Literature and Composition I – HS – Section A', section: 'Section A' },
  { id: '11', name: 'AP Literature and Composition II – HS – Section A', section: 'Section A' },
  { id: '12', name: 'Film in the 20th Century – HS – Section A', section: 'Section A' },
  // English - Middle School
  { id: '13', name: 'AP Language and Composition I – MS – Section A', section: 'Section A' },
  { id: '14', name: 'Grade 7 English: Survey of Literature III – Section A', section: 'Section A' },
  { id: '15', name: 'Grade 6 English: Survey of Literature II – Section A', section: 'Section A' },
  { id: '16', name: 'Grade 5 English: Survey of Literature I – Section A', section: 'Section A' },
];

export const placementOptions: PlacementOption[] = [
  { id: '1', name: 'Learning Sequence 1.1 – Exploring One-Variable Data', code: '1.1' },
  { id: '2', name: 'Learning Sequence 1.2 – Describing Distributions', code: '1.2' },
  { id: '3', name: 'Learning Sequence 2.1 – Two-Variable Data', code: '2.1' },
  { id: '4', name: 'Learning Sequence 2.2 – Correlation', code: '2.2' },
];

export const filterOptions = {
  subjects: ['Math', 'English', 'Science', 'History', 'Scholar Talent'],
  gradeBands: ['High School', 'Middle School', 'Elementary School'],
  grades: ['HS', '8', '7', '6', '5', '4', '3', '2', '1', 'K'],
  courses: [
    // Math
    'AP Statistics', 'AP Calculus BC I', 'AP Calculus BC II', 'AP Precalculus',
    'Grade 8 Algebra I.B', 'Grade 7 Algebra I.A', 'Grade 6 Math', 'Grade 5 Math',
    'Grade 4 Math', 'Grade 3 Math', 'Grade 2 Math', 'Grade 1 Math', 'Grade K Math',
    // English
    'AP Language and Composition II', 'AP Literature and Composition I', 'AP Literature and Composition II', 'Film in the 20th Century',
    'AP Language and Composition I', 'Grade 7 English: Survey of Literature III', 'Grade 6 English: Survey of Literature II', 'Grade 5 English: Survey of Literature I',
    'Grade 4 English', 'Grade 3 English', 'Grade 2 English and History', 'Grade 1 English and History', 'Grade K English and History',
    // Science & History & Scholar Talent (unchanged)
    'Biology', 'US History', 'Advanced STEM'
  ],
  learningSequences: [
    '1.1 – Exploring One-Variable Data',
    '1.2 – Exploring Two-Variable Data',
    '1.3 – Collecting Data',
    '2.1 – Sampling Distributions',
    '2.2 – Hypothesis Testing',
  ],
};
