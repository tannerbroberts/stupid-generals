import React from 'react';
import ConnectedPlayers from './ConnectedPlayers.js';
import NameInput from './StupidGeneralNameInput.js';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';

function Lobby() {
  const { loggedIn } = useSocketUpdateContext();

  return (
    <div>
      <ConnectedPlayers />
      {!loggedIn && <NameInput />}
    </div>)
}

export default Lobby;
