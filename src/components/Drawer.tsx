import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Event as EventIcon, List as ListIcon } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Course } from '../features/courses/courseSlice';
import history from '../history';
import { useTerm, useTermParams } from '../utils/hooks';
import CourseDrawer from './CourseDrawer';

export default () => {
  const classes = useStyles();
  const { termId, courseId } = useTermParams();
  const term = useTerm(termId);
  const courses = useSelector((state: RootState) => state.courses.courses[termId]);

  const renderCourses = () => {
    return courses.map((c: Course) => <CourseDrawer key={c.id} course={c} currentId={courseId} />);
  };

  const renderTermItems = () => {
    return (
      <>
        <ListItem button key="timetable" onClick={() => history.push(`/terms/${termId}`)}>
          <ListItemIcon className={classes.icon}>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary={term?.name} />
        </ListItem>

        <Divider />

        {courses && renderCourses()}
      </>
    );
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}>
      <div className={classes.toolbar} />
      <List component="nav">
        <ListItem button key="terms" onClick={() => history.push('/terms')}>
          <ListItemIcon className={classes.icon}>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Halbjahre" />
        </ListItem>

        {term && renderTermItems()}
      </List>

      {/* <Divider /> */}
    </Drawer>
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
    toolbar: theme.mixins.toolbar,
  })
);
