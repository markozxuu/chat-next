import React, { KeyboardEvent, SFC } from 'react';

interface Props {
  readonly userExists: boolean;
  readonly emptyMessage: boolean;
  setRef(element: HTMLInputElement): void;
  handleInput(event: KeyboardEvent<HTMLElement>): void;
}

const Login: SFC<Props> = ({
  handleInput,
  setRef,
  emptyMessage,
  userExists
}) => {
  const messageErr = userExists ? '#ff001f' : '#fff';
  const titleEmpy = emptyMessage
    ? 'You did not write anything🙈'
    : 'Whats your nickname?';
  return (
    <div className="main">
      <style jsx>{`
        .main {
          text-align: center;
          padding-top: 15em;
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
        type="text"
        autoFocus
        ref={setRef}
        onKeyPress={handleInput}
      />
    </div>
  );
};

export default Login;
