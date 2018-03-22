/* @flow */
import * as React from 'react';

type Props = {
  handleInput: Function,
  setRef: Function,
  emptyMessage: boolean,
  userExists: boolean
};

const Login = ({ handleInput, setRef, emptyMessage, userExists }: Props) => {
  const messageErr = userExists ? '#ff001f' : '#fff';
  const titleEmpy = emptyMessage
    ? 'You did not write anything🙈'
    : 'Whats your nickname?';
  return (
    <div className="main">
      <style jsx>{`
        .main {
          text-align: center;
          padding-top: 10em;
        }
        .title {
          font-weight: 200;
        }
        .username-input {
          text-align: center;
          color: ${messageErr};
          background: transparent;
          border: none;
          border-bottom: solid 2px ${messageErr};
          margin-top: 1rem;
          padding-bottom: 15px;
          letter-spacing: 3px;
          font-size: 2.3rem;
          width: 33rem;
        }
      `}</style>
      <h1 className="title">{titleEmpy}</h1>
      <input
        className="username-input"
        ref={setRef}
        type="text"
        onKeyPress={handleInput}
        autoFocus
      />
    </div>
  );
};

export default Login;
