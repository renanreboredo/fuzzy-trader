import { Maybe } from './record';

export interface Recommendation {
  conservative: Maybe<any>;
  moderate: Maybe<any>;
  aggressive: Maybe<any>;
}
