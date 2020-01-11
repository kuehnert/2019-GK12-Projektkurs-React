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
import Backend from 'react-dnd-html5-backend'

type MatchParams = { termId: string };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    buttons: {
      '& > *': {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
      },
    }
  })
);

// TODO: What about? : React.FC<MatchParams>
export default (props: RouteComponentProps<MatchParams>) => {
  const { termId } = props.match.params;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTerm(termId));
    dispatch(getCourses(termId));
  }, []);

  return (
    <DndProvider backend={Backend}>
      <Typography variant="h2">Stundenplan bearbeiten</Typography>

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={9}>
          <EditTimetable termId={termId} />
        </Grid>

        <Grid item xs={3}>
          <CourseList termId={termId} />
        </Grid>
      </Grid>

      <div className={classes.buttons}>
      <Button variant="contained" color="primary">Abbrechen</Button>
      <Button variant="contained" color="secondary">Speichern</Button>
      </div>
    </DndProvider>
  );
};
