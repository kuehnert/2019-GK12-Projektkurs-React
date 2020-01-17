import { Paper, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading';
import history from '../../history';
import { useTerm } from '../../utils/selectors';
import TermForm from './TermForm';
import { getTerm, Term, TermBase, updateTerm } from './termSlice';
import { getStudents } from '../courses/studentSlice';
import StudentTable from './StudentTable';

interface MatchParams {
  termId: string;
}

export default (props: RouteComponentProps<MatchParams>) => {
  const { termId } = props.match.params;
  const term = useTerm(termId);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getTerm(termId));
    dispatch(getStudents(termId));
  }, [dispatch, termId]);

  const handleSubmit = async (values: TermBase) => {
    try {
      await dispatch(updateTerm(values as Term));
      history.push(`/terms`);
    } catch (error) {
      console.error(error);
    }
  };

  if (term == null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">Halbjahr bearbeiten: {term.name}</Typography>

      <Paper className={classes.paper}>
        <TermForm handleSubmit={(values: TermBase) => handleSubmit(values)} initialValues={term} />
      </Paper>

      <StudentTable termId={termId} />
    </div>
  );
};

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      padding: 0,
      margin: 0,
    },
    paper: {
      padding: spacing(2),
      margin: spacing(2),
      marginLeft: spacing(0),
      marginRight: spacing(0),
      background: '#f5f5f5',
    },
  })
);
