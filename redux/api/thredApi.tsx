import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

interface IThread {
  data: any;
  threadName: string;
  threadId: string;
  charmLocation: string;
}

interface IUploadImageResponse {
  success: boolean;
  imageUrl: string;
  message?: string;
}

export const threadApi = createApi({
  reducerPath: 'threadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kandi-backend.cradle.services/threads',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Thread'],
  endpoints: (builder) => ({
    // 🔹 Get all threads
    getThreads: builder.query<{ data: IThread[] }, void>({
      query: () => '',
      providesTags: ['Thread'],
    }),

    // 🔹 Get a thread by ID
    getThreadById: builder.query<IThread, string>({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: 'Thread', id }],
    }),

    // 🔹 Create a new thread
    addThread: builder.mutation<IThread, Partial<IThread>>({
      query: (body) => ({
        url: 'create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Thread'],
    }),

    // 🔹 Update thread
    updateThread: builder.mutation<IThread, { id: string; body: Partial<IThread> }>({
      query: ({ id, body }) => ({
        url: `update/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Thread', id }],
    }),

    // 🔹 Delete thread
    deleteThread: builder.mutation<void, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Thread'],
    }),

    // 🔹 Upload image to thread
    uploadThreadImage: builder.mutation<IUploadImageResponse, { threadId: string; formData: FormData }>({
      query: ({ threadId, formData }) => ({
        url: `uploadImage/${threadId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { threadId }) => [{ type: 'Thread', id: threadId }],
    }),

    getAllThreads: builder.query<any, { page_number: number; page_size: number }>({
      query: ({ page_number, page_size }) => ({
        url: `/getall`,
        method: 'GET',
        params: { page_number, page_size },
      }),
    }),

  }),
});

export const {
  useGetThreadsQuery,
  useGetThreadByIdQuery,
  useAddThreadMutation,
  useUpdateThreadMutation,
  useDeleteThreadMutation,
  useUploadThreadImageMutation,
  useGetAllThreadsQuery,
} = threadApi;
