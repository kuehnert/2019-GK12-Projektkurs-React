import { Paper, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { formatDate } from '../../utils/formatter';
import { Enrolment, HomeworkIssueType } from './enrolmentSlice';
import HomeworkButton from './HomeworkButton';

interface Props {
  enrolment: Enrolment;
}

const HomeowrkIssuesTable: React.FC<Props> = ({ enrolment }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">Fehlende Hausaufgaben</Typography>

      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center">Anzahl</TableCell>
            <TableCell align="center">Art</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {enrolment.homeworkIssues.map((a, i) => (
            <TableRow key={a.date.valueOf()}>
              <TableCell align="center">{formatDate(a.date, 'withWeekday')}</TableCell>
              <TableCell align="center">{a.type === HomeworkIssueType.NACHGEMACHT ? `(${a.weight})` : a.weight}</TableCell>
              <TableCell align="center">
                <HomeworkButton enrolment={enrolment} index={i} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">{enrolment.homeworkIssueCount} insgesamt</TableCell>
            <TableCell align="center">{enrolment.homeworkIssueOpenCount} unentschuldigt</TableCell>
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

export default HomeowrkIssuesTable;
