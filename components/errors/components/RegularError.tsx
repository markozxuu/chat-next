import React from 'react';

export default function RegularError() {
  return (
    <div className="Error">
      <style jsx>{`
        .Error {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          margin-top: 15em;
          color: rgb(102, 102, 102);
          text-rendering: optimizeLegibility;
        }

        .link {
          color: rgb(6, 125, 247);
          text-decoration: transparent;
        }

        .link:hover {
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-color: rgb(6, 125, 247);
        }
      `}</style>
      <p>
        Oh, oh ...<br />
        Something went wrong
      </p>
      <p className="Error-Emojin">🙈🙊🙉</p>
      <p>
        wait a few seconds<br />
        and<a className="link" href="./">
          {' '}
          try again{' '}
        </a>
      </p>
    </div>
  );
}
