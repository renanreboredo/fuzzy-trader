import { isUndefined } from 'lodash';

export class Response<T> {
  message: string;
  error = false;
  data?: T;
  constructor(
    { message, data }: { message: string; data?: T },
    error?: boolean,
  ) {
    this.message = message;
    if (isUndefined(data)) {
      this.data = data;
    }
    this.error = isUndefined(error) ? this.error : error;
  }
}
