import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Book as BookIcon, EditOutlined as EditIcon } from '@material-ui/icons';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Course } from './courseSlice';

interface Props {
  course: Course;
  handleEditCourse: (course: Course) => void;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  period: number;
}

const EditCourseListItem: React.FC<Props> = ({ course, handleEditCourse }: Props) => {
  const item = { courseId: course.id, type: 'Course' };
  const [{ opacity }, drag] = useDrag({
    item,
    end(item: { name: string } | undefined, monitor: DragSourceMonitor) {
      const dropResult: DropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(item);
        console.log(course);
        console.log(dropResult);
        // TODO: Create lesson (and delete old one if necessary)
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

export default EditCourseListItem;
