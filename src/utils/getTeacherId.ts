function getTeacherId(): string {
  const teacher = localStorage.getItem('teacher');

  if (teacher) {
    return JSON.parse(teacher).id;
  } else {
    return "";
  }
}

export default getTeacherId;
