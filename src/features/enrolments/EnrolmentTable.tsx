import { Table, TableBody, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Student } from '../courses/studentSlice';
import { Enrolment } from './enrolmentSlice';
import EnrolmentTableRow from './EnrolmentTableRow';
import StyledEnrolmentCell from './StyledEnrolmentCell';
import { Course } from '../courses/courseSlice';

interface Props {
  course: Course;
  enrolments: Enrolment[];
  students: { [id: string]: Student };
  date: Date;
  lessons: number;
}

export default ({ course, enrolments, students, date, lessons }: Props) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledEnrolmentCell align="center">Nr.</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Name</StyledEnrolmentCell>
            {course.logAbsences && (
              <StyledEnrolmentCell align="center">Fehlstunden (Unentschuldigt)</StyledEnrolmentCell>
            )}
            {course.logHomework && <StyledEnrolmentCell align="center">Fehlende Hausaufgaben</StyledEnrolmentCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {enrolments.map((e, i) => (
            <EnrolmentTableRow
              key={e.id}
              course={course}
              enrolment={e}
              student={students[e.studentId]}
              index={i + 1}
              date={date}
              lessons={lessons}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    row: {
      '&:hover': {
        backgroundColor: theme.palette.grey[400],
      },
    },
  })
);
