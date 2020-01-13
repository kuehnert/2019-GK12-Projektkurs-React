import { Paper, Theme } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import CoursePage from '../features/courses/CoursePage';
import EditCoursePage from '../features/courses/EditCoursePage';
import AddTermPage from '../features/terms/AddTermPage';
import EditTermPage from '../features/terms/EditTermPage';
import EditTimetablePage from "../features/terms/EditTimetablePage";
import TermPage from '../features/terms/TermPage';
import TermsPage from '../features/terms/TermsPage';
import WelcomePage from '../features/welcome/WelcomePage';
import history from '../history';
import Navbar from './Navbar';

interface Props {
  classes: any;
}

const Routes = ({ classes }: Props) => {
  return (
    <Router history={history}>
      <Navbar />
      <Paper className={classes.root}>
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/terms" exact component={TermsPage} />
          <Route path="/terms/new" component={AddTermPage} />
          <Route path="/terms/:termId" exact component={TermPage} />
          <Route path="/terms/:termId/edit" excat component={EditTermPage} />
          <Route path="/terms/:termId/edit_timetable" excat component={EditTimetablePage} />
          <Route path="/terms/:termId/courses/:courseId/edit" component={EditCoursePage} />
          <Route path="/terms/:termId/courses/:courseId" component={CoursePage} />
          <Route path="*" component={NotFoundPage} status={404} />
        </Switch>
      </Paper>
    </Router>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '95%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: 'auto',
      padding: 20,
    },
  });

export default withStyles(styles)(Routes);
