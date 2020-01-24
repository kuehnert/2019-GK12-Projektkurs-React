import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BookOutlined as BookIcon, ExpandLess, ExpandMore, Edit as EditIcon } from '@material-ui/icons';
import React from 'react';
import { Course } from '../features/courses/courseSlice';
import history from '../history';

export interface Props {
  course: Course;
  currentId: string;
}

const CourseDrawer: React.FC<Props> = ({ course, currentId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(course.id === currentId);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        key={course.id}
        button
        selected={course.id === currentId}
        onClick={event => {
          event.stopPropagation();
          setOpen(true);
          history.push(`/terms/${course.termId}/courses/${course.id}`);
        }}>
        <ListItemIcon className={classes.icon}>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={course.name} />
        <div onClick={handleClick}>{open ? <ExpandLess /> : <ExpandMore />}</div>
      </ListItem>

      <Collapse in={open && course.id === currentId} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {course.logCourse && (
            <ListItem
              button
              onClick={() => history.push(`/terms/${course.termId}/courses/${course.id}/log_entries`)}
              className={classes.nested}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Kursheft" />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => history.push(`/terms/${course.termId}/courses/${course.id}/edit`)}
            className={classes.nested}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Bearbeiten" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

const drawerWidth = 220;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      '@media print': {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    icon: {
      minWidth: '36px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    toolbar: theme.mixins.toolbar,
  })
);

export default CourseDrawer;
