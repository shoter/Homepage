import React from 'react';
import logo from './logo.svg';
import './styles/app.scss';
import Desktop from './code/desktop/Desktop';

const App: React.FC = () => {
  return (
    <div className="app">
      <Desktop />
    </div>
  );
}

export default App;
