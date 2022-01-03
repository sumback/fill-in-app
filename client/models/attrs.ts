import { IPlayCard } from '@/models/card';
import { IGameResponseCard } from '@/models/games';
import { FirebaseArray } from '@/models/entity';

export interface CardListAttrs extends Record<string, unknown> {
  title: string;
  items: Array<IPlayCard>;
}

export interface HandsAttrs extends Record<string, unknown> {
  items: FirebaseArray<IGameResponseCard>;
}

export interface PaginationAttrs extends Record<string, unknown> {
  current: number;
  total: number;
  perpage: number;
  pagerange: number;
}
