import { AppBar, Button, IconButton, Theme, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/rootReducer';
import history from '../history';
import Loading from './Loading';
import { logout } from '../features/teachers/teacherSlice';

export default () => {
  const teacher = useSelector((state: RootState) => state.teachers.teacher);
  const classes = useStyles();
  const dispatch = useDispatch();

  if (teacher == null) {
    return <Loading />;
  }

  // if (term != null) {
  //   history.push(`/terms/${term.id}`);
  //   return <div />;
  // }

  const handleLogout = async () => {
    await dispatch(logout());
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Mr K.'s Sokrates
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.contrastText,
      background: theme.palette.secondary.main,
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
