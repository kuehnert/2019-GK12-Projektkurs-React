import { Divider, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useCourse, useTerm } from '../../utils/hooks';
import { defaultLogEntry, getCourse, LogEntry } from '../courses/courseSlice';
import LogEntryForm from '../logentries/LogEntryForm';
import LogEntryTable from '../logentries/LogEntryTable';
import { getTerm } from '../terms/termSlice';

interface MatchParams {
  termId: string;
  courseId: string;
}

const LogEntriesPage: React.FC<RouteComponentProps<MatchParams>> = props => {
  const { termId, courseId } = props.match.params;
  const dispatch = useDispatch();
  const term = useTerm(termId);
  const course = useCourse(termId, courseId);
  const [currentLogEntry, setCurrentLogEntry] = useState<LogEntry | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (term == null) {
      dispatch(getTerm(termId));
    }

    if (course == null) {
      dispatch(getCourse(termId, courseId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (term == null || course == null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Kurs {course.name}</Typography>

      <Typography variant="h4">Kursheft</Typography>

      <LogEntryTable logEntries={course.logEntries} handleClick={le => setCurrentLogEntry(le)} />

      <LogEntryForm
        course={course}
        logEntry={currentLogEntry || defaultLogEntry}
        open={currentLogEntry != null}
        handleClose={() => setCurrentLogEntry(null)}
      />
      <Divider />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      h4: {
        paddingTop: theme.spacing(2),
      },
    },
    root: {},
    buttons: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
  })
);

export default LogEntriesPage;
