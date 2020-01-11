import React from 'react';

interface Props {
  termId: string;
  courseId: string;
}

const CoursePage = ({ termId, courseId }: Props) => {
  return (
    <div>
      <h1>Toller Kurs</h1>
    </div>
  );
};

export default CoursePage;
