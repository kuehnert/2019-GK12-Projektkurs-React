import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getTerm, updateTerm } from './termSlice';
import { Term } from './termSlice';
import history from '../../history';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import TermForm from './TermForm';
import { RouteComponentProps } from 'react-router-dom';

class EditTermPage extends Component<Props> {
  componentDidMount() {
    const { termId } = this.props.match.params;
    this.props.getTerm(termId);
  }

  handleSubmit = async (values: Term) => {
    try {
      await this.props.updateTerm(values);
      history.push(`/terms`);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { term } = this.props;

    if (term == null) {
      return <Loading />;
    }

    return (
      <div>
        <Typography variant="h2">Halbjahr bearbeiten: {term.name}</Typography>

        <TermForm
          handleSubmit={(values: Term) => this.handleSubmit(values)}
          initialValues={term}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, props: MatchProps) => {
  // console.log(props);

  return {
    term: state.terms.terms?.find((term: Term) => term.id === props.match.params.termId),
  };
};

const mapDispatchToProps = { getTerm, updateTerm };
const connector = connect(mapStateToProps, mapDispatchToProps);

interface MatchParams {
  termId: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}
type Props = ConnectedProps<typeof connector> & MatchProps;
export default connector(EditTermPage);
