import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import { AbsenceTypes, Enrolment, updateEnrolment } from './enrolmentSlice';
import { useDispatch } from 'react-redux';

export interface Props {
  enrolment: Enrolment;
  index: number;
}

const values = [...Object.values(AbsenceTypes), 'Löschen'];

export default function AbsenceButton({ enrolment, index }: Props) {
  const absence = enrolment.absences[index];
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newEnrolment = JSON.parse(JSON.stringify(enrolment));

    if (event.target.value === 'Löschen') {
      const a = newEnrolment.absences;
      newEnrolment.absences = a.slice(0, index).concat(a.slice(index + 1, a.length));
    } else {
      const type = event.target.value as AbsenceTypes;
      newEnrolment.absences[index].type = type;
    }

    // console.log('newEnrolment', newEnrolment);
    dispatch(updateEnrolment(newEnrolment));
  };

  return (
    <Select value={absence.type} onChange={handleChange} fullWidth>
      {values.map((t, i) => (
        <MenuItem key={t} value={t}>
          {t}
        </MenuItem>
      ))}
    </Select>
  );
}
