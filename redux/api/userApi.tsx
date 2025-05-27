import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { CORE_BACKEND_URL } from '@/helper/path';
import { GetUserByIdResponse, userDataUpdateRequest } from '@/app/types/UserType';

export interface User {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LoginResponse {
  statusCode: number;
  data(arg0: string, data: any): unknown;
  status: number;
  user: any;
  message: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // sign up a new user
    createUser: builder.mutation<
      {
        user: User & { id: string };
        message: string;
      },
      User
    >({
      query: (user) => ({
        url: 'User/create',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    // login a user
    loginUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: 'User/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getAllUsers: builder.query<GetUserByIdResponse, void>({
      query: () => 'User/getAll',
      providesTags: ['User'],
    }),
    // get user by id
    getUserById: builder.query<GetUserByIdResponse, { id: string }>({
      query: ({ id }) => `User/getById/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    // upload user profile picture
    uploadProfilePicture: builder.mutation<any, { id: string; file: File }>({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `User/uploadImage/${id}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    // update user profile
    updateUserProfile: builder.mutation<any, { id: string; data: userDataUpdateRequest }>({
      query: ({ id, data }) => ({
        url: `User/update/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUploadProfilePictureMutation,
} = userApi;
