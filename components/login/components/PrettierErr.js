/* @flow */
import * as React from 'react';

const PrettierErr = () => (
  <div className="main">
    <style jsx>{`
      .main {
        text-align: center;
      }
      .title-err {
        font-size: 14px;
        font-weight: 200;
        color: #ff001f;
      }
    `}</style>
    <h1 className="title-err">User already exists 😢</h1>
  </div>
);

export default PrettierErr;
