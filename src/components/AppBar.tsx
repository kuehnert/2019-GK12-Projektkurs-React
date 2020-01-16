import { AppBar, Button, Theme, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import { logout } from '../features/teachers/teacherSlice';
import history from '../history';
import Loading from './Loading';

export default () => {
  const teacher = useSelector((state: RootState) => state.teachers.teacher);
  const classes = useStyles();
  const dispatch = useDispatch();

  if (teacher == null) {
    return <Loading />;
  }

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/');
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="regular">
        <Typography variant="h6" className={classes.title}>
          Mr K.'s Sokrates
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
