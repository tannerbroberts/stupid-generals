import React, { createContext, useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8001');

const SocketContext = createContext();

export function useSocketUpdateContext() {
  const context = React.useContext(SocketContext);

  if (!context) {
    throw new Error(
      `SocketUpdateContext must be used within a SocketUpdateProvider`
    );
  }

  return context;
}

export default function SocketUpdateProvider({ children }) {
  const [loginErrorState, setLoginErrorState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [clientList, setClientList] = useState([]);

  const register = useCallback((name, password) => {
    console.log('signIn event emitted', name);
    socket.emit('register', { name, password });
  }, []);

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected');

      socket.on('userNamesList', (data) => {
        console.log('userNamesList event received', data);
        setClientList(data);
      });

      socket.on('loginSuccess', () => {
        console.log('loginSuccess event received');
        setLoggedIn(true);
      });
      socket.on('loginFailure', () => {
        console.log('loginFailure event received');
        setLoginErrorState(true);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ clientList, loggedIn, loginErrorState, register, setLoginErrorState }}>
      {children}
    </SocketContext.Provider>
  );
};

