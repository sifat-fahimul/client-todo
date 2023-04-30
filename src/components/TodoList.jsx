import React from "react";
import { useSelector } from "react-redux";
import { useGetTodoQuery } from "../redux/features/todo/todoApi";
import Todo from "./Todo";

const TodoList = () => {
  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTodoQuery();
  const filters = useSelector((state) => state.filters);

  // filter by status (here filter function separated)
  const filterByStatus = (todo) => {
    const { status } = filters;
    switch (status) {
      case "Complete":
        return todo.completed;

      case "Incomplete":
        return !todo.completed;

      default:
        return true;
    }
  };

  // filter by colors (here filter function separated)
  const filterByColors = (todo) => {
    const { colors } = filters;
    if (colors.length > 0) {
      return colors.includes(todo?.color);
    }
    return true;
  };

  //   decide what to render
  let content = null;
  if (isLoading) content = <p className="text-black">Loading...</p>;
  if (!isLoading && isError)
    content = <p className="text-black">something is wrong!</p>;
  if (!isLoading && !isError && todos?.length === 0)
    content = <p className="text-black">No Todo Found!</p>;
  if (!isLoading && !isError && todos?.length > 0) {
    content = (
      <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
          <div className={`select-none flex-1/2 font-bold`}>Status</div>
          <div className={`select-none flex-1 font-bold`}>Title</div>
          <div className={`select-none flex-1 font-bold`}>Description</div>
          <div className={`select-none flex-1 font-bold text-center`}>Date</div>
          <div className={`select-none flex-1 font-bold text-right`}>
            Action
          </div>
        </div>

        {todos
          .filter(filterByStatus)
          .filter(filterByColors)
          ?.map((todo) => (
            <Todo todo={todo} key={todo._id} />
          ))}
      </div>
    );
  }

  return content;
};

export default TodoList;
