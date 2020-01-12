import { TableCell, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Lesson, Period } from './termSlice';
import { useDrop } from 'react-dnd';

interface Props {
  lesson: Lesson;
  weekday: number;
  period: Period;
}

export interface DustbinProps {
  allowedDropEffect: string;
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return 'darkgreen';
  } else if (canDrop) {
    return '#efe';
  } else {
    return 'white';
  }
}

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
      textAlign: 'center',
    },
  })
);

const LessonCell: React.FC<Props> = ({ lesson, weekday, period }: Props) => {
  const classes = useStyles();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'Course',
    drop: () => ({
      weekday,
      period,
      oldLesson: lesson,
    }),
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);

  if (lesson != null) {
    return (
      <TableCell ref={drop} style={{ backgroundColor }} className={classes.lesson}>
        <Typography variant="body1">{lesson.courseId}</Typography>
        <Typography variant="caption">{lesson.room}</Typography>
      </TableCell>
    );
  } else {
    return (
      <TableCell ref={drop} style={{ backgroundColor }} className={classes.lessonBlank}>
        <Typography>{isActive ? 'Neue Stunde' : '-'}</Typography>
      </TableCell>
    );
  }
};

export default LessonCell;
