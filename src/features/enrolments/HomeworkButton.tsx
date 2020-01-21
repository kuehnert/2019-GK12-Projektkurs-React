import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import { HomeworkIssueType, Enrolment, updateEnrolment } from './enrolmentSlice';
import { useDispatch } from 'react-redux';
import { removeAtIndex } from "../../utils/enrolmentHelpers";

export interface Props {
  enrolment: Enrolment;
  index: number;
}

const values = [...Object.values(HomeworkIssueType), 'Löschen'];

export default function HomeworkButton({ enrolment, index }: Props) {
  const homeworkIssue = enrolment.homeworkIssues[index];
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newEnrolment = JSON.parse(JSON.stringify(enrolment));

    if (event.target.value === 'Löschen') {
      newEnrolment.homeworkIssues = removeAtIndex(newEnrolment.homeworkIssues, index);
    } else {
      const type = event.target.value as HomeworkIssueType;
      newEnrolment.homeworkIssues[index].type = type;
    }

    dispatch(updateEnrolment(newEnrolment));
  };

  return (
    <Select value={homeworkIssue.type} onChange={handleChange} fullWidth>
      {values.map((t, i) => (
        <MenuItem key={t} value={t}>
          {t}
        </MenuItem>
      ))}
    </Select>
  );
}
