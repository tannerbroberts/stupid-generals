import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const socket = io();
  console.log('socket:', socket);

  return (
    <div>
      <h1>Socket.IO Example</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));