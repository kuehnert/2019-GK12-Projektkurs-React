import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { Course } from '../features/courses/courseSlice';
import history from '../history';
import { useTerm, useTermParams } from '../utils/selectors';
import { BookOutlined as BookIcon, Event as EventIcon } from '@material-ui/icons';

export default () => {
  const classes = useStyles();
  const { termId, courseId } = useTermParams();
  const term = useTerm(termId);
  const courses = useSelector((state: RootState) => state.courses.courses[termId]);

  const renderCourses = () => {
    return courses.map((c: Course) => (
      <ListItem
        key={c.id}
        button
        selected={c.id === courseId}
        onClick={() => history.push(`/terms/${termId}/courses/${c.id}`)}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={c.name} />
      </ListItem>
    ));
  };

  const renderTermItems = () => {
    return (
      <>
        <ListItem button key="timetable" onClick={() => history.push(`/terms/${termId}`)}>
          <ListItemIcon>
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
      <List>
        <ListItem button key="terms" onClick={() => history.push('/terms')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Halbjahre" />
        </ListItem>

        {term && renderTermItems()}
      </List>

      {/* <Divider /> */}
    </Drawer>
  );
};

const drawerWidth = 200;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  })
);
