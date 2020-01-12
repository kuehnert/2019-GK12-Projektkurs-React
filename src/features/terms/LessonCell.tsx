import { TableCell, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Lesson, Period, deleteLesson, updateLesson } from './termSlice';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

interface Props {
  lesson: Lesson;
  weekday: number;
  period: Period;
  termId: string;
}

export interface DustbinProps {
  allowedDropEffect: string;
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean, hasLesson: boolean) {
  if (isActive) {
    return 'darkgreen';
  } else if (canDrop) {
    return '#efe';
  } else if (hasLesson) {
    return 'lightblue';
  } else {
    return 'white';
  }
}

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    lesson: {
      // background: palette.primary.main,
      color: 'black',
      cursor: 'pointer',
      border: '1px solid rgba(100, 100, 100, 1)',
      textAlign: 'center',
      width: '10%',
    },
    lessonBlank: {
      // background: palette.text.disabled,
      border: '1px solid rgba(100, 100, 100, 1)',
      textAlign: 'center',
      width: '15%',
    },
  })
);

const LessonCell: React.FC<Props> = ({ lesson, weekday, period, termId }: Props) => {
  const courses = useSelector((state: RootState) => state.courses.courses[termId]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['Course', 'Lesson'],
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
  const item = { weekday, period, movingLesson: lesson, type: 'Lesson' };
  const [{ opacity }, drag] = useDrag({
    item,
    end(item: { movingLesson: Lesson } | undefined, monitor: DragSourceMonitor) {
      const dropResult: any = monitor.getDropResult();
      // console.log('item', item);
      // console.log('dropResult', dropResult);

      if (item?.movingLesson && dropResult.type === 'TrashCan') {
        dispatch(deleteLesson(termId, item.movingLesson));
      } else if (item && dropResult) {
        dispatch(
          updateLesson(termId, item.movingLesson, { weekday: dropResult.weekday, periodNo: dropResult.period.number })
        );
      }
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const isActive = canDrop && isOver;
  const hasLesson = lesson != null;
  const backgroundColor = selectBackgroundColor(isActive, canDrop, hasLesson);

  if (courses == null) {
    return null;
  } else if (hasLesson) {
    const course = courses.find(c => c.id === lesson.courseId);

    return (
      <TableCell ref={drop} style={{ backgroundColor }} className={classes.lesson}>
        <div ref={drag} style={{ opacity }}>
          <Typography variant="body2">{course?.name}</Typography>
          <Typography variant="caption">{lesson.room}</Typography>
        </div>
      </TableCell>
    );
  } else {
    return (
      <TableCell ref={drop} style={{ backgroundColor }} className={classes.lessonBlank}>
        <Typography>{isActive ? 'Neue Stunde' : ''}</Typography>
      </TableCell>
    );
  }
};

export default LessonCell;
