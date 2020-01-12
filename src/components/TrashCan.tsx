import { Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDrop } from 'react-dnd';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../app/rootReducer';

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return 'darkgreen';
  } else if (canDrop) {
    return '#efe';
  } else {
    return 'white';
  }
}

const useStyles = makeStyles(({ palette }: Theme) => createStyles({}));

const TrashCan: React.FC<Props> = ({ lesson, weekday, period, termId }: Props) => {
  const classes = useStyles();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'Lesson',
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

  return (
    <TableCell ref={drop} style={{ backgroundColor }} className={classes.lessonBlank}>
      <Typography>{isActive ? 'Neue Stunde' : '-'}</Typography>
    </TableCell>
  );
};

export default TrashCan;
