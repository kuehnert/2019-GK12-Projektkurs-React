import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Course, deleteCourse, updateCourse } from './courseSlice';
import FDatePicker from '../../components/FDatePicker';
import FTextField from '../../components/FTextField';
import FCheckbox from '../../components/FCheckbox';
import { useDispatch } from 'react-redux'

interface Props {
  open: boolean;
  termId: string;
  initialValues: Course;
  handleClose: () => void;
}

const CourseDialog = (props: Props) => {
  const dispatch = useDispatch();

  const handleSubmit = (values: Course, actions: any) => {
    dispatch(updateCourse(props.termId, values));
    props.handleClose();
  }

  const handleDelete = (event: any): void => {
    // event.preventDefault();
    dispatch(deleteCourse(props.termId, props.initialValues.id));
    props.handleClose();
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <Formik
        initialValues={props.initialValues}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form>
            <DialogTitle id="form-dialog-title">Kurs bearbeiten</DialogTitle>
            <DialogContent>
              <DialogContentText>Bearbeiten Sie hier die Daten des Kurses.</DialogContentText>

              <Field name="name" label="Name" placeholder="2019/20 2. Hj" component={FTextField} />
              <Field name="year" label="Jahrgang" placeholder="5" component={FTextField} />
              <Field name="end" label="Enddatum" placeholder="01.02.2020" component={FDatePicker} />
              <Field name="logCourse" component={FCheckbox} label="Kursheft führen" />
              <Field name="logAbsences" component={FCheckbox} label="Anwesenheit nachhalten" />
              <Field name="logHomework" component={FCheckbox} label="Fehlende Hausaufgaben nachhalten" />
            </DialogContent>

            <DialogActions>
              <Button onClick={props.handleClose} color="primary">
                Abbrechen
              </Button>
              <Button onClick={handleDelete} color="secondary" variant="contained">
                Löschen
              </Button>
              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                Speichern
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CourseDialog;
