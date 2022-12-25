interface BaseProps {
  id: string;
  createdAt: Date;
}

export abstract class BaseEntity<T extends BaseProps> {
  protected props: T;

  constructor(props: T) {
    this.props = props;
  }

  public get id(): string {
    return this.props.id;
  }
}
