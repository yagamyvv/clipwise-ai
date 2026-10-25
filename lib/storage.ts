export type ClipStatus = 'ready' | 'processing' | 'failed';
export type ProjectStatus = 'uploading' | 'analyzing' | 'generating' | 'subtitles' | 'completed' | 'failed';

export type VideoSourceType = 'upload' | 'youtube';

export interface Clip {
  id: string;
  title: string;
  timestamp: string;
  status: ClipStatus;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  sourceType: VideoSourceType;
  sourceValue: string;
  duration: string;
  status: ProjectStatus;
  createdAt: string;
  clips: Clip[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}
