import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

interface MyCheckboxProps {
  field: any;
  form: any;
  label: string;
}

export default (props: MyCheckboxProps) => (
  <FormGroup row>
    <FormControlLabel
      control={<Checkbox name={props.field.name} checked={props.field.value} onChange={props.field.onChange} />}
      label={props.label}
    />
  </FormGroup>
);
