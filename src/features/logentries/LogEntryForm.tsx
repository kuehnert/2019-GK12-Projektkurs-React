import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@material-ui/core';
import { Form, Formik, FormikValues } from 'formik';
import { Checkbox, TextField } from 'formik-material-ui';
import React from 'react';
import { useDispatch } from 'react-redux';
import { formatDate } from '../../utils/formatter';
import { Course, LogEntry, updateCourse } from '../courses/courseSlice';

interface Props {
  open: boolean;
  course: Course;
  logEntry: LogEntry;
  handleClose: () => void;
}

const LogEntryForm: React.FC<Props> = ({ course, logEntry, handleClose, open }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values: FormikValues) => {
    const newEntry: LogEntry = { ...logEntry, ...values };
    const newCourse: Course = JSON.parse(JSON.stringify(course));
    const index = newCourse.logEntries.findIndex(le => le.id === logEntry?.id);

    if (index >= 0) {
      newCourse.logEntries[index] = newEntry;
    } else {
      newCourse.logEntries.push(newEntry);
    }

    dispatch(updateCourse(course.termId, newCourse));
    handleClose();
  };

  const handleDelete = () => {
    const newCourse: Course = JSON.parse(JSON.stringify(course));
    const index = newCourse.logEntries.findIndex(le => le.id === logEntry?.id);

    if (index >= 0) {
      newCourse.logEntries.splice(index, 1);
      dispatch(updateCourse(course.termId, newCourse));
      handleClose();
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        Eintrag im Kursheft für den {formatDate(logEntry?.date)} bearbeiten
      </DialogTitle>

      <Formik initialValues={logEntry} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form>
            <DialogContent>
              <DialogContentText>Geben Sie die Daten für den Kurshefteintrag ein.</DialogContentText>

              <TextField name="lessons" label="Schulstunden" type="number" fullWidth inputProps={{ min: 0 }} />
              <TextField name="plan" label="Inhalt der Stunde" type="text" fullWidth multiline autoFocus />
              <TextField name="homework" label="Hausaufgaben" type="text" fullWidth multiline />
              <TextField name="notes" label="Notizen" type="text" fullWidth multiline />
              <FormControlLabel label="Stunde ausgefallen" control={<Checkbox name="cancelled" />} />
              <FormControlLabel label="Eintrag abgeschlossen" control={<Checkbox name="done" />} />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="default">
                Abbrechen
              </Button>
              <Button type="button" color="secondary" variant="contained" onClick={handleDelete}>
                Löschen
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Speichern
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default LogEntryForm;
