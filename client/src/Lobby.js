import React from 'react';
import ConnectedPlayers from './ConnectedPlayers.js';
import NameInput from './StupidGeneralNameInput.js';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';
import HallOfFame from './HallOfFame.js';
import GeneralsMainDisplay from './GeneralsMainDisplay.js';
import StupidGeneralNameInput from './StupidGeneralNameInput.js';

function Lobby() {
  const { loggedIn, connected } = useSocketUpdateContext();

  return (
    (connected) ? (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }} >
        <div style={{ width: '25%' }}>
          <ConnectedPlayers />
        </div>
        <div style={{ width: '50%' }}>
          {loggedIn ? <GeneralsMainDisplay /> : <StupidGeneralNameInput />}
        </div>
        <div style={{ width: '25%' }}>
          <HallOfFame />
        </div>
      </div >
    ) : <div />
  );
}

export default Lobby;
