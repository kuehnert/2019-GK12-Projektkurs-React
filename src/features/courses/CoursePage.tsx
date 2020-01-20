import { Button, Fab, TextField, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, Edit as EditIcon } from '@material-ui/icons';
import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import history from '../../history';
import { getLessons } from '../../utils/courseHelpers';
import { useCourse, useTerm } from '../../utils/hooks';
import { getEnrolments } from '../enrolments/enrolmentSlice';
import EnrolmentTable from '../enrolments/EnrolmentTable';
import { getTerm } from '../terms/termSlice';
import { getCourses } from './courseSlice';
import DatePicker from './DatePicker';
import { getStudents } from './studentSlice';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (course != null) {
      dispatch(getEnrolments(course));
    }
  }, [course, dispatch]);

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

      <EnrolmentTable enrolments={enrolments} students={students} date={date} lessons={lessons} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    buttons: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      background: 'white',
    },
  })
);

export default CoursePage;
