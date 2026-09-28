export type AppView =
  | 'main'
  | 'web'
  | 'graphics'
  | 'posts'
  | 'crm'
  | 'leads'
  | 'reply'
  | 'caller'
  | 'email'
  | 'network'
  | 'connect';

export interface ToolItem {
  id: string;
  name: string;
  icon: string;
  category?: string;
  description: string;
  routeView?: AppView;
}

export interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
  view: AppView;
}

export type WebWorkspaceTab = 'preview' | 'backend' | 'code';
export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export interface CodeFile {
  name: string;
  path: string;
  language: string;
  icon: string;
  content: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  latency: string;
  status: number;
  sampleRequest?: string;
  sampleResponse: string;
}

export interface DbSchemaTable {
  name: string;
  description: string;
  columns: { name: string; type: string; isPrimary?: boolean; isNullable?: boolean }[];
}

export interface GraphicItem {
  id: string;
  prompt: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3';
  style: string;
  imageUrl: string;
  timestamp: string;
}
