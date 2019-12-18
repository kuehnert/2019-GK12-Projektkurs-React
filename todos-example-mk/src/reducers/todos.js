const initialState = {
  selected: null,
  list: [
    {
      id: 0,
      text: 'Müll rausbringen',
      completed: false,
    },
    {
      id: 1,
      text: 'Ein paar default Todos erzeugen',
      completed: true,
    },
    {
      id: 2,
      text: 'Hasen töten und Mama schenken',
      completed: false,
    },
  ],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TODO':
      const selected = state.list.find(todo => todo.id === action.payload);
      return { ...state, selected: selected };
    case 'ADD_TODO':
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ],
      };
    case 'UPDATE_TODO':
      // 1. ToDo mit der richtigen ID raussuchen
      const todo = state.list.find(todo => todo.id === action.payload.id);

      // 2. In dem Todo den Text aktualisieren
      todo.text = action.payload.text;

      // 3. Neuen State erzeugen mit neuen Daten
      return {
        ...state
      }
    case 'TOGGLE_TODO':
      return state.list.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todos;
