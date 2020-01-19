import { DatePicker } from '@material-ui/pickers';
import { getIn } from 'formik';
import React from 'react';

const FDatePicker = (props: any) => {
  const {
    label,
    field,
    form: { touched, errors, setFieldValue },
    ...other
  } = props;
  const errorText = getIn(errors, field.name);
  const touchedVal = getIn(touched, field.name);
  const hasError = touchedVal && errorText !== undefined;
  return (
    <div>
      <DatePicker
        label={label}
        error={hasError}
        helperText={hasError ? errorText : ''}
        onChange={value => setFieldValue(field.name, value)}
        value={field.value}
        margin="normal"
        fullWidth
        format="dd.MM.yyyy"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      />
    </div>
  );
};

export default FDatePicker;
