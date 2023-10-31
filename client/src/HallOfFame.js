import React from 'react';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';

function HallOfFame() {
  const { hallOfFame } = useSocketUpdateContext();

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
      {hallOfFame.map(({ name, you }) => (
        <div key={name} style={you ? nameStyle : null}>
          {you ? `${name} < I'm famous!!!` : name}
        </div>
      ))}
    </div>
  );
}

export default HallOfFame;
