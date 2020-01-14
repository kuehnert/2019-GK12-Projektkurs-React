// https://github.com/stackworx/formik-material-ui/blob/master/src/Select.tsx
import React from 'react';
import MuiSelect, { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import { FieldProps } from 'formik';

export interface SelectProps extends FieldProps, Omit<MuiSelectProps, 'value'> {}

export const fieldToSelect = ({
  field,
  form: { isSubmitting, setFieldValue },
  disabled,
  ...props
}: SelectProps): MuiSelectProps => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onChange = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      // Special case for multiple and native
      if (props.multiple && props.native) {
        const { options } = event.target as HTMLSelectElement;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }

        setFieldValue(field.name, value);
      } else {
        field.onChange(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.name, props.multiple, props.native]
  );

  return {
    disabled: disabled !== undefined ? disabled : isSubmitting,
    ...props,
    ...field,
    onChange,
  };
};

export const FSelect: React.ComponentType<SelectProps> = (props: SelectProps) => (
  <MuiSelect {...fieldToSelect(props)} />
);

FSelect.displayName = 'FormikMaterialUISelect';
export default FSelect;

/*
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';

const FSelect = (props: any) => {
  const {
    label,
    field,
    form: { touched, errors, setFieldValue },
    items,
    ...other
  } = props;
  const errorText = getIn(errors, field.name);
  const touchedVal = getIn(touched, field.name);
  const hasError = touchedVal && errorText !== undefined;
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={field.name}
        error={hasError}
        helperText={hasError ? errorText : ''}
        onChange={value => setFieldValue(field.name, value)}
        value={field.value}
        margin="normal"
        fullWidth
        displayEmpty
        {...other}>
        {items.map((i: string) => (
          <MenuItem value={i} key={i}>
            {i}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FSelect;
*/
