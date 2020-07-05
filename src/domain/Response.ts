import { Record } from './record';

export interface Response<T> {
  code: number;
  message: string;
  error?: boolean;
  data?: Record<T>;
}
