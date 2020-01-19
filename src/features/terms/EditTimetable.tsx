import { Table, TableCell, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import React from 'react';
import Loading from '../../components/Loading';
import { Lesson, Period, Term } from './termSlice';
import LessonCell from './LessonCell';

interface Props {
  termId: string;
}

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    table: {
      tableLayout: 'fixed',
    },
    period: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      textAlign: 'center',
      border: '1px solid rgba(100, 100, 100, 1)',
      width: '50%',
    },
    header: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      textAlign: 'center',
      border: '1px solid rgba(100, 100, 100, 1)',
      width: '100%',
    },
  })
);

export default function EditTimetable({ termId }: Props) {
  const term = useSelector((state: RootState) => state.terms.terms?.find((term: Term) => term.id === termId));
  const classes = useStyles();

  const renderPeriods = () => {
    const periods = term?.periods || [];
    const lessons = term?.lessons || [];
    const timetable: { [key: string]: Lesson } = {};

    lessons.forEach(l => timetable[`${l.weekday},${l.periodNo}`] = l);

    return periods.map((period: Period) => (
      <TableRow key={period.number}>
        <TableCell className={classes.period} align="center">
          <Typography variant="body1">{period.name}</Typography>
          {/* <Time time={period.start} />-<Time time={period.end} /> */}
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
    <Table size="small" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.period}>Std</TableCell>
          <TableCell className={classes.header}>Mo</TableCell>
          <TableCell className={classes.header}>Di</TableCell>
          <TableCell className={classes.header}>Mi</TableCell>
          <TableCell className={classes.header}>Do</TableCell>
          <TableCell className={classes.header}>Fr</TableCell>
          <TableCell className={classes.header}>Sa</TableCell>
        </TableRow>
      </TableHead>
      <tbody>{renderPeriods()}</tbody>
    </Table>
  );
}
