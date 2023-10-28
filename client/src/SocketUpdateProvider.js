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
  const [clientList, setClientList] = useState([]);

  const signIn = useCallback((name) => {
    console.log('signIn event emitted', name);
    socket.emit('signIn', name);
  }, []);

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected');

      socket.on('clientsList', (data) => {
        console.log('clientsList event received', data);
        setClientList(data);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ clientList, signIn }}>
      {children}
    </SocketContext.Provider>
  );
};

