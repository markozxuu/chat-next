import Router from 'next/router';
import React, { Component, KeyboardEvent } from 'react';
import io from 'socket.io-client';
import PrettierErr from '../../errors/components/PrettierErr';
import HandleErr from '../../errors/containers/HandleErr';
import Layout from '../components/Layout';
import Login from '../components/Login';

const initialState = {
  isExists: false,
  isEmpty: false
};

// explicitly mapping our type State to readonly
type State = Readonly<typeof initialState>;

export default class LoginContainer extends Component<{}, State> {
  socket: SocketIOClient.Socket;
  input: HTMLInputElement;

  readonly state: State = initialState;

  // connect to WS server and listen event
  componentDidMount() {
    this.socket = io();
  }

  // close socket connection
  componentWillUnmount() {
    this.socket.off('login', this.handleAuth);
  }

  render() {
    return (
      <HandleErr>
        <Layout>
          <Login
            setRef={this.setRef}
            handleInput={this.handleKeyPress}
            emptyMessage={this.state.isEmpty}
            userExists={this.state.isExists}
          />
          {this.state.isExists && <PrettierErr />}
        </Layout>
      </HandleErr>
    );
  }

  // This method performs a check on the server,
  // to indicate if the username is available.
  private handleAuth = (username: string): void => {
    this.socket.emit('login', username, (ackValue: boolean) => {
      if (ackValue) {
        this.setState(updateExists);
      } else {
        Router.push('/chat');
        this.socket.emit('add users', username);
      }
    });
  };

  private handleKeyPress = (event: KeyboardEvent<HTMLElement>): void => {
    const user: string = this.input.value;
    if (event.key === 'Enter' && user !== '') {
      this.handleAuth(this.input.value);
    } else if (event.key === 'Enter' && user === '') {
      this.setState(updateEmpty);
    }
  };

  private setRef = (element: HTMLInputElement): void => {
    this.input = element;
  };
}

const updateExists = (prevState: State): object => ({
  isExists: prevState.isExists.valueOf
});
const updateEmpty = (prevState: State): object => ({
  isEmpty: prevState.isExists.valueOf
});
