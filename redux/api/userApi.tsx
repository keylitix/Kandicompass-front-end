import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { CORE_BACKEND_URL } from '@/helper/path';

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
    loginUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: 'User/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getAllUsers: builder.query<any, void>({
      query: () => 'User/getAll',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
} = userApi;
