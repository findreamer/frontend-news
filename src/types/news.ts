export interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  source: string;
  url: string;
  publishDate: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
}

export type NewsCategory = {
  id: string;
  name: string;
  description?: string;
};