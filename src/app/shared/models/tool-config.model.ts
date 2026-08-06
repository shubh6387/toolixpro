export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolConfig {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  iconClass: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  faqs: ToolFaq[];
  popular?: boolean;
  longDescription?: string;
  keyFeatures?: string[];
  howToUse?: string[];
  useCases?: string[];
}

