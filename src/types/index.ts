// types.ts
export interface ModerationItem {
  label: string;
  percentage: string; // e.g., "100.00"
  severity: "high" | "medium" | "low" | "none";
  confidence: number;
  status: "detected" | "safe";
}

export interface ModerationCategory {
  title: string;
  flagged: boolean;
  items: ModerationItem[];
}

export interface ModerationConcern {
  severity: "high" | "medium" | "low";
  category: string;
  type: string;
  confidence: number;
  percentage: string;
  generator?: string; // Optional, used for AI-generated content
}

export interface AIGenerated {
  detected: boolean;
  confidence: number;
  generator: string | null;
}

export interface ModerationSummary {
  overallAssessment: string;
  flagged: boolean;
  concerns: ModerationConcern[];
  safe: boolean;
  categories: {
    [key: string]: ModerationCategory;
  };
  aiGenerated: AIGenerated;
}

export interface ModerationData {
  fileUrl: string;
  fileName: string;
  fileType: string;
  status: string;
  flagged: boolean;
  summary: ModerationSummary;
  detailedResults: {
    [key: string]: ModerationCategory;
  };
  processingType: string;
  aiDetectionStatus: string;
  moderationStatus: string;
}

export interface VideoUploadProps {
  onModerationStart: () => void;
  onModerationComplete: (data: ModerationData) => void;
  onError: (errorMessage: string) => void;
  loading: boolean;
}

export interface ModerationResultsProps {
  data: ModerationData;
}
