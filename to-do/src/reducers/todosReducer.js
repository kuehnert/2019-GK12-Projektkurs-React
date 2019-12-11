const initialState = {
  list: null,
  todo: null,
  position: 0,
  todosperpage: 20,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return {...state, list: action.payload};
    case 'GET_TODO':
      const id = parseInt(action.payload);
      const todo = state.list.find(t => t.id === id);
      return { ...state, todo: todo};

    default:
      return state;
  }
};
