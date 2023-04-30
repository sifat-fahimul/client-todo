import React from "react";

const ViewTodoModal = ({ setShowModal, todo }) => {
  const { text, _id, completed, color, desc, date } = todo || {};
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-9/12 md:w-7/12 lg:w-5/12 xl:w-5/12 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold text-slate-700">{text}</h3>

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
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {desc}
              </p>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Date : {date}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-start p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:outline-1 hover:border hover:bottom-2 hover:rounded hover:bg-red-300 hover:text-white"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ViewTodoModal;
