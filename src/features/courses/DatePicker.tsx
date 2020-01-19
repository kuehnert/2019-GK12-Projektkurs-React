import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';

interface Props {
  date: Date;
  handleDateChange: (date: Date) => void;
}

function DatePicker({ date, handleDateChange }: Props) {
  const handler = (date: Date | null) => {
    if (date != null) {
      handleDateChange(date);
    }
  }

  return (
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="EE, dd.MM."
        margin="dense"
        id="date-picker"
        value={date}
        onChange={handler}
        KeyboardButtonProps={{
          'aria-label': 'Datum ändern',
        }}
      />
  );
}

export default DatePicker;
