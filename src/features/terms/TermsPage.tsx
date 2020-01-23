import {
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { deleteTerm, getTerms } from './termSlice';
import history from '../../history';
import { RootState } from '../../app/rootReducer';
import { formatDate } from '../../utils/formatter';
import Loading from '../../components/Loading';

class TermsPage extends Component<Props> {
  componentDidMount() {
    this.props.getTerms();
  }

  editTerm = (event: React.FormEvent, termId: string) => {
    event.stopPropagation();
    history.push(`/terms/${termId}/edit`);
  };

  deleteTerm = (event: React.FormEvent, termId: string) => {
    event.stopPropagation();
    this.props.deleteTerm(termId);
    history.push(`/terms`);
  };

  renderTerms() {
    const { terms, classes } = this.props;
    return terms?.map(term => (
      <TableRow
        key={term.id}
        className={classes.tr}
        onClick={() => {
          history.push(`/terms/${term.id}`);
        }}>
        <TableCell>{term.name}</TableCell>
        <TableCell>{formatDate(term.start, 'long')}</TableCell>
        <TableCell>{formatDate(term.end, 'long')}</TableCell>
        <TableCell>
          <IconButton color="primary" onClick={e => this.editTerm(e, term.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={e => this.deleteTerm(e, term.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { teacher, terms, classes } = this.props;

    if (teacher == null || terms == null) {
      return <Loading />;
    }

    return (
      <div>
        <Typography variant="h3">Halbjahre</Typography>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Anfangsdatum</TableCell>
              <TableCell>Enddatum</TableCell>
              <TableCell>Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderTerms()}</TableBody>
        </Table>

        <Fab
          color="primary"
          className={classes.fab}
          aria-label="add"
          onClick={() => {
            history.push(`/terms/new`);
          }}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '95%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: 'auto',
      padding: '20px',
    },
    table: {
      minWidth: 650,
    },
    tr: {
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        cursor: 'pointer',
      },
    },
    buttons: {},
    fab: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
    },
  });

const mapStateToProps = (state: RootState) => ({
  terms: state.terms.terms,
  teacher: state.teachers.teacher,
});

const mapDispatchToProps = {
  getTerms,
  deleteTerm,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type OwnProps = {};
type Props = ConnectedProps<typeof connector> & OwnProps & WithStyles<typeof styles>;
export default connector(withStyles(styles)(TermsPage));
