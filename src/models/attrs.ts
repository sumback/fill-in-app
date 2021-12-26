import { IPlayCard } from '@/models/card';

export interface CardListAttrs extends Record<string, unknown> {
  title: string;
  items: Array<IPlayCard>;
}

export interface PaginationAttrs extends Record<string, unknown> {
  current: number;
  total: number;
  perpage: number;
  pagerange: number;
}
