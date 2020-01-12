import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Book as BookIcon, EditOutlined as EditIcon } from '@material-ui/icons';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Course } from './courseSlice';
import { useSelector } from "react-redux";
import { RootState } from '../../app/rootReducer'
import { Term } from '../terms/termSlice'

interface Props {
  course: Course;
  termId: string;
  handleEditCourse: (course: Course) => void;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  period: number;
}

const CourseItem: React.FC<Props> = ({ course, termId, handleEditCourse }: Props) => {
  const term = useSelector((state: RootState) => state.terms.terms.find(t => t.id === termId)) as Term;
  const item = { courseId: course.id, type: 'Course' };
  const [{ opacity }, drag] = useDrag({
    item,
    end(item: { name: string } | undefined, monitor: DragSourceMonitor) {
      const dropResult: DropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(item);
        console.log(course);
        console.log(dropResult);
        console.log(term.lessons);
        // TODO: Create lesson (and delete old one if necessary)
        // course.lessons.push({
        //   courseId: course.id,
        //   weekday: 1,
        //   period: 1,
        // });
      }
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <ListItem ref={drag} style={{ opacity }}>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>

      <ListItemText>{course.name}</ListItemText>

      <IconButton onClick={() => handleEditCourse(course)}>
        <EditIcon />
      </IconButton>
    </ListItem>
  );
};

export default CourseItem;
