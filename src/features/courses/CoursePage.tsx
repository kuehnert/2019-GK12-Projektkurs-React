import { Button, Fab, TextField, Theme, Typography, Divider } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, Edit as EditIcon } from '@material-ui/icons';
import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import history from '../../history';
import { getLessons } from '../../utils/courseHelpers';
import { useCourse, useTerm } from '../../utils/hooks';
import { getEnrolments } from '../enrolments/enrolmentSlice';
import EnrolmentTable from '../enrolments/EnrolmentTable';
import { getTerm } from '../terms/termSlice';
import { getCourse, getCourses, LogEntry, defaultLogEntry } from './courseSlice';
import DatePicker from './DatePicker';
import { getStudents } from './studentSlice';
import LogEntryTable from '../logentries/LogEntryTable';
import LogEntryForm from '../logentries/LogEntryForm';

interface MatchParams {
  termId: string;
  courseId: string;
}

const CoursePage: React.FC<RouteComponentProps<MatchParams>> = props => {
  const { termId, courseId } = props.match.params;
  const dispatch = useDispatch();
  const term = useTerm(termId);
  const course = useCourse(termId, courseId);
  const [date, setDate] = useState<Date>(new Date());
  const [lessons, setLessons] = useState<number>(0);
  // const [logEntryFormOpen, setLogEntryFormOpen] = useState(false);
  const [currentLogEntry, setCurrentLogEntry] = useState<LogEntry | null>(null);
  const enrolments = useSelector((state: RootState) => state.enrolments.enrolments[courseId]);
  const students = useSelector((state: RootState) => state.students.students[termId]);
  const classes = useStyles();

  const handleDateChange = (delta: number) => {
    setDate(addDays(date, delta));
  };

  useEffect(() => {
    if (term == null) {
      dispatch(getTerm(termId));
    }

    if (students == null) {
      dispatch(getStudents(termId));
    }

    if (course == null) {
      dispatch(getCourses(termId));
    }

    if (course != null && course.logCourse && course.logEntries.length === 0) {
      dispatch(getCourse(termId, courseId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (course != null && enrolments == null) {
      dispatch(getEnrolments(course));
    }
  }, [dispatch, course, enrolments]);

  useEffect(() => {
    if (term == null || course == null) {
      return;
    }

    const lessons = getLessons({ term, course, date });
    setLessons(lessons);
  }, [term, course, date]);

  if (term == null || course == null || enrolments == null || students == null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Kurs {course.name}</Typography>

      <Fab className={classes.fab} onClick={() => history.push(`/terms/${term.id}/courses/${courseId}/edit`)}>
        <EditIcon />
      </Fab>

      <div color="primary" className={classes.buttons}>
        <Button onClick={() => handleDateChange(-1)} variant="text">
          <ArrowBackIcon />
        </Button>
        <DatePicker date={date} handleDateChange={(date: Date) => setDate(date)} />
        <Button onClick={() => handleDateChange(+1)} variant="text">
          <ArrowForwardIcon />
        </Button>

        <TextField
          label="Stunden"
          size="small"
          type="number"
          inputProps={{ min: 0 }}
          value={lessons}
          onChange={e => setLessons(Number(e.target.value))}
        />
      </div>
      <Divider />

      {course.logCourse && (
        <>
          <Typography variant="h4"><Link to={`/terms/${course.termId}/courses/${course.id}/log_entries`}>Kursheft</Link></Typography>

          <LogEntryTable logEntries={course.logEntries.slice(0, 3)} handleClick={(le) => setCurrentLogEntry(le)} />

          <LogEntryForm
            course={course}
            logEntry={currentLogEntry || defaultLogEntry}
            open={currentLogEntry != null}
            handleClose={() => setCurrentLogEntry(null)}
          />
          <Divider />
        </>
      )}

      <Typography variant="h4">Schülerinnen und Schüler</Typography>
      <EnrolmentTable enrolments={enrolments} students={students} date={date} lessons={lessons} />
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
    fab: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
    },
  })
);

export default CoursePage;
