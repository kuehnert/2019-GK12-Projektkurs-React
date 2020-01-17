import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import { Term } from '../terms/termSlice';
import { Course } from './courseSlice';
import { Enrolment, getEnrolments } from './enrolmentSlice';
import { Student, getStudents } from './studentSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  term: Term;
  course: Course;
}

const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
  // const sourceClone = Array.from(source);
  // const destClone = Array.from(destination);
  // const [removed] = sourceClone.splice(droppableSource.index, 1);
  // destClone.splice(droppableDestination.index, 0, removed);
  // const result = {};
  // result[droppableSource.droppableId] = sourceClone;
  // result[droppableDestination.droppableId] = destClone;
  // return result;
};

const StudentEnrol: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { term, course } = props;
  const courseEnrolments = useSelector((state: RootState) => state.enrolments.enrolments[course.id]);
  const termStudents = useSelector((state: RootState) => state.students.students[term.id]);
  const [enrolments, setEnrolments] = useState(Array<Enrolment>());
  const [remaining, setRemaining] = useState(Array<Student>());
  const [formGroups, setFormGroups] = useState(Array<string>());
  const [selectedForm, setSelectedForm] = useState('');

  useEffect(() => {
    dispatch(getEnrolments(course));
    dispatch(getStudents(term.id));
  }, [dispatch, term, course]);

  useEffect(() => {
    console.log('useEffect: new termStudents', termStudents);

    if (termStudents == null) {
      return;
    }

    const fgDupes = termStudents.map(ts => ts.formGroup);
    const fgs = Array.from(new Set(fgDupes));
    setFormGroups(fgs);
  }, [termStudents]);

  useEffect(() => {
    console.log('useEffect: new courseStudents');

    if (courseEnrolments == null || termStudents == null) {
      return;
    }

    setEnrolments(courseEnrolments);
    let tmpStudents = selectedForm !== '' ? termStudents.filter(ts => ts.formGroup === selectedForm) : termStudents;

    setRemaining(tmpStudents.filter(ts => !courseEnrolments.find(e => e.studentId === ts.id)));
  }, [courseEnrolments, selectedForm, termStudents]);

  if (enrolments == null || remaining == null) {
    return <Loading />;
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'droppable2') {
      }
    } else {
    }
  };

  return (
    <div className="root">
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2} justify="space-around" alignItems="stretch" className={classes.grid}>
          <Grid item className={classes.gridItem}>
            <Typography variant="h6">Schüler im Halbjahr</Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Klasse</InputLabel>
              <Select
                name="formGroup"
                fullWidth
                margin="dense"
                value={selectedForm}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setSelectedForm(e.target.value as string)}>
                {formGroups.map((i: string) => (
                  <MenuItem value={i} key={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Paper className={classes.paper}>
              <Droppable droppableId="drop-students">
                {(provided, snapshot) => (
                  <List dense component="div" role="list" className={classes.list} ref={provided.innerRef}>
                    {remaining.map(ts => (
                      <Draggable key={ts.id} draggableId={ts.id} index={0}>
                        {(provided, snapshot) => (
                          <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <ListItemIcon>
                              <PersonIcon />
                            </ListItemIcon>
                            <ListItemText>
                              {ts.lastname}, {ts.firstname} ({ts.formGroup})
                            </ListItemText>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Paper>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Typography variant="h6">Schüler im Kurs</Typography>
            <Paper className={classes.paper}>
              <Droppable droppableId="drop-enrolments">
                {(provided, snapshot) => (
                  <List dense component="div" role="list" className={classes.list} ref={provided.innerRef}>
                    {enrolments.map(e => {
                      const s = termStudents.find(ts => ts.id === e.studentId);
                      if (s == null) {
                        return null;
                      }

                      return (
                        <Draggable key={e.id} draggableId={e.id} index={0}>
                          {(provided, snapshot) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <ListItemIcon>
                                <PersonIcon />
                              </ListItemIcon>
                              <ListItemText>
                                {s.lastname}, {s.firstname} ({s.formGroup})
                              </ListItemText>
                            </ListItem>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Paper>
          </Grid>
        </Grid>
      </DragDropContext>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    grid: {
      display: 'flex',
      verticalAlign: 'top',
      // border: '1px dotted red',
    },
    gridItem: {
      width: '25vw',
      // border: '1px dotted grey',
    },
    paper: {
      marginTop: theme.spacing(2),
      overflow: 'auto',
    },
    list: {
      height: '60vh',
    },
  })
);

export default StudentEnrol;
