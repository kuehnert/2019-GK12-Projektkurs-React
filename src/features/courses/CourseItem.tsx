import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Book as BookIcon, EditOutlined as EditIcon } from '@material-ui/icons';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { Course } from './courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { Term, updateTerm } from '../terms/termSlice';

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
  const dispatch = useDispatch();
  const item = { courseId: course.id, type: 'Course' };
  const [{ opacity }, drag] = useDrag({
    item,
    end(item: { name: string } | undefined, monitor: DragSourceMonitor) {
      const dropResult: any = monitor.getDropResult();
      // console.log('dropResult', dropResult);

      if (item && dropResult) {
        const newLessons = [
          ...term.lessons,
          {
            courseId: course.id,
            weekday: dropResult.weekday,
            periodNo: dropResult.period.number,
          },
        ];
        // console.log(newLessons);
        dispatch(updateTerm({ ...term, lessons: newLessons }));
      }
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <ListItem button ref={drag} style={{ opacity }}>
      {/* <ListItemIcon>
        <BookIcon />
      </ListItemIcon> */}

      <ListItemText>{course.name}</ListItemText>

      <IconButton onClick={() => handleEditCourse(course)}>
        <EditIcon />
      </IconButton>
    </ListItem>
  );
};

export default CourseItem;
