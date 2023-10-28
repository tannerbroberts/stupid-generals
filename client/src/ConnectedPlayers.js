import React from 'react';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';

function ConnectedPlayers() {
  const { clientList } = useSocketUpdateContext();

  const listStyle = {
    height: 'calc(100vh - 100px)',
    overflowY: 'scroll',
    fontFamily: 'monospace',
    fontSize: '20px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  };

  const nameStyle = {
    fontWeight: 'bold',
    color: 'green',
  };

  return (
    <div style={listStyle}>
      {clientList.map(({ name, you }) => (
        <div key={name} style={you ? nameStyle : null}>
          {you ? `${name} < Look Dad! It's me!!` : name}
        </div>
      ))}
    </div>
  );
}

export default ConnectedPlayers;
