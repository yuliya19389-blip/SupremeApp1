export enum View {
  DASHBOARD = 'DASHBOARD',
  TRENDS = 'TRENDS',
  COPYWRITER = 'COPYWRITER',
  COMPETITORS = 'COMPETITORS'
}

export interface TrendItem {
  topic: string;
  relevance: string;
  adaptation: string;
  postDraft: string;
  sourceUrl?: string;
}

export interface CopyVariant {
  type: 'Short' | 'Long' | 'Emotional' | 'Twitter' | 'LinkedIn';
  content: string;
}

export interface CompetitorData {
  name: string;
  summary: string;
  postingFrequency: string;
  bestFormat: string;
  engagementData: { name: string; likes: number; comments: number }[];
  insights: string[];
}

export interface DailyBrief {
  idea: string;
  tip: string;
  bestTime: string;
}