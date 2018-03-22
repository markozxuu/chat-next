/* @flow */
import * as React from 'react';
import io from 'socket.io-client';
import Router from 'next/router';
import Login from '../components/Login';
import LoginLayout from '../components/LoginLayout';
import PrettierErr from '../components/PrettierErr';

type State = {
  isExists: boolean,
  isEmpty: boolean
};

export default class LoginContainer extends React.Component<{}, State> {
  socket: Object;
  input: HTMLInputElement;

  state = {
    isExists: false,
    isEmpty: false
  };

  // connect to WS server and listen event
  componentDidMount() {
    this.socket = io();
  }

  // close socket connection
  componentWillUnmount() {
    this.socket.off('login', this.handleAuth);
  }

  // This method performs a check on the server,
  // to indicate if the username is available.
  handleAuth = (username: string): void => {
    this.socket.emit('login', username, (ackValue: boolean) => {
      if (ackValue) {
        this.setState({
          isExists: true
        });
      } else {
        Router.push('/chat');
        this.socket.emit('add users', username);
      }
    });
  };

  handleKeyPress = (event: SyntheticKeyboardEvent<>): void => {
    const user: string = this.input.value;
    if (event.key === 'Enter' && user !== '') {
      this.handleAuth(this.input.value);
    } else if (event.key === 'Enter' && user === '') {
      this.setState({
        isEmpty: true
      });
    }
  };

  setRef = (element: HTMLInputElement): void => {
    this.input = element;
  };

  render(): Object {
    return (
      <LoginLayout>
        <Login
          handleInput={this.handleKeyPress}
          setRef={this.setRef}
          emptyMessage={this.state.isEmpty}
          userExists={this.state.isExists}
        />
        {this.state.isExists && <PrettierErr />}
      </LoginLayout>
    );
  }
}
