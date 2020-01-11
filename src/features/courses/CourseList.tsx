import { Divider, Fab, List, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import CourseDialog from './CourseDialog';
import { Course, CourseBase, createCourse, defaultCourse } from './courseSlice';
import EditCourseListItem from "./EditCourseListItem";

interface Props {
  termId: string;
}

const CourseList = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedCourse, setEditedCourse] = useState(defaultCourse);
  const courses = useSelector((state: RootState) => state.courses.courses[props.termId]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleCreateCourse = () => {
    const newCourse: CourseBase = defaultCourse;
    dispatch(createCourse(props.termId, newCourse));
  };

  const handleEditCourse = (course: Course) => {
    setIsDialogOpen(true);
    setEditedCourse(course);
  };

  const renderCourses = () => {
    return courses?.map((c: Course) => (<EditCourseListItem key={c.id} course={c} handleEditCourse={handleEditCourse} />));
  };

  return (
    <div
      // className={classes.root}
    // classes={{ paper: classes.paper }}
    >
      <Typography variant="h4">Kurse</Typography>
      <Divider />

      <List>{renderCourses()}</List>

      <Divider />

      <Fab color="primary" className={classes.fab} aria-label="add" onClick={handleCreateCourse}>
        <AddIcon />
      </Fab>

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
      // width: '95%',
      // marginTop: theme.spacing(3),
      // overflowX: 'auto',
      // margin: 'auto',
      // padding: 20,
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
