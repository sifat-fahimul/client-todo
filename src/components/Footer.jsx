import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addColor,
  changeStatus,
  removeColor,
} from "../redux/features/filter/filterSlice";
import { useGetTodoQuery } from "../redux/features/todo/todoApi";

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";
    case undefined:
      return "No task";
    default:
      return `${no_of_todos} tasks`;
  }
};

const Footer = () => {
  const { data } = useGetTodoQuery();
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { status, colors } = filters;
  const todosRemaining = data?.filter((todo) => !todo.completed).length;

  const handleStatusChange = (status) => {
    dispatch(changeStatus(status));
  };

  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      dispatch(removeColor(color));
    } else {
      dispatch(addColor(color));
    }
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{numberOfTodos(todosRemaining)} left</p>

      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "All" && "font-bold"}`}
          onClick={() => handleStatusChange("All")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Incomplete" && "font-bold"}`}
          onClick={() => handleStatusChange("Incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Complete" && "font-bold"}`}
          onClick={() => handleStatusChange("Complete")}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && "bg-green-500"
          }`}
          onClick={() => handleColorChange("green")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && "bg-red-500"
          }`}
          onClick={() => handleColorChange("red")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && "bg-yellow-500"
          }`}
          onClick={() => handleColorChange("yellow")}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
