export const addTodo = (list, item) => [...list, item];

export const generateId = () => Math.floor(Math.random()*100000);

export const findById = (id, list) => list.find(item => item.id === id);

export const toggleTodo = (todo) => ({...todo, isCompleted: !todo.isCompleted});

export const updateTodo = (list, updatedItem) => {
  const updatedItemIndex = list.findIndex(item => item.id === updatedItem.id);
  return [
    ...list.slice(0, updatedItemIndex),
    updatedItem,
    ...list.slice(updatedItemIndex+1)
  ]
};

export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id);
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex + 1)
  ]
};

export const filterTodos = (list, route) => {
  switch(route) {
    case '/active':
      return list.filter((item) => !item.isCompleted);
    case '/completed':
      return list.filter((item) => item.isCompleted);
    default:
      return list;
  }
};
