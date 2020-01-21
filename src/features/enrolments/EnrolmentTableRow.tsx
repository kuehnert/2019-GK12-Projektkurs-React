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
  const lastAbsence = enrolment.absences.find(a => a.type === AbsenceTypes.UNENTSCHULDIGT);

  const handleNewAbsence = (event: React.MouseEvent) => {
    event.stopPropagation();

    const newAbsence = {
      date,
      lessons,
      type: AbsenceTypes.UNENTSCHULDIGT,
      done: false,
    };

    // TODO: Möglicher Fehler mit Homework!
    let newEnrolment = { ...enrolment, absences: [...enrolment.absences, newAbsence] };
    dispatch(updateEnrolment(newEnrolment));
  };

  const handleApology = (event: React.MouseEvent) => {
    event.stopPropagation();
    let newEnrolment: Enrolment = JSON.parse(JSON.stringify(enrolment));
    let newLastAbsence = newEnrolment.absences.find(a => a.date === lastAbsence?.date);

    if (newLastAbsence) {
      newLastAbsence.type = AbsenceTypes.ENTSCHULDIGT;
      dispatch(updateEnrolment(newEnrolment));
    }
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

      <StyledEnrolmentCell align="left" className={lastAbsence && classes.outstanding}>
        {enrolment.absenceCount} / {enrolment.absenceOutstandingCount}
        {lessons > 0 && !absentOnDate(enrolment, date) && (
          <ColorButton variant="outlined" onClick={handleNewAbsence} hoverText="fehlt">
            {isToday(date) ? 'Heute' : formatDate(date)}
          </ColorButton>
        )}
        {lastAbsence && (
          <ColorButton color="secondary" variant="contained" onClick={handleApology} hoverText="entsch.">
            {formatDate(lastAbsence.date)}
          </ColorButton>
        )}
      </StyledEnrolmentCell>

      <StyledEnrolmentCell align="left">
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
    outstanding: {
      background: theme.palette.warning.light,
    },
  })
);

export default EnrolmentTableRow;
