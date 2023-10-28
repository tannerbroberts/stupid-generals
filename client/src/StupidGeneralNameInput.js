import React, { useState } from 'react';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';
import { useAppContext } from './app.js';

function NameInput() {
  const inputStyle = {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center',
  };

  const { signIn } = useSocketUpdateContext();
  const { setSignedIn } = useAppContext();

  const [name, setName] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      signIn(name);
      setSignedIn(true);
    }
  };

  return (
    <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <input type="text" style={inputStyle} placeholder="Stupid General Name" value={name} onChange={(e) => setName(e.target.value)} onKeyPress={handleKeyPress} />
    </div>
  );
}

export default NameInput;