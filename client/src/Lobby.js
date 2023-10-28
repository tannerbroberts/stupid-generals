import React from 'react';
import ConnectedPlayers from './ConnectedPlayers.js';
import NameInput from './StupidGeneralNameInput.js';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';

function Lobby() {
  const { loggedIn } = useSocketUpdateContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ width: '25%' }}>
        <ConnectedPlayers />
      </div>
      <div style={{ width: '50%' }}>
        {!loggedIn && <NameInput />}
      </div>
      <div style={{ width: '25%' }}>
        <div>Not here yet, but will be the hall of fame</div>
      </div>
    </div>
  );
}

export default Lobby;
