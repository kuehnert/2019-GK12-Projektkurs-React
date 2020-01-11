import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from '../features/teachers/LoginPage';
import { RootState } from './rootReducer';
import Routes from './Routes';

const App: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.teachers);

  if (!isLoggedIn) {
    return <LoginPage />;
  } else {
    return <Routes />;
  }
};

export default App;
