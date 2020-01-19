import { Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import { useCourse, useTerm } from '../../utils/selectors';
import { getCourses } from '../courses/courseSlice';
import { getStudents } from '../courses/studentSlice';
import { getTerm } from '../terms/termSlice';
import AbsenceTable from './AbsenceTable';
import { getEnrolments } from './enrolmentSlice';

interface MatchParams {
  termId: string;
  courseId: string;
  enrolmentId: string;
}

const EnrolmentPage: React.FC<RouteComponentProps<MatchParams>> = props => {
  const { termId, courseId, enrolmentId } = props.match.params;
  const classes = useStyles();
  const dispatch = useDispatch();
  const term = useTerm(termId);
  const course = useCourse(termId, courseId);
  const enrolment = useSelector((state: RootState) =>
    state.enrolments.enrolments[courseId]?.find(e => e.id === enrolmentId)
  );
  const students = useSelector((state: RootState) => state.students.students[termId]);

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
    if (enrolment == null && course != null) {
      dispatch(getEnrolments(course));
    }
  }, [dispatch, course, enrolment]);

  if (enrolment == null) {
    return <Loading />;
  }

  const student = students[enrolment.studentId];

  return (
    <div className={classes.root}>
      <Typography variant="h2">
        {student.firstname} {student.lastname} ({student.formGroup})
      </Typography>

      <AbsenceTable enrolment={enrolment} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    paper: { marginTop: theme.spacing(2), marginBottom: theme.spacing(2) },
  })
);

export default EnrolmentPage;
