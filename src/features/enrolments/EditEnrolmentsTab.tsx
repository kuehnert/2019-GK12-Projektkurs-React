import { Checkbox, Table, TableBody, TableContainer, TableHead, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import { formatName } from '../../utils/enrolmentHelpers';
import { useTeacher } from '../../utils/hooks';
import { Course } from '../courses/courseSlice';
import { getStudents } from '../courses/studentSlice';
import { Teacher } from '../teachers/teacherSlice';
import { Enrolment, getEnrolments, updateEnrolment, updateEnrolments } from './enrolmentSlice';
import StyledEnrolmentCell from './StyledEnrolmentCell';
import StyledEnrolmentRow from './StyledEnrolmentRow';

interface Props {
  course: Course;
}

const EditEnrolmentsTab: React.FC<Props> = ({ course }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const teacher = useTeacher() as Teacher;
  const [allChecked, setAllChecked] = useState(false);
  const enrolments = useSelector((state: RootState) => state.enrolments.enrolments[course.id]);
  const students = useSelector((state: RootState) => state.students.students[course.termId]);

  const handleChangeAll = () => {
    const data = enrolments.map(enrolment => ({
      id: enrolment.id,
      termId: enrolment.termId,
      courseId: enrolment.courseId,
      studentId: enrolment.studentId,
      writesExams: !allChecked,
    }));

    setAllChecked(!allChecked);
    dispatch(updateEnrolments(data));
  };

  const handleChange = (enrolment: Enrolment) => {
    const data = {
      id: enrolment.id,
      termId: enrolment.termId,
      courseId: enrolment.courseId,
      studentId: enrolment.studentId,
      writesExams: !enrolment.writesExams,
    };

    dispatch(updateEnrolment(data));
  };

  useEffect(() => {
    if (enrolments == null) {
      dispatch(getEnrolments(course));
    }

    if (students == null) {
      dispatch(getStudents(course.termId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (students == null || enrolments == null) {
    return <Loading />;
  }

  const enrolmentRow = (enrolment: Enrolment, index: number) => {
    const student = students[enrolment.studentId];
    return (
      <StyledEnrolmentRow key={enrolment.id}>
        <StyledEnrolmentCell align="right">
          <Typography variant="body2">{index}</Typography>
        </StyledEnrolmentCell>
        <StyledEnrolmentCell>{formatName(student, String(teacher.sortByLastname))}</StyledEnrolmentCell>
        <StyledEnrolmentCell align="center">
          <Checkbox
            name="writesExams"
            id="writesExams"
            checked={enrolment.writesExams}
            className={classes.checkbox}
            onChange={() => handleChange(enrolment)}
          />
        </StyledEnrolmentCell>
      </StyledEnrolmentRow>
    );
  };

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <StyledEnrolmentRow>
            <StyledEnrolmentCell>Nr.</StyledEnrolmentCell>
            <StyledEnrolmentCell>Name</StyledEnrolmentCell>
            <StyledEnrolmentCell>
              Schriftlich{' '}
              <Checkbox
                name="allChecked"
                id="allChecked"
                checked={allChecked}
                className={classes.checkbox}
                onChange={() => handleChangeAll()}
                style={{ color: 'white' }}
              />
            </StyledEnrolmentCell>
          </StyledEnrolmentRow>
        </TableHead>
        <TableBody>{enrolments.map((e, i) => enrolmentRow(e, i + 1))}</TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      margin: spacing(2),
    },
    checkbox: {
      padding: 0,
      margin: 0,
    },
  })
);

export default EditEnrolmentsTab;
