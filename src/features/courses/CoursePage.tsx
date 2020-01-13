import { Fab, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useCourse, useTerm } from "../../utils/selectors";
import { getTerm } from '../terms/termSlice';
import { getCourses } from './courseSlice';
import history from '../../history';

interface MatchParams {
  termId: string;
  courseId: string;
}

export default (props: RouteComponentProps<MatchParams>) => {
  const { termId, courseId } = props.match.params;
  const dispatch = useDispatch();
  const term = useTerm(termId);
  const course = useCourse(termId, courseId);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getTerm(termId));
    dispatch(getCourses(termId));
  }, [dispatch, termId, courseId]);

  if (term == null || course == null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Kurs {course.name}</Typography>
      <Fab className={classes.fab} onClick={() => history.push(`/terms/${term.id}/courses/${courseId}/edit`)}>
        <EditIcon />
      </Fab>
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
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);
