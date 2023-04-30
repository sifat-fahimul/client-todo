import { apiSlice } from "../api/apiSlice";

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get todo api function
    getTodo: builder.query({
      query: () => `/api/todo`,
    }),

    // get todo api function
    getSingleTodo: builder.query({
      query: (id) => `/api/todo/${id}`,
    }),

    // create todo api function
    createTodo: builder.mutation({
      query: (data) => ({
        url: `/api/todo`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const toto = await queryFulfilled;
          // pessimistic update
          dispatch(
            apiSlice.util.updateQueryData("getTodo", undefined, (draft) => {
              draft.push(toto.data);
            })
          );
        } catch (err) {}
      },
    }),

    // update todo api function
    updateTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/todo/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic update
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData("getTodo", undefined, (draft) => {
            const draftTodo = draft.find((todo) => todo._id == arg.id);
            draftTodo.text =
              arg.data?.text == undefined ? draftTodo.text : arg.data?.text;
            draftTodo.desc =
              arg.data?.desc == undefined ? draftTodo.desc : arg.data?.desc;
            draftTodo.date =
              arg.data?.date == undefined ? draftTodo.date : arg.data?.date;
            draftTodo.color =
              arg.data?.color == undefined ? draftTodo.color : arg.data?.color;
            draftTodo.completed =
              arg.data?.completed == undefined
                ? draftTodo.completed
                : arg.data?.completed;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult1.undo();
        }
      },
    }),

    // delete todo api function
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/api/todo/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTodo", undefined, (draft) => {
            return (draft = draft.filter((todo) => todo._id !== arg));
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTodoQuery,
  useUpdateTodoMutation,
  useDeleteTaskMutation,
  useCreateTodoMutation,
  useGetSingleTodoQuery,
} = todoApi;
