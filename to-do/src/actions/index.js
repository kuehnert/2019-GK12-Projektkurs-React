import jsonPlaceholder from '../apis/jsonPlaceholder';

export const getTodos = () => async dispatch => {
  const response = [
    { id: 3, name: "Erdferkel füttern", done: true },
    { id: 2, name: "Game of Thrones gucken", done: false },
    { id: 1, name: "Gesicht waschen", done: false },
    { id: 4, name: "Informatik-Hausis machen", done: true },
  ];

  // const response = await jsonPlaceholder.get('/todos');

  dispatch({
    type: 'GET_TODOS',
    payload: response
  });
}

export const createTodo = (todo) => {

}

export const markDone = (id) => {

}
