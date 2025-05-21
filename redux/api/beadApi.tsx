import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { CORE_BACKEND_URL } from '@/helper/path';
import { CreateBeadRequest } from '@/app/types/bead';

interface IBead {
  avatar: any;
  data: {
    data: any
  };
  _id?: string;
  beadName: string;
  beadType: string;
  material: string;
  color: string;
  size: number;
  shape: string;
  weight: number;
  finish: string;
  productCode: string;
  description: string;
  quantity: number;
  supplier: string;
  pricePerUnit: number;
  imageUrl: string;
  unitOfMeasure?: string;
  inventoryLocation?: string;
  minimumStockLevel?: number;
  maximumStockLevel?: number;
  reorderPoint?: number;
  leadTimeDays?: number;
  isActive?: boolean;
  tags?: string[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IUploadImageResponse {
  success: boolean;
  imageUrl: string;
  message?: string;
}

export const beadApi = createApi({
  reducerPath: 'beadApi',
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
  tagTypes: ['Bead'],
  endpoints: (builder) => ({
    // Get all beads with pagination
    getBeads: builder.query<
      { data: IBead[] },
      { page_number: number; page_size: number }
    >({
      query: ({ page_number, page_size }) =>
        `beads/getall?page_number=${page_number}&page_size=${page_size}`,
      providesTags: ['Bead'],
    }),

    // Get single bead by ID
    getBeadById: builder.query<IBead, string>({
      query: (id) => `beads/${id}`,
      providesTags: (result, error, id) => [{ type: 'Bead', id }],
    }),

    //Get bead by threadId  beads/by-thread
getBeadByThreadId: builder.query<any, { threadId: string; page_number: number; page_size: number }>({
      query: ({ threadId, page_number, page_size }) =>
        `beads/by-thread/${threadId}?page_no=${page_number}&page_size=${page_size}`,

      providesTags: ['Bead'],
    }),

    // Create new bead
    addBead: builder.mutation<any, Partial<CreateBeadRequest>>({
      query: (body) => ({
        url: 'beads/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bead'],
    }),

    // Update existing bead
    updateBead: builder.mutation<IBead, { id: string; body: Partial<IBead> }>({
      query: ({ id, body }) => ({
        url: `beads/updateBead/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Bead', id }],
    }),

    // Delete bead
    deleteBead: builder.mutation<void, string>({
      query: (id) => ({
        url: `beads/deleteBead/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bead'],
    }),

    // Upload image for specific bead
uploadBeadImage: builder.mutation<any, { beadId: string; formData: FormData }>({

      query: ({ beadId, formData }) => ({
        url: `beads/uploadImage/${beadId}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { beadId }) => [
        { type: 'Bead', id: beadId },
      ],
    }),

    // Combined create bead with image upload
    createBeadWithImage: builder.mutation<
      IBead,
      { beadData: Partial<IBead>; imageFile: File | null }
    >({
      async queryFn({ beadData, imageFile }, api, extraOptions, baseQuery) {
        // Step 1: Create the bead
        const beadResult = await baseQuery({
          url: 'beads/create',
          method: 'POST',
          body: beadData,
        });

        if (beadResult.error) {
          return { error: beadResult.error };
        }

        const newBead = beadResult.data as IBead;

        // Step 2: If image was provided, upload it
        if (imageFile && newBead._id) {
          const formData = new FormData();
          formData.append('image', imageFile);

          const imageResult = await baseQuery({
            url: `beads/uploadImage/${newBead._id}`,
            method: 'POST',
            body: formData,
          });

          if (imageResult.error) {
            return { error: imageResult.error };
          }

          // Update the bead with the image URL if needed
          const imageResponse = imageResult.data as IUploadImageResponse;
          if (imageResponse.imageUrl) {
            await baseQuery({
              url: `beads/updateBead/${newBead._id}`,
              method: 'PUT',
              body: { imageUrl: imageResponse.imageUrl },
            });
          }
        }

        return { data: newBead };
      },
      invalidatesTags: ['Bead'],
    }),
  }),
});

export const {
  useGetBeadsQuery,
  useGetBeadByIdQuery,
  useGetBeadByThreadIdQuery,
  useAddBeadMutation,
  useUpdateBeadMutation,
  useDeleteBeadMutation,
  useUploadBeadImageMutation,
  useCreateBeadWithImageMutation,
} = beadApi;
