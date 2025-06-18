import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { CORE_BACKEND_URL } from '@/helper/path';

export const feadApi = createApi({
  reducerPath: 'feadApi',
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
  tagTypes: ['Bead', 'feed'],
  endpoints: (builder) => ({
    likePost: builder.mutation<any, { postId: string; userId: string }>({
      query: ({ postId, userId }) => ({
        url: `beads/feed/${postId}/like`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: ['feed', 'Bead'],
    }),

    unlikePost: builder.mutation<any, { postId: string; userId: string }>({
      query: ({ postId, userId }) => ({
        url: `beads/feed/${postId}/unlike`,
        method: 'DELETE',
        body: { userId },
      }),
      invalidatesTags: ['feed', 'Bead'],
    }),

    commentPost: builder.mutation<
      any,
      { postId: string; userId: string; text: string }
    >({
      query: ({ postId, userId, text }) => ({
        url: `beads/feed/${postId}/comment`,
        method: 'POST',
        body: { userId, text },
      }),
      invalidatesTags: ['feed', 'Bead'],
    }),

    getLikes: builder.query<any, { postId: string }>({
      query: ({ postId }) => `beads/feed/${postId}/likes`,
      providesTags: ['feed'],
    }),

    getComments: builder.query<any, { postId: string }>({
      query: ({ postId }) => `beads/feed/${postId}/comments`,
      providesTags: ['feed'],
    }),
  }),
});

export const {
  useLikePostMutation,
  useUnlikePostMutation,
  useCommentPostMutation,
  useGetLikesQuery,
  useGetCommentsQuery,
} = feadApi;
