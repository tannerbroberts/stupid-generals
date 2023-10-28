import React, { useState, useRef } from 'react';
import { useSocketUpdateContext } from './SocketUpdateProvider.js';

function StupidGeneralNameInput() {
  const inputStyle = {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '24px',
    textAlign: 'center',
  };

  const { register, loginErrorState, login } = useSocketUpdateContext();

  const [name, setName] = useState(JSON.parse(localStorage.getItem('stupidGeneralsCredentials'))?.name);
  const [password, setPassword] = useState(() => JSON.parse(localStorage.getItem('stupidGeneralsCredentials'))?.password);

  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const onRegister = (event) => {
    if (!name) {
      nameInputRef.current.focus();
    } else if (!password) {
      passwordInputRef.current.focus();
    } else {
      register({ name, password });
    }
  };

  const onLogin = (event) => { login({ name, password }) };

  return (
    <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <input type="text" style={{ ...inputStyle, border: '2px solid #ccc', borderRadius: '4px', padding: '10px' }} placeholder="Stupid General Name" value={name} onChange={(e) => setName(e.target.value)} ref={nameInputRef} />
      <input type="password" style={{ ...inputStyle, border: '2px solid #ccc', borderRadius: '4px', padding: '10px' }} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordInputRef} />
      <button type='button' onClick={onLogin} style={{ marginTop: '10px', fontSize: '24px', backgroundColor: '#87CEFA', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Login</button>
      <button type='button' onClick={onRegister} style={{ marginTop: '10px', fontSize: '16px', backgroundColor: '#2c3e50', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Register</button>
      {loginErrorState && <p style={{ color: 'red' }}>Something went wrong with the login process do something different.</p>}
    </div>
  );
}
export default StupidGeneralNameInput;
