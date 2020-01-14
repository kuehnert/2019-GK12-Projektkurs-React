import React from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import { RootState } from '../../app/rootReducer';

export default () => {
  const teacher = useSelector((state: RootState) => state.teachers.teacher);
  if (teacher == null) {
    return <div>Error...</div>;
  }

  // if (term != null) {
  //   history.push(`/terms/${term.id}`);
  //   return <div />;
  // }

  history.push(`/terms`);
  return <div>Redirecting…</div>;
};
