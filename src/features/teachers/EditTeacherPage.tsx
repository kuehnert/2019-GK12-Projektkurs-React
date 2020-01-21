import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import FSelect from '../../components/FSelect';
import FTextField from '../../components/FTextField';
import history from '../../history';
import { states, Teacher, updateTeacher, defaultTeacher } from './teacherSlice';
import Loading from '../../components/Loading';

const validate = (values: Teacher): void | object | Promise<FormikErrors<Teacher>> => {
  const errors: { [key: string]: string } = {};

  if (!values.firstname) {
    errors.firstname = 'Notwendige Angabe';
  }

  if (!values.lastname) {
    errors.lastname = 'Notwendige Angabe';
  }

  if (!values.schoolName) {
    errors.schoolName = 'Notwendige Angabe';
  }

  if (!values.state) {
    errors.state = 'Notwendige Angabe';
  } else if (!states.includes(values.state)) {
    errors.state = 'Ungültiges Bundesland';
  }

  if (!values.email) {
    errors.email = 'Notwendige Angabe';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Ungültige E-Mail-Adresse';
  }

  return errors;
};

export default () => {
  const { teacher, error } = useSelector((state: RootState) => state.teachers);
  const dispatch = useDispatch();
  const classes = useStyles();
  const initialValues = { ...defaultTeacher, ...teacher };

  const handleSubmit = async (values: Teacher) => {
    await dispatch(updateTeacher(values));
    history.push('/terms');
  };

  if (teacher == null) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      {error && <FormHelperText>{error}</FormHelperText>}

      <Formik onSubmit={handleSubmit} initialValues={initialValues} validate={validate}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form className={classes.form}>
            <Field name="firstname" label="Vorname" placeholder="Wilhelm" component={FTextField} />
            <ErrorMessage name="firstname" />

            <Field name="lastname" label="Nachname" placeholder="Lempel" component={FTextField} />
            <ErrorMessage name="lastname" />

            <Field
              name="schoolName"
              label="Name der Schule"
              placeholder="Wilhelm-Busch-Gymnasium Springe"
              component={FTextField}
            />
            <ErrorMessage name="schoolName" />

            <FormControl fullWidth margin="normal">
              <InputLabel>Bundesland</InputLabel>
              <Field name="state" placeholder="Nordrhein-Westfalen" fullWidth margin="dense" component={FSelect}>
                {states.map((i: string) => (
                  <MenuItem value={i} key={i}>
                    {i}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="state" />
            </FormControl>

            <Field
              name="email"
              label="E-Mail"
              placeholder="lehrer.lempel@busch-schule.de"
              component={FTextField}
              autoComplete="off"
            />
            <ErrorMessage name="email" />

            <FormControl fullWidth margin="normal">
              <InputLabel>Anzeige & Sortierung von Schülernamen in Kursen</InputLabel>
              <Field name="sortByLastname" fullWidth margin="dense" component={FSelect}>
                  <MenuItem value="true">Nachname, Vorname</MenuItem>
                  <MenuItem value="false">Vorname Nachname</MenuItem>
                ))}
              </Field>
              <ErrorMessage name="state" />
            </FormControl>

            {/*
            <Field
              name="password"
              label="Altes Passwort"
              type="password"
              component={FTextField}
              autoComplete="new-password"
            />
            <ErrorMessage name="password" />

            <Field
              name="newPassword"
              label="Neues Passwort"
              type="password"
              component={FTextField}
              autoComplete="new-password"
            />
            <ErrorMessage name="newPassword" />
            */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!touched || isSubmitting}>
              Speichern
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    fieldError: {
      border: '2px solid #FF6565',
    },
  })
);
