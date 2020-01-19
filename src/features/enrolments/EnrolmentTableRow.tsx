import { Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { isToday } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';
import history from '../../history';
import { absentOnDate } from '../../utils/enrolmentHelpers';
import { formatDate } from '../../utils/formatter';
import { Student } from '../courses/studentSlice';
import ColorButton from './ColorButton';
import { AbsenceTypes, Enrolment, updateEnrolment } from './enrolmentSlice';
import StyledEnrolmentCell from './StyledEnrolmentCell';
import StyledEnrolmentRow from './StyledEnrolmentRow';

interface Props {
  enrolment: Enrolment;
  student: Student;
  date: Date;
  lessons: number;
  index: number;
}

const EnrolmentTableRow = ({ enrolment, student, index, date, lessons }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAbsence = () => {
    const newAbsence = {
      date,
      lessons,
      type: AbsenceTypes.UNENTSCHULDIGT,
      done: false,
    };

    let newEnrolment = { ...enrolment, absences: [...enrolment.absences, newAbsence] };
    dispatch(updateEnrolment(newEnrolment));
  };

  return (
    <StyledEnrolmentRow
      key={enrolment.id}
      className={classes.row}
      onClick={() =>
        history.push(`/terms/${enrolment.termId}/courses/${enrolment.courseId}/enrolments/${enrolment.id}`)
      }>
      <StyledEnrolmentCell align="right">{index}</StyledEnrolmentCell>

      <StyledEnrolmentCell>
        <Typography variant="body1">
          <b>
            {student.lastname}, {student.firstname}
          </b>
        </Typography>
      </StyledEnrolmentCell>

      <StyledEnrolmentCell align="center">
        {enrolment.absenceCount} / {enrolment.absenceOutstandingCount}
        {lessons > 0 && !absentOnDate(enrolment, date, true) && (
          <ColorButton variant="outlined" onClick={handleAbsence}>
            {isToday(date) ? 'Heute' : formatDate(date)}
          </ColorButton>
        )}
      </StyledEnrolmentCell>

      <StyledEnrolmentCell align="center">
        {enrolment.missingHomeworkCount} / {enrolment.missingHomeworkOutstandingCount}
      </StyledEnrolmentCell>
    </StyledEnrolmentRow>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[400],
      },
    },
  })
);

export default EnrolmentTableRow;
