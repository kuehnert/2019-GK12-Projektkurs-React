import { Fab, Table, TableBody, TableCell, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import history from '../../history';
import { useCourse, useTerm } from '../../utils/selectors';
import { getTerm } from '../terms/termSlice';
import { getCourses } from './courseSlice';
import { getEnrolments } from './enrolmentSlice';
import { getStudents } from './studentSlice';

interface MatchParams {
  termId: string;
  courseId: string;
}

export default (props: RouteComponentProps<MatchParams>) => {
  const { termId, courseId } = props.match.params;
  const dispatch = useDispatch();
  const term = useTerm(termId);
  const course = useCourse(termId, courseId);
  const enrolments = useSelector((state: RootState) => state.enrolments.enrolments[courseId]);
  const students = useSelector((state: RootState) => state.students.students[termId]);
  const classes = useStyles();

  useEffect(() => {
    if (term == null) {
      dispatch(getTerm(termId));
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

  if (term == null || course == null || enrolments == null) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">Kurs {course.name}</Typography>
      <Fab className={classes.fab} onClick={() => history.push(`/terms/${term.id}/courses/${courseId}/edit`)}>
        <EditIcon />
      </Fab>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nr.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Fehlstunden (Unentschuldigt)</TableCell>
            <TableCell>Fehlende Hausaufgaben</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {enrolments.map((e, i) => {
            const student = students[e.studentId];

            return (
              <TableRow key={e.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{student.lastname}, {student.firstname}</TableCell>
                <TableCell>0 / 0</TableCell>
                <TableCell>0 / 0</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
