import { kroryaApi } from "../api";

export const fileApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<{
            payload: any; fileName: string
        }, FormData>({
            query: (formData) => ({
                url: '/api/v1/fileView/file',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: "file", id: "LIST" }],
        }),
        viewFile: builder.query<any, string>({
            query: (fileName: string) => `/api/v1/fileView/${fileName}`,
            providesTags: [{ type: "file", id: "LIST" }]
        }),
    }),
});

export const { useUploadFileMutation, useViewFileQuery } = fileApi;
