import { Button } from '@material-ui/core';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import FDatePicker from '../../components/FDatePicker';
import FTextField from '../../components/FTextField';
import history from '../../history';
import { TermBase } from './termSlice';

interface Props {
  initialValues: TermBase;
  handleSubmit: (values: TermBase) => void;
}

const TermForm = (props: Props) => (
  <Formik initialValues={props.initialValues} onSubmit={props.handleSubmit}>
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <Form>
        <Field name="name" label="Name" placeholder="2019/20 2. Hj" component={FTextField} />
        <Field name="start" label="Anfangsdatum" placeholder="01.02.2020" component={FDatePicker} />
        <Field name="end" label="Enddatum" placeholder="13.06.2020" component={FDatePicker} />

        <div>
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
        </div>
      </Form>
    )}
  </Formik>
);

export default TermForm;
