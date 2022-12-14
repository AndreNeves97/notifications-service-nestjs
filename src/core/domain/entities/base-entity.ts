import { randomUUID } from 'node:crypto';

export class BaseEntity<T> {
  private _id: string;

  protected props: T;

  constructor(props: T) {
    this._id = randomUUID();

    this.props = props;
  }

  public get id(): string {
    return this._id;
  }
}
