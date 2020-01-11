// source: https://github.com/gerhat/material-ui-formik-components/blob/master/src/TextField/TextField.jsx
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getIn } from 'formik';

const FTextField = ({ label, field, form: { dirty, touched, errors }, ...other }: any) => {
  const errorText = getIn(errors, field.name);
  const touchedVal = getIn(touched, field.name);
  const hasError = dirty && touchedVal && errorText !== undefined;

  return (
    <div>
      <TextField
        label={label}
        error={hasError}
        helperText={hasError ? errorText : ''}
        {...field}
        {...other}
        margin="normal"
        fullWidth
      />
    </div>
  );
};

export default FTextField;

// import * as React from 'react';
// import MuiTextField, {
//   TextFieldProps as MuiTextFieldProps,
// } from '@material-ui/core/TextField';
// import { FieldProps, getIn } from 'formik';

// export type TextFieldProps = FieldProps &
//   Omit<MuiTextFieldProps, 'error' | 'name' | 'onChange' | 'value'> & {
//     // Fix for the type for variant which is using union
//     // https://stackoverflow.com/questions/55664421
//     variant: 'standard' | 'filled' | 'outlined' | undefined;
//   };

// export const fieldToTextField = ({
//   field,
//   form,
//   disabled,
//   ...props
// }: TextFieldProps): MuiTextFieldProps => {
//   const { name } = field;
//   const { touched, errors, isSubmitting } = form;

//   const fieldError = getIn(errors, name);
//   const showError = getIn(touched, name) && !!fieldError;

//   return {
//     ...props,
//     ...field,
//     error: showError,
//     helperText: showError ? fieldError : props.helperText,
//     disabled: disabled != undefined ? disabled : isSubmitting,
//   };
// };

// export const TextField: React.ComponentType<TextFieldProps> = ({
//   children,
//   ...props
// }: TextFieldProps) => (
//   <MuiTextField {...fieldToTextField(props)}>{children}</MuiTextField>
// );

// TextField.displayName = 'FormikMaterialUITextField';

// export default TextField;
