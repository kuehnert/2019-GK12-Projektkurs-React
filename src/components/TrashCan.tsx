import { Card, CardContent, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDrop } from 'react-dnd';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return 'darkgreen';
  } else if (canDrop) {
    return '#efe';
  } else {
    return '#eee';
  }
}

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    trashCan: {
      marginTop: spacing(2),
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    content: {
    },
    icon: {
      fontSize: 64,
    },
  })
);

const TrashCan: React.FC = () => {
  const classes = useStyles();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'Lesson',
    drop: () => ({
      type: 'TrashCan',
    }),
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  const backgroundColor = selectBackgroundColor(isActive, canDrop);

  return (
    <Card ref={drop} style={{ backgroundColor }} className={classes.trashCan}>
      <CardContent className={classes.content}>
        <DeleteOutlinedIcon className={classes.icon}></DeleteOutlinedIcon>
        <Typography variant="body2">Entfernen</Typography>
      </CardContent>
    </Card>
  );
};

export default TrashCan;
