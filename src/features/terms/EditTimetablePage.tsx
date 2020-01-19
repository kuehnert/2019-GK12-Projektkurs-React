import { Button, Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import CourseList from '../courses/CourseList';
import EditTimetable from './EditTimetable';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTerm } from './termSlice';
import { getCourses } from '../courses/courseSlice';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import TrashCan from '../../components/TrashCan';
import history from '../../history';

type MatchParams = { termId: string };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    control: {
      padding: theme.spacing(1),
    },
    buttons: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const EditTimetablePage: React.FC<RouteComponentProps<MatchParams>> = props => {
  const { termId } = props.match.params;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTerm(termId));
    dispatch(getCourses(termId));
  }, [dispatch, termId]);

  return (
    <DndProvider backend={Backend}>
      <Typography variant="h2">Stundenplan bearbeiten</Typography>

      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={9}>
          <EditTimetable termId={termId} />
        </Grid>

        <Grid item xs={3}>
          <CourseList termId={termId} />

          <TrashCan />
        </Grid>
      </Grid>

      <div className={classes.buttons}>
        <Button variant="contained" color="primary" onClick={() => history.goBack()}>
          Zurück
        </Button>
      </div>
    </DndProvider>
  );
};

export default EditTimetablePage;
