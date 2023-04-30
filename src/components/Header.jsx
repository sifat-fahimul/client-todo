import React, { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import plusImage from "../assets/images/plus.png";
import {
  useDeleteTaskMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "../redux/features/todo/todoApi";
import AddTodoModal from "./AddTodoModal";
const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: todos } = useGetTodoQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTask] = useDeleteTaskMutation();

  // handle completed all todo
  const completeHandle = () => {
    todos.map((todo) => {
      updateTodo({ id: todo._id, data: { completed: true } });
    });
  };

  // handle delete completed all todo
  const clearHandle = () => {
    todos.map((todo) => {
      if (todo.completed) {
        deleteTask(todo._id);
      }
    });
  };
  return (
    <div>
      {showModal ? <AddTodoModal setShowModal={setShowModal} /> : <></>}
      <div
        className="text-right bg-gray-100 px-4 py-4 rounded-md"
        onClick={() => setShowModal(true)}
      >
        <span className="text-black font-bold text-2xl mr-4 -mt-3">
          Add new Todo
        </span>
        <button
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain text-black img-bg`}
        ></button>
      </div>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer" onClick={completeHandle}>
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={clearHandle}>
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
