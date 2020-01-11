import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createTerm } from './termSlice';
import { Term } from './termSlice';
import history from '../../history';
import TermForm from './TermForm';

interface OwnProps {
  termId: string;
}

class AddTermPage extends Component<Props> {
  handleSubmit = async (values: Term) => {
    try {
      await this.props.createTerm(values);
      history.push(`/terms`);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <Typography variant="h2">Neues Halbjahr anlegen</Typography>

        <TermForm onSubmit={(values: Term) => this.handleSubmit(values)} />
      </div>
    );
  }
}

const mapDispatchToProps = { createTerm };

const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector> & OwnProps;
export default connector(AddTermPage);
