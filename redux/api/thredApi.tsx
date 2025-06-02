import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { CORE_BACKEND_URL } from '@/helper/path';
import { GetInvitationsResponse, RespondToInvitationRequest, RespondToInvitationResponse, sendInvitationRequest, SendInvitationResponse, ThreadDeleteResponse } from '@/app/types/threads';
import { getIn } from 'formik';
import { BeadPurchaseRequest } from '@/app/types/bead';

interface IThread {
  data: any;
  threadName: string;
  threadId: string;
  charmLocation: string;
}

interface ThreadResponse {
  data: any;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

interface IUploadImageResponse {
  success: boolean;
  imageUrl: string;
  message?: string;
}

export const threadApi = createApi({
  reducerPath: 'threadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CORE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Thread', 'Invitations', 'Bead'],
  endpoints: (builder) => ({
    // Get all threads
    getThreads: builder.query<{ data: IThread[] }, void>({
      query: () => '',
      providesTags: ['Thread'],
    }),

    // Get a thread by ID
    getThreadById: builder.query<IThread, string>({
      query: (id) => `threads/getById/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Thread', id }],
    }),

    // Create a new thread
    addThread: builder.mutation<ThreadResponse, Partial<IThread>>({
      query: (body) => ({
        url: 'threads/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Thread'],
    }),

    // Update thread
    updateThread: builder.mutation<
      IThread,
      { id: string; body: Partial<IThread> }
    >({
      query: ({ id, body }) => ({
        url: `threads/update/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Thread', id }],
    }),

    // Delete thread
    deleteThread: builder.mutation<ThreadDeleteResponse, string>({
      query: (id) => ({
        url: `threads/deleteThread/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Thread'],
    }),

    // Upload image to thread
    uploadThreadImage: builder.mutation<
      IUploadImageResponse,
      { threadId: string; formData: FormData }
    >({
      query: ({ threadId, formData }) => ({
        url: `threads/uploadImage/${threadId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { threadId }) => [
        { type: 'Thread', id: threadId },
      ],
    }),

    getAllThreads: builder.query<
      any,
      { page_number: number; page_size: number }
    >({
      query: ({ page_number, page_size }) => ({
        url: `threads/getall`,
        method: 'GET',
        params: { page_number, page_size },
      }),
    }),

    getThreadsByOwner: builder.query<
      any,
      { id: string; page_number: number; page_size: number }
    >({
      query: ({ id, page_number, page_size }) => ({
        url: `threads/getByOwner/${id}`,
        method: 'GET',
        params: { page_number, page_size },
      }),
    }),

    getThreadsByMember: builder.query<
      any,
      { id: string; page_number: number; page_size: number }
    >({
      query: ({ id, page_number, page_size }) => ({
        url: `threads/getByMember/${id}`,
        method: 'GET',
        params: { page_number, page_size },
      }),
    }),

    // send invitation to user
    sendInvitation: builder.mutation<SendInvitationResponse, sendInvitationRequest>({
      query: (payload) => ({
        url: `threads/create-invite`,
        method: 'POST',
        body: payload,
      }),
    }),

    //get invitations by user email
    getInvitations: builder.query<GetInvitationsResponse, string>({
      query: (email) => ({
        url: `threads/get-invitations-by-email/${email}`,
        method: 'GET',
      }),
      providesTags: (result, error, email) => [{ type: 'Invitations', id: `invites-${email}` }],
      keepUnusedDataFor: 300,
    }),

    // respond to invitation
    respondeToInvitation: builder.mutation<RespondToInvitationResponse, RespondToInvitationRequest>({
      query: (payload) => ({
        url: `threads/respond-to-invite`,
        method: 'POST',
        body: payload,
      }),
    }),

    // bead purchase request
    beadPurchaseRequest: builder.mutation<any, BeadPurchaseRequest>({
      query: (data) => ({
        url: `threads/request-bead-purchase`,
        method: 'POST',
        body: data,
      }),
    }),

    // bead request by email id
    getBeadRequestByEmail: builder.query<any, string>({
      query: (email) => ({
        url: `threads/bead-requests/${email}`,
        method: 'GET',
      }),
      providesTags: (result, error, email) => [{ type: 'Bead', id: `bead-request-${email}` }],
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
  useGetThreadsByOwnerQuery,
  useGetThreadsByMemberQuery,
  useSendInvitationMutation,
  useGetInvitationsQuery,
  useRespondeToInvitationMutation,
  useBeadPurchaseRequestMutation,
  useGetBeadRequestByEmailQuery,
} = threadApi;
