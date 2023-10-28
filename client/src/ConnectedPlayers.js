import React from 'react';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';

function ConnectedPlayers() {
  const { clientList } = useSocketUpdateContext();

  return (
    <div style={{ overflowY: 'scroll', height: '200px' }}>
      {clientList.map((player) => (
        <div key={player}>{player}</div>
      ))}
    </div>
  );
}

export default ConnectedPlayers;
