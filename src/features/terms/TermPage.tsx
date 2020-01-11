import { Fab, Theme, Typography } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getTerm } from './termSlice';
import { Term } from './termSlice';
import { RootState } from '../../app/rootReducer';
import { formatDate } from '../../utils/formatter';
import Loading from '../../components/Loading';
import Timetable from './Timetable';
import history from '../../history';

export class TermPage extends Component<Props> {
  componentDidMount() {
    const { termId } = this.props.match.params;
    this.props.getTerm(termId);
  }

  render() {
    const { term } = this.props;

    if (term == null) {
      return <Loading />;
    }

    return (
      <div>
        <Typography variant="h3">{term.name}</Typography>
        <Typography variant="h4">
          {formatDate(term.start)}-{formatDate(term.end)}
        </Typography>
        <Fab onClick={() => history.push(`/terms/${term.id}/edit_timetable`)}>
          <EditIcon />
        </Fab>
        <Timetable termId={term.id} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, props: MatchProps) => ({
  term: state.terms.terms?.find((term: Term) => term.id === props.match.params.termId),
});

const mapDispatchToProps = { getTerm };

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '95%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: 'auto',
      padding: 20,
    },
    table: {
      minWidth: 650,
    },
    tr: {
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  });

const connector = connect(mapStateToProps, mapDispatchToProps);
interface MatchParams {
  termId: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}
type Props = ConnectedProps<typeof connector> & MatchProps & WithStyles<typeof styles>;
export default connector(withStyles(styles)(TermPage));
