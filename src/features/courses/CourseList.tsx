import { Button, List, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import CourseDialog from './CourseDialog';
import CourseItem from './CourseItem';
import { Course, CourseBase, createCourse, defaultCourse } from './courseSlice';

interface Props {
  termId: string;
}

const CourseList = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedCourse, setEditedCourse] = useState(defaultCourse);
  const term = useSelector((state: RootState) => state.terms.terms.find(t => t.id === props.termId));
  const courses = useSelector((state: RootState) => state.courses.courses[props.termId]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleCreateCourse = () => {
    const newCourse: CourseBase = { ...defaultCourse, end: term?.end || new Date() };
    dispatch(createCourse(props.termId, newCourse));
  };

  const handleEditCourse = (course: Course) => {
    setIsDialogOpen(true);
    setEditedCourse(course);
  };

  const renderCourses = () => {
    return courses?.map((c: Course) => (
      <CourseItem key={c.id} course={c} termId={props.termId} handleEditCourse={handleEditCourse} />
    ));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">Kurse</Typography>

      <List component="nav">{renderCourses()}</List>

      <Button variant="contained" color="primary" aria-label="add" onClick={handleCreateCourse} fullWidth>
        Neuer Kurs
      </Button>

      <CourseDialog
        open={isDialogOpen}
        initialValues={editedCourse}
        handleClose={() => {
          setIsDialogOpen(false);
        }}
        termId={props.termId}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
    },
    fab: {
      margin: theme.spacing(2),
    },
  })
);

export default CourseList;
