import { Avatar, Box, Button, Container, CssBaseline, FormHelperText, Grid, Link, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from '../../app/rootReducer';
import FTextField from '../../components/FTextField';
import history from '../../history';
import { signUp, SignUpValues } from './teacherSlice';

const initialValues = {
  firstname: '',
  lastname: '',
  schoolName: '',
  state: '',
  email: '',
  password: '',
};

const validate = (values: SignUpValues): void | object | Promise<FormikErrors<SignUpValues>> => {
  const errors: { [key: string]: string } = {};

  if (!values.firstname) {
    errors.firstname = 'Notwendig';
  }

  if (!values.lastname) {
    errors.lastname = 'Notwendig';
  }

  if (!values.schoolName) {
    errors.schoolName = 'Notwendig';
  }

  if (!values.state) {
    errors.state = 'Notwendig';
  }

  if (!values.email) {
    errors.email = 'Notwendig';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Ungültige E-Mail-Adresse';
  }

  return errors;
};

export default () => {
  const { error } = useSelector((state: RootState) => state.teachers);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = async (values: SignUpValues) => {
    await dispatch(signUp(values));
    history.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bei Sokrates registrieren
        </Typography>

        {error && <FormHelperText>{error}</FormHelperText>}

        <Formik onSubmit={handleSubmit} initialValues={initialValues} validate={validate}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className={classes.form}>
              <Field name="firstname" label="Vorname" placeholder="Wilhelm" component={FTextField} />
              <ErrorMessage name="firstname" />

              <Field name="lastname" label="Nachname" placeholder="Lempel" component={FTextField} />
              <Field
                name="schoolName"
                label="Name der Schule"
                placeholder="Wilhelm-Busch-Gymnasium Springe"
                component={FTextField}
              />
              <Field name="state" label="Bundesland" placeholder="Lempel" component={FTextField} />
              <Field name="email" label="E-Mail" placeholder="lehrer.lempel@busch-schule.de" component={FTextField} />
              <Field name="password" label="Passwort" type="password" component={FTextField} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!touched || isSubmitting}>
                Anmelden
              </Button>
            </Form>
          )}
        </Formik>

        <Grid container>
          <Grid item xs>
          <Link component={RouterLink} to="#" variant="body2">
              Passwort vergessen?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Schon ein Konto? Hier anmelden.
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>{' '}
    </Container>
  );
};

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Entwickelt in Leverkusen von Matthias Kühnert
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);
