import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from '../../history';
import { RootState } from '../../app/rootReducer';

const WelcomePage: React.FC = () => {
  const teacher = useSelector((state: RootState) => state.teachers.teacher);
  if (teacher == null) {
    return <div>Error...</div>
  }

  // if (term != null) {
  //   history.push(`/terms/${term.id}`);
  //   return <div />;
  // }

  history.push(`/terms`);
  return (
    <div>
      <h1>Willkommen! Yes!</h1>
    </div>
  );
};

export default WelcomePage;
