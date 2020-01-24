import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Button,
} from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Loading from '../../components/Loading';
import { Term } from '../terms/termSlice';
import { Course } from './courseSlice';
import { Enrolment, createEnrolments, deleteEnrolment, getEnrolments } from '../enrolments/enrolmentSlice';
import { Student, getStudents } from './studentSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  term: Term;
  course: Course;
}

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
    // console.log('Initial data load...');
    if (course == null) {
      dispatch(getEnrolments(course));
    }

    if (termStudents == null) {
      dispatch(getStudents(term.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (termStudents == null) {
      return;
    }

    const fgDupes = Object.values(termStudents).map(ts => ts.formGroup);
    const fgs = Array.from(new Set(fgDupes));
    setFormGroups(fgs);
  }, [termStudents]);

  useEffect(() => {
    if (courseEnrolments == null || termStudents == null) {
      return;
    }

    setEnrolments(courseEnrolments);
    let tmpStudents =
      selectedForm !== ''
        ? Object.values(termStudents).filter(ts => ts.formGroup === selectedForm)
        : Object.values(termStudents);

    setRemaining(tmpStudents.filter(ts => !courseEnrolments.find(e => e.studentId === ts.id)));
  }, [courseEnrolments, selectedForm, termStudents]);

  if (enrolments == null || remaining == null) {
    return <Loading />;
  }

  const handleAddAll = (event: React.MouseEvent) => {
    const ids = remaining.map(r => r.id);
    dispatch(createEnrolments(term.id, course.id, ids));
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      if (source.droppableId === 'drop-enrolments') {
        let enrolmentToDelete = enrolments[source.index];
        dispatch(deleteEnrolment(enrolmentToDelete));
      } else if (source.droppableId === 'drop-students') {
        let studentToEnrol = remaining[source.index];
        dispatch(createEnrolments(term.id, course.id, [studentToEnrol.id]));
      }
    } else {
      // TODO: Re-order list
    }
  };

  return (
    <div className="root">
      <div className="formBar">
        <FormControl margin="normal" className={classes.formControl}>
          <InputLabel>Klasse</InputLabel>
          <Select
            name="formGroup"
            fullWidth
            margin="dense"
            value={selectedForm}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => setSelectedForm(e.target.value as string)}>
            <MenuItem value={''}>{'<Alle Klassen>'}</MenuItem>
            {formGroups.map((i: string) => (
              <MenuItem value={i} key={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="normal" className={classes.formControl}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddAll}
            disabled={selectedForm === '' || remaining.length === 0}>
            Alle Schüler hinzufügen
          </Button>
        </FormControl>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2} justify="space-around" alignItems="stretch" className={classes.grid}>
          <Grid item className={classes.gridItem} sm={6}>
            <Typography variant="h6">Schüler im Halbjahr</Typography>
          </Grid>
          <Grid item className={classes.gridItem} sm={6}>
            <Typography variant="h6">Schüler im Kurs</Typography>
          </Grid>
          <Grid item className={classes.gridItem} sm={6}>
            <Box className={classes.paper}>
              <Droppable droppableId="drop-students">
                {(provided, snapshot) => (
                  <List dense component="div" role="list" ref={provided.innerRef} className={classes.list}>
                    {remaining.map((ts, i) => (
                      <Draggable key={ts.id} draggableId={ts.id} index={i}>
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
            </Box>
          </Grid>

          <Grid item className={classes.gridItem} sm={6}>
            <Box className={classes.paper}>
              <Droppable droppableId="drop-enrolments">
                {(provided, snapshot) => (
                  <List dense component="div" role="list" ref={provided.innerRef} className={classes.list}>
                    {enrolments.map((e, i) => {
                      const s = termStudents[e.studentId];
                      if (s == null) {
                        return null;
                      }

                      return (
                        <Draggable key={e.id} draggableId={e.id} index={i}>
                          {(provided, snapshot) => (
                            <ListItem
                              className={classes.listItem}
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
            </Box>
          </Grid>
        </Grid>
      </DragDropContext>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    grid: {
      display: 'flex',
    },
    gridItem: {
      width: '30vw',
      overflow: 'auto',
    },
    paper: {
      height: '100%',
    },
    formBar: {},
    formControl: {
      minWidth: 200,
      paddingRight: theme.spacing(2),
    },
    list: {
      height: '100%',
      background: '#fbfffb',
    },
    listItem: {
      background: 'white',
    },
  })
);

export default StudentEnrol;
