export class BaseEntity<T> {
  protected props: T;

  constructor(props: T) {
    this.props = props;
  }
}
