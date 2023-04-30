import React, { useEffect, useState } from "react";
import { useCreateTodoMutation } from "../redux/features/todo/todoApi";
import Error from "./Error";
import Loader from "./Loader";
const AddTodoModal = ({ setShowModal }) => {
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [createTodo, { isLoading, isError, error, isSuccess }] =
    useCreateTodoMutation();

  //   handle add todo function
  const handleAddTodo = (e) => {
    e.preventDefault();
    createTodo({ text, desc, date, color: "", completed: false });
  };

  //   close modal after add todo
  useEffect(() => {
    if (isSuccess) setShowModal(false);
  }, [isSuccess]);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative sm:w-10/12 md:w-9/12 xl:w-6/12 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-slate-700">
                Add New Todo
              </h3>

              <span className=" text-2xl block outline-none focus:outline-none">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:outline-1 hover:border hover:bottom-2 hover:rounded hover:bg-red-300 hover:text-white"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </span>
            </div>

            {/*body*/}
            <div className="w-4/5 m-auto">
              <form className="mt-8 space-y-6" onSubmit={handleAddTodo}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="!my-2">
                    <label htmlFor="text" className="sr-only">
                      text
                    </label>
                    <input
                      id="text"
                      name="text"
                      type="text"
                      autoComplete="text"
                      required
                      className="login-input rounded-t-md"
                      placeholder="todo title"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <div className="!my-2">
                    <label htmlFor="text" className="sr-only">
                      Description
                    </label>
                    <textarea
                      id="Description"
                      name="Description"
                      type="text"
                      autoComplete="Description"
                      required
                      className="login-input rounded-t-md"
                      placeholder="todo Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div className="!my-2">
                    <label htmlFor="text" className="sr-only"></label>
                    <input
                      id=""
                      name=""
                      type="date"
                      autoComplete=""
                      required
                      className="login-input rounded-t-md"
                      placeholder="todo "
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    {isLoading ? <Loader /> : "ADD TODO"}
                  </button>
                </div>
                {isError && (
                  <Error
                    message={
                      error?.data?.message
                        ? error?.data?.message
                        : error?.status
                    }
                  />
                )}
              </form>
            </div>

            {/*footer*/}
            <div className="flex items-start justify-start p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:outline-1 hover:border hover:bottom-2 hover:rounded hover:bg-red-300 hover:text-white"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {/* <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAddTodo}
              >
                Save Changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddTodoModal;
