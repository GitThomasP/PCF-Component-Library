import * as React from 'react';
import CursorFollower from '../cursor-follower';

export interface IInputdProps {
  name?: string;
}

export class InputComponent extends React.Component<IInputdProps> {
  public render(): React.ReactNode {
    return (
      <>
        <CursorFollower />
      </>
      )
  }
}
