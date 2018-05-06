import { Component, ReactNode } from 'react';
import RegularError from '../components/RegularError';

const initalState = {
  handleErr: false
};

type State = Readonly<typeof initalState>;

interface Props {
  children?: ReactNode;
}

export default class HandleErr extends Component<Props, State> {
  readonly state: State = initalState;

  componentDidCatch() {
    this.setState(updateHandleErr);
  }
  render() {
    const { children }: Props = this.props;
    if (this.state.handleErr) {
      return <RegularError />;
    }
    return children;
  }
}

const updateHandleErr = (prevState: State): object => ({
  handleErr: prevState.handleErr.valueOf
});
