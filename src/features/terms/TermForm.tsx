import { Box, Button } from '@material-ui/core';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import FDatePicker from '../../components/FDatePicker';
import FTextField from '../../components/FTextField';
import history from '../../history';
import { TermBase } from './termSlice';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

interface Props {
  initialValues: TermBase;
  handleSubmit: (values: TermBase) => void;
}

export default (props: Props) => {
  const classes = useStyles();

  return (
    <Formik initialValues={props.initialValues} onSubmit={props.handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form>
          <Field name="name" label="Name" placeholder="2019/20 2. Hj" component={FTextField} />
          <Field name="start" label="Anfangsdatum" placeholder="01.02.2020" component={FDatePicker} />
          <Field name="end" label="Enddatum" placeholder="13.06.2020" component={FDatePicker} />

          <Box className={classes.box}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                history.goBack();
              }}>
              Zurück
            </Button>

            <Button type="submit" disabled={!touched || isSubmitting} color="primary" variant="contained">
              Speichern
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    box: {
      '& > Button': {
        margin: spacing(1),
      },
      textAlign: 'right',
      padding: spacing(1),
    },
  })
);
