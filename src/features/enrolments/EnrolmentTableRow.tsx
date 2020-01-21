import { Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { isToday } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../history';
import { absentOnDate, homeworkIssueOnDate, formatName } from '../../utils/enrolmentHelpers';
import { formatDate } from '../../utils/formatter';
import { Student } from '../courses/studentSlice';
import ColorButton from './ColorButton';
import { HomeworkIssue, HomeworkIssueType, AbsenceType, Enrolment, updateEnrolment } from './enrolmentSlice';
import StyledEnrolmentCell from './StyledEnrolmentCell';
import StyledEnrolmentRow from './StyledEnrolmentRow';
import _ from 'lodash';
import { RootState } from '../../app/rootReducer';

interface Props {
  enrolment: Enrolment;
  student: Student;
  date: Date;
  lessons: number;
  index: number;
}

const EnrolmentTableRow = ({ enrolment, student, index, date, lessons }: Props) => {
  const teacher = useSelector((state: RootState) => state.teachers.teacher);
  const classes = useStyles();
  const dispatch = useDispatch();
  const lastAbsence = _.findLast(enrolment.absences, a => a.type === AbsenceType.UNENTSCHULDIGT);

  const lastHomeworkIssue = _.findLast(
    enrolment.homeworkIssues,
    hw => hw.type === HomeworkIssueType.NICHT_GEMACHT || hw.type === HomeworkIssueType.UNVOLLSTAENDIG
  );

  const handleNewAbsence = (event: React.MouseEvent) => {
    event.stopPropagation();

    const newAbsence = {
      date,
      lessons,
      type: AbsenceType.UNENTSCHULDIGT,
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
      newLastAbsence.type = AbsenceType.ENTSCHULDIGT;
      dispatch(updateEnrolment(newEnrolment));
    }
  };

  const handleNewHomeworkIssue = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newHomeworkIssue: HomeworkIssue = {
      date,
      type: HomeworkIssueType.NICHT_GEMACHT,
      weight: 1,
    };

    let newEnrolment: Enrolment = JSON.parse(JSON.stringify(enrolment));
    newEnrolment.homeworkIssues.push(newHomeworkIssue);
    dispatch(updateEnrolment(newEnrolment));
  };

  const handleHomeworkUpdate = (event: React.MouseEvent) => {
    event.stopPropagation();
    let newEnrolment: Enrolment = JSON.parse(JSON.stringify(enrolment));
    let newLastHw = newEnrolment.homeworkIssues.find(a => a.date === lastHomeworkIssue?.date);

    if (newLastHw) {
      newLastHw.type = HomeworkIssueType.NACHGEMACHT;
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
          <b>{formatName(student, String(teacher?.sortByLastname))}</b>
        </Typography>
      </StyledEnrolmentCell>

      <StyledEnrolmentCell align="left" className={lastAbsence && classes.Open}>
        {enrolment.absenceCount} / {enrolment.absenceOpenCount}
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
        {enrolment.homeworkIssueCount} / {enrolment.homeworkIssueOpenCount}
        {lessons > 0 && !homeworkIssueOnDate(enrolment, date) && (
          <ColorButton variant="outlined" onClick={handleNewHomeworkIssue} hoverText="nicht gemacht">
            {isToday(date) ? 'Heute' : formatDate(date)}
          </ColorButton>
        )}
        {lastHomeworkIssue && (
          <ColorButton color="secondary" variant="contained" onClick={handleHomeworkUpdate} hoverText="nachgemacht">
            {formatDate(lastHomeworkIssue.date)}
          </ColorButton>
        )}
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
    Open: {
      background: theme.palette.warning.light,
    },
  })
);

export default EnrolmentTableRow;
