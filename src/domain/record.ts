export type Maybe<T> = Record<T> | RecordNotFound;

export class RecordNotFound {
  found: false = false;
}

export class Record<T> {
  found: true = true;
  just: T;
  constructor(just: T) {
    this.just = just;
  }
}
