import { Table, TableCell, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import Time from '../../components/Time';
import history from '../../history';
import { getCourses } from '../courses/courseSlice';
import { Lesson, Period } from '../terms/termSlice';
import { Term } from './termSlice';

type Props = { term: Term };

const Timetable = ({ term }: Props) => {
  const dispatch = useDispatch()
  const courses = useSelector((state: RootState) => state.courses.courses[term.id]);
  const classes = useStyles();
  const periods = term?.periods || [];

  useEffect(() => {
    if (courses == null) {
      dispatch(getCourses(term.id));
    }
  }, [courses, dispatch, term.id]);

  const timetable: { [key: string]: Lesson } = {};

  term?.lessons.forEach(l => {
    timetable[`${l.weekday},${l.periodNo}`] = l;
  });

  const renderPeriods = () => {
    return periods.map((period: Period) => (
      <TableRow key={period.number}>
        <TableCell className={classes.period} align="center">
          <Typography variant="h6">{period.name}</Typography>
          <Time time={period.start} />-<Time time={period.end} />
        </TableCell>
        {[0, 1, 2, 3, 4, 5].map(weekday => {
          const lesson = timetable[`${weekday},${period.number}`];

          if (lesson != null) {
            const course = courses.find(c => c.id === lesson.courseId);
            console.log('course', course);

            return (
              <TableCell
                key={weekday}
                className={classes.lesson}
                align="center"
                onClick={() => history.push(`/terms/${term?.id}/courses/${lesson.courseId}`)}>
                <Typography variant="body1">{course?.name}</Typography>
                <Typography variant="caption">{lesson.room}</Typography>
              </TableCell>
            );
          } else {
            return <TableCell key={weekday} className={classes.lessonBlank} />;
          }
        })}
      </TableRow>
    ));
  };

  if (courses == null) {
    return <Loading />;
  }

  return (
    <div>
      <Typography variant="h5">Stundenplan</Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.period}>Stunde</TableCell>
            <TableCell className={classes.period}>Montag</TableCell>
            <TableCell className={classes.period}>Dienstag</TableCell>
            <TableCell className={classes.period}>Mittwoch</TableCell>
            <TableCell className={classes.period}>Donnerstag</TableCell>
            <TableCell className={classes.period}>Freitag</TableCell>
            <TableCell className={classes.period}>Samstag</TableCell>
          </TableRow>
        </TableHead>
        <tbody>{renderPeriods()}</tbody>
      </Table>
    </div>
  );
};

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    lesson: {
      background: palette.primary.main,
      color: palette.primary.contrastText,
      cursor: 'pointer',
      border: '1px solid rgba(100, 100, 100, 1)',
    },
    lessonBlank: {
      background: palette.text.disabled,
      border: '1px solid rgba(100, 100, 100, 1)',
    },
    period: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      textAlign: 'center',
      border: '1px solid rgba(100, 100, 100, 1)',
    },
    periodName: {
      fontSize: '2rem',
    },
  })
);

export default Timetable;
