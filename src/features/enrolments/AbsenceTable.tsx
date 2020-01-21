import { Paper, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { absenceExcused } from '../../utils/enrolmentHelpers';
import { formatDate } from '../../utils/formatter';
import { Enrolment, AbsenceType } from './enrolmentSlice';
import AbsenceButton from './AbsenceButton';

interface Props {
  enrolment: Enrolment;
}

const AbsenceTable: React.FC<Props> = ({ enrolment }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">Fehlstunden</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center">Stunden</TableCell>
            <TableCell align="center">Unentschuldigt</TableCell>
            <TableCell align="center">Art</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {enrolment.absences.map((a, i) => (
            <TableRow key={a.date.valueOf()}>
              <TableCell align="center">{formatDate(a.date, 'withWeekday')}</TableCell>
              <TableCell align="center">{a.type === AbsenceType.SCHULISCH ? `(${a.lessons})` : a.lessons}</TableCell>
              <TableCell align="center">{absenceExcused(a) ? 0 : a.lessons }</TableCell>
              <TableCell align="center">
                <AbsenceButton enrolment={enrolment} index={i}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">{enrolment.absenceCount} insgesamt</TableCell>
            <TableCell align="center">{enrolment.absenceOpenCount} unentschuldigt</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
  })
);

export default AbsenceTable;
