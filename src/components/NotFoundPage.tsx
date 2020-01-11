import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));

function NotFoundPage({ location }: any): any {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        Seite nicht gefunden
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {location.pathname}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Das hätte nicht passieren dürfen. Die gewünschte Seite gibt es nicht.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        <Link to="/">Zurück zur Hauptseite</Link>
      </Typography>
    </Container>
  );
}

export default NotFoundPage;
