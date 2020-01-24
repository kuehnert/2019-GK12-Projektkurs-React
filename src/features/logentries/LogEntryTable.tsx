import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  TableFooter,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatter';
import { LogEntry } from '../courses/courseSlice';
import StyledEnrolmentCell from '../enrolments/StyledEnrolmentCell';

interface Props {
  logEntries: LogEntry[];
  handleClick: (logEntry: LogEntry) => void;
}

const LogEntryTable: React.FC<Props> = ({ logEntries, handleClick }) => {
  const classes = useStyles();
  const [totalCount, setTotalCount] = useState(-1);

  useEffect(() => {
    setTotalCount(logEntries.reduce((sum, le) => sum + (le.cancelled ? 0 : le.lessons), 0));
  }, [logEntries]);

  const rowClass = (le: LogEntry) => {
    let second = le.done ? (le.cancelled ? classes.cancelled : null) : classes.open;
    return classnames(classes.row, second);
  };

  return (
    <TableContainer className={classes.root}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledEnrolmentCell align="center">Nr.</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Datum</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Stunden</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Thema</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Hausaufgaben</StyledEnrolmentCell>
            <StyledEnrolmentCell align="center">Bemerkungen</StyledEnrolmentCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {logEntries.map((le, i) => (
            <TableRow key={le.id} onClick={() => handleClick(le)} className={rowClass(le)}>
              <TableCell align="right">{le.cancelled ? '-' : le.number}</TableCell>
              <TableCell>{formatDate(le.date)}</TableCell>
              <TableCell align="center">{le.cancelled ? `(${le.lessons})` : le.lessons}</TableCell>
              <TableCell>{le.plan || '-'}</TableCell>
              <TableCell>{le.homework || '-'}</TableCell>
              <TableCell>{le.notes || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell align="center" colSpan={2}>{logEntries[0].number} Sitzungen</TableCell>
            <TableCell align="center">{totalCount} Stunden</TableCell>
            <TableCell colSpan={3}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    row: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    open: {
      background: theme.palette.secondary.light,
    },
    cancelled: {
      background: theme.palette.grey[500],
    },
  })
);

export default LogEntryTable;
