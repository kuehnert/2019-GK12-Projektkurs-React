import { Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import history from '../../history';
import TermForm from './TermForm';
import { createTerm, TermBase, defaultTerm } from './termSlice';

interface Props {
  termId: string;
}

// const AddTermPage: React.FC = (props: Props) => {
const AddTermPage = (props: Props) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values: TermBase) => {
    try {
      dispatch(createTerm(values));
      history.push(`/terms`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h2">Neues Halbjahr anlegen</Typography>

      <TermForm handleSubmit={(values: TermBase) => handleSubmit(values)} initialValues={Object.assign(defaultTerm)} />
    </div>
  );
};

export default AddTermPage;
