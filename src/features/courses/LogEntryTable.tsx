import { Table, TableBody, TableContainer, TableHead, TableRow, Theme, TableCell } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import StyledEnrolmentCell from '../enrolments/StyledEnrolmentCell';
import { LogEntry } from './courseSlice';
import { formatDate } from '../../utils/formatter';

interface Props {
  logEntries: LogEntry[];
}

const LogEntryTable: React.FC<Props> = ({ logEntries }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledEnrolmentCell align="center">Nr.</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Datum</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Thema</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Hausaufgaben</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Bemerkungen</StyledEnrolmentCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {logEntries.map((le, i) => (
            <TableRow key={le.id}>
              <TableCell align="right">{le.number}</TableCell>
              <TableCell>{formatDate(le.date)}</TableCell>
              <TableCell>{le.plan || '-'}</TableCell>
              <TableCell>{le.homework || '-'}</TableCell>
              <TableCell>{le.notes || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    row: {
      '&:hover': {
        backgroundColor: theme.palette.grey[400],
      },
    },
  })
);

export default LogEntryTable;
