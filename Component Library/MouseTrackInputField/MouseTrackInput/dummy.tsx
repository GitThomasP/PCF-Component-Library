import * as React from 'react';

export interface IInputdProps {
  name?: string;
}

export class InputComponent extends React.Component<IInputdProps> {
  public render(): React.ReactNode {
    return (
      <div>
        {this.props.name}
      </div>
    )
  }
}
