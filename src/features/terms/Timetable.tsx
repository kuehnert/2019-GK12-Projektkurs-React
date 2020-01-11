import { Theme, Table, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import history from '../../history';
import { getTerm } from './termSlice';
import { Lesson, getCourses } from '../courses/courseSlice';
import { Period } from '../terms/termSlice'
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import Time from '../../components/Time';
import { Term } from './termSlice';

class Timetable extends Component<Props> {
  componentDidMount() {
    const termId = this.props.termId;

    if (this.props.term == null) {
      this.props.getTerm(termId);
    }

    if (this.props.courses == null) {
      this.props.getCourses(termId);
    }
  }

  renderPeriods() {
    const { term, classes } = this.props;
    const periods = term?.periods || [];
    const timetable: { [key: string]: Lesson } = {};

    // Object.values(courses).forEach((c: Course) => {
    //   c.lessons.forEach((l) => {
    //     timetable[`${l.weekday},${l.period}`] = l;
    //   });
    // });
    // console.log(periods[0].start, typeof periods[0].start);

    return periods.map((period: Period) => (
      <TableRow key={period.number}>
        <TableCell className={classes.period} align="center">
          <Typography variant="h6">{period.name}</Typography>
          <Time time={period.start} />-<Time time={period.end} />
        </TableCell>
        {[0, 1, 2, 3, 4, 5].map(weekday => {
          const lesson = timetable[`${weekday},${period.number}`];

          if (lesson != null) {
            return (
              <TableCell
                key={weekday}
                className={classes.lesson}
                align="center"
                onClick={() => history.push(`/terms/${term?.id}/courses/${lesson.courseId}`)}>
                {/* <Typography variant="body1">{courses[lesson.courseId].name}</Typography> */}
                <Typography variant="caption">{lesson.room}</Typography>
              </TableCell>
            );
          } else {
            return <TableCell key={weekday} className={classes.lessonBlank} />;
          }
        })}
      </TableRow>
    ));
  }

  render() {
    if (this.props.term == null) {
      return <Loading />;
    }

    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h5">Stundenplan</Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.period}>Stunde</TableCell>
              <TableCell className={classes.period}>Montag</TableCell>
              <TableCell className={classes.period}>Dienstag</TableCell>
              <TableCell className={classes.period}>Mittwoch</TableCell>
              <TableCell className={classes.period}>Donnerstag</TableCell>
              <TableCell className={classes.period}>Freitag</TableCell>
              <TableCell className={classes.period}>Samstag</TableCell>
            </TableRow>
          </TableHead>
          <tbody>{this.renderPeriods()}</tbody>
        </Table>
      </div>
    );
  }
}

const styles = ({ palette }: Theme) =>
  createStyles({
    lesson: {
      background: palette.primary.main,
      color: palette.primary.contrastText,
      cursor: 'pointer',
      border: '1px solid rgba(100, 100, 100, 1)',
    },
    lessonBlank: {
      background: palette.text.disabled,
      border: '1px solid rgba(100, 100, 100, 1)',
    },
    period: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
      textAlign: 'center',
      border: '1px solid rgba(100, 100, 100, 1)',
    },
    periodName: {
      fontSize: '2rem',
    },
  });

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  courses: state.courses.courses[ownProps.termId],
  term: state.terms.terms?.find((term: Term) => term.id === ownProps.termId),
});

const mapDispatchToProps = {
  getCourses,
  getTerm,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type OwnProps = { termId: string };
type Props = ConnectedProps<typeof connector> & OwnProps & WithStyles<typeof styles>;
export default connector(withStyles(styles)(Timetable));
