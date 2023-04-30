import React, { useState } from "react";
import cancelImage from "../assets/images/cancel.png";
import editImage from "../assets/images/edit.png";
import {
  useDeleteTaskMutation,
  useUpdateTodoMutation,
} from "../redux/features/todo/todoApi";
import EditTodoModal from "./EditTodoModal";
import ViewTodoModal from "./ViewTodoModal";
const Todo = ({ todo }) => {
  const { text, _id, completed, color, desc, date } = todo;
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  //   update status todo function
  const handleStatusChange = (todoId) => {
    updateTodo({ id: todoId, data: { completed: !completed } });
  };

  //   update color todo function
  const handleColorChange = (todoId, color) => {
    updateTodo({ id: todoId, data: { color } });
  };

  //   delete todo function
  const handleDelete = (todoId) => {
    deleteTask(todoId);
  };

  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      {showModal ? (
        <ViewTodoModal todo={todo} setShowModal={setShowModal} />
      ) : (
        <></>
      )}
      {editModal ? (
        <EditTodoModal setEditModal={setEditModal} id={_id} />
      ) : (
        <></>
      )}
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleStatusChange(_id)}
          className="opacity-0 absolute rounded-full cursor-pointer"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div
        onClick={() => setShowModal(true)}
        className={`hover:cursor-pointer hover:text-blue-500 select-none flex-1 ${
          completed && "line-through"
        }`}
      >
        {text}
      </div>
      <div
        onClick={() => setShowModal(true)}
        className={`hover:cursor-pointer hover:text-blue-500 select-none flex-1 `}
      >
        {desc?.slice(0, 25)} {desc?.length > 25 && "..."}{" "}
      </div>
      <div
        onClick={() => setShowModal(true)}
        className={`hover:cursor-pointer hover:text-blue-500 select-none flex-1 `}
      >
        {date}
      </div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === "green" && "bg-green-500"
        }`}
        onClick={() => handleColorChange(_id, "green")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
          color === "yellow" && "bg-yellow-500"
        }`}
        onClick={() => handleColorChange(_id, "yellow")}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === "red" && "bg-red-500"
        }`}
        onClick={() => handleColorChange(_id, "red")}
      ></div>
      <img
        src={cancelImage}
        className="flex-shrink-0 w-5 h-5 ml-2 cursor-pointer "
        alt="Cancel"
        onClick={() => handleDelete(_id)}
      />
      <img
        src={editImage}
        className="flex-shrink-0 w-6 h-6 ml-2 cursor-pointer "
        alt="Edit"
        onClick={() => setEditModal(true)}
      />
    </div>
  );
};

export default Todo;
