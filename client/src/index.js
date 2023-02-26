import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { UserProvider } from './context/userContext';
import { BoardProvider } from './context/boardsContext';
import { ModalProvider } from './context/modalsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <BoardProvider>
          <App />
        </BoardProvider>
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>
);
