const initialState = {
  todos: null,
  todo: null,
  position: 0,
  todosperpage: 20,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return action.payload;
    case 'GET_TODO':
      return action.payload;

    default:
      return state;
  }
};
