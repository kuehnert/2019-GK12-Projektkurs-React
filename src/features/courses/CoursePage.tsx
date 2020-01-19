import {
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
  TableContainer,
  Button,
} from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
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

      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nr.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Fehlstunden (Unentschuldigt)</StyledTableCell>
              <StyledTableCell>Fehlende Hausaufgaben</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {enrolments.map((e, i) => {
              const student = students[e.studentId];

              return (
                <StyledTableRow key={e.id} className={classes.row}>
                  <StyledTableCell align="right">{i + 1}</StyledTableCell>
                  <StyledTableCell>
                    {student.lastname}, {student.firstname}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {e.absenceCount} / {e.absenceOutstandingCount}
                    <ColorButton variant="outlined">Heute</ColorButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {e.missingHomeworkCount} / {e.missingHomeworkOutstandingCount}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: '1rem',

    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  },
}))(Button);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.paper,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {},
    table: {},
    row: {
      '&:hover': {
        backgroundColor: theme.palette.grey[400],
      },
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      background: 'white',
    },
  })
);
