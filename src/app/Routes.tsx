import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Layout from '../app/Layout';
import NotFoundPage from '../components/NotFoundPage';
import ProtectedRoute from '../components/ProtectedRoute';
import CoursePage from '../features/courses/CoursePage';
import EditCoursePage from '../features/courses/EditCoursePage';
import EnrolmentPage from '../features/enrolments/EnrolmentPage';
import EditTeacherPage from '../features/teachers/EditTeacherPage';
import LoginPage from '../features/teachers/LoginPage';
import SignUpPage from '../features/teachers/SignUpPage';
import AddTermPage from '../features/terms/AddTermPage';
import EditTermPage from '../features/terms/EditTermPage';
import EditTimetablePage from '../features/terms/EditTimetablePage';
import TermPage from '../features/terms/TermPage';
import TermsPage from '../features/terms/TermsPage';
import WelcomePage from '../features/welcome/WelcomePage';
import history from '../history';

export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/login" exact component={LoginPage} />

        <Layout>
          <ProtectedRoute exact path="/edit" component={EditTeacherPage} />

          <ProtectedRoute exact path="/terms" component={TermsPage} />
          <ProtectedRoute exact path="/terms/new" component={AddTermPage} />
          <ProtectedRoute exact path="/terms/:termId" component={TermPage} />
          <ProtectedRoute exact path="/terms/:termId/edit" component={EditTermPage} />
          <ProtectedRoute exact path="/terms/:termId/edit_timetable" component={EditTimetablePage} />
          <ProtectedRoute exact path="/terms/:termId/courses/:courseId/edit" component={EditCoursePage} />
          <ProtectedRoute exact path="/terms/:termId/courses/:courseId" component={CoursePage} />
          <ProtectedRoute
            exact
            path="/terms/:termId/courses/:courseId/enrolments/:enrolmentId"
            component={EnrolmentPage}
          />{' '}
        </Layout>

        <Route path="*" component={NotFoundPage} status={404} />
      </Switch>
    </Router>
  );
};
