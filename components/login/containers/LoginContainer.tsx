import Router from 'next/router';
import React, { Component, KeyboardEvent } from 'react';
import io from 'socket.io-client';
import Login from '../components/Login';
import LoginLayout from '../components/LoginLayout';
import PrettierErr from '../components/PrettierErr';

export interface State {
  isExists: boolean;
  isEmpty: boolean;
}

export default class LoginContainer extends Component<{}, State> {
  socket: SocketIOClient.Socket;
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

  handleKeyPress = (event: KeyboardEvent<HTMLElement>): void => {
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

  render() {
    return (
      <LoginLayout>
        <Login
          setRef={this.setRef}
          handleInput={this.handleKeyPress}
          emptyMessage={this.state.isEmpty}
          userExists={this.state.isExists}
        />
        {this.state.isExists && <PrettierErr />}
      </LoginLayout>
    );
  }
}
