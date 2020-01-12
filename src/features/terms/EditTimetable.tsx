import { Table, TableCell, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import React from 'react';
import Loading from '../../components/Loading';
import Time from '../../components/Time';
import { Lesson, Period, Term } from './termSlice';
import LessonCell from './LessonCell';

interface Props {
  termId: string;
}

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    period: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      textAlign: 'center',
      border: '1px solid rgba(100, 100, 100, 1)',
      fontSize: '0.7rem',
    },
    periodName: {
      fontSize: '2rem',
    },
    header: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      textAlign: 'center',
      border: '1px solid rgba(100, 100, 100, 1)',
      width: '15%',
    },
  })
);

export default function EditTimetable({ termId }: Props) {
  const term = useSelector((state: RootState) => state.terms.terms?.find((term: Term) => term.id === termId));
  // const courses = useSelector((state: RootState) => state.courses.courses[termId]);
  const classes = useStyles();

  const renderPeriods = () => {
    const periods = term?.periods || [];
    const lessons = term?.lessons || [];
    const timetable: { [key: string]: Lesson } = {};

    lessons.forEach(l => timetable[`${l.weekday},${l.periodNo}`] = l);

    return periods.map((period: Period) => (
      <TableRow key={period.number}>
        <TableCell className={classes.period} align="center">
          <Typography variant="h6">{period.name}</Typography>
          <Time time={period.start} />-<Time time={period.end} />
        </TableCell>
        {[0, 1, 2, 3, 4, 5].map(weekday => {
          const lesson = timetable[`${weekday},${period.number}`];
          return <LessonCell key={`${weekday}|${period}`} weekday={weekday} period={period} lesson={lesson} termId={termId} />;
        })}
      </TableRow>
    ));
  };

  if (term == null) {
    return <Loading />;
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell className={classes.header}>Stunde</TableCell>
          <TableCell className={classes.header}>Montag</TableCell>
          <TableCell className={classes.header}>Dienstag</TableCell>
          <TableCell className={classes.header}>Mittwoch</TableCell>
          <TableCell className={classes.header}>Donnerstag</TableCell>
          <TableCell className={classes.header}>Freitag</TableCell>
          <TableCell className={classes.header}>Samstag</TableCell>
        </TableRow>
      </TableHead>
      <tbody>{renderPeriods()}</tbody>
    </Table>
  );
}
