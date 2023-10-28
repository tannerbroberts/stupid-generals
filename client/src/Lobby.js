import React from 'react';
import ConnectedPlayers from './ConnectedPlayers.js';
import NameInput from './StupidGeneralNameInput.js';
import { useAppContext } from './App.js';

function Lobby() {
  const { signedIn } = useAppContext();
  return (
    <div>
      <ConnectedPlayers />
      {!signedIn && <NameInput />}
    </div>)
}

export default Lobby;
