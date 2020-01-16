import { RouteComponentProps } from 'react-router-dom';
import { Fab, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import history from '../../history';
import { formatDate } from '../../utils/formatter';
import { getTerm, Term } from './termSlice';
import Timetable from './Timetable';

interface MatchParams {
  termId: string;
}

const TermPage = (props: RouteComponentProps<MatchParams>) => {
  const { termId } = props.match.params;
  const dispatch = useDispatch();
  const classes = useStyles();
  const term = useSelector((state: RootState) =>
    state.terms.terms?.find((term: Term) => term.id === props.match.params.termId)
  );

  useEffect(() => {
    dispatch(getTerm(termId));
  }, [dispatch, termId]);

  if (term == null) {
    return <Loading />;
  }

  return (
    <div>
      <Typography variant="h3">{term.name}</Typography>
      <Typography variant="h4">
        {formatDate(term.start)}-{formatDate(term.end)}
      </Typography>
      <Fab className={classes.fab} onClick={() => history.push(`/terms/${term.id}/edit_timetable`)}>
        <EditIcon />
      </Fab>
      <Timetable term={term} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '95%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: 'auto',
      padding: 20,
    },
    table: {
      minWidth: 650,
    },
    tr: {
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);

export default TermPage;
