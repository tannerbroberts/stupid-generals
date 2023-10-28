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
  const [hallOfFame, setHallOfFame] = useState([]);

  const login = useCallback(({ name, password }) => {
    socket.emit('login', { name, password });
  }, []);

  const register = useCallback(({ name, password }) => {
    socket.emit('register', { name, password });
  }, []);

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected');

      socket.on('loginSuccess', () => {
        console.log('loginSuccess event received');
        setLoggedIn(true);
      });
      socket.on('loginFailure', () => {
        console.log('loginFailure event received');
        setLoginErrorState(true);
      });
      socket.on('registrationSuccess', (regstrationSuccessEvent) => {
        const { name, password } = regstrationSuccessEvent;
        console.log('registrationSuccess event received');
        // Set the name and password values in local storage under the key 'stupidGenerals'
        localStorage.setItem('stupidGeneralsCredentials', JSON.stringify({ name, password }));
      });
      socket.on('userNamesList', (data) => {
        setClientList(data);
      });
      socket.on('hallOfFame', (data) => {
        setHallOfFame(data);
      });
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ clientList, hallOfFame, loggedIn, loginErrorState, login, register, setLoginErrorState }}>
      {children}
    </SocketContext.Provider>
  );
};
