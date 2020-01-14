import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, Typography, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box className={classes.box}>
        <img src="/student_tracking.png" alt="" />
      </Box>

      <Box className={classes.box}>
        <Typography variant="h3">Willkommen bei der Schülerverwaltung Sokrates!</Typography>
      </Box>

      <Box className={classes.box}>
        <Button component={Link} variant="contained" color="default" to="/signup">
          Registrieren
        </Button>

        <Button component={Link} variant="contained" color="primary" to="/login">
          Anmelden
        </Button>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      height: '100vh',
      textAlign: 'center',
      padding: spacing(3),
    },
    box: {
      '& a': {
        margin: spacing(1),
      },
      padding: spacing(2),
    },
  })
);
