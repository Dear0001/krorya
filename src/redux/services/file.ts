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

        getFileByName: builder.query<string, string>({
            query: (fileName) => ({
                url: `/api/v1/fileView/${fileName}`,
                method: "GET",
            }),
            transformResponse: (response: string) => response,
            providesTags: (_result, _error, fileName) => [{ type: "file", id: fileName }],
        }),
    }),
});

export const { useUploadFileMutation, useGetFileByNameQuery } = fileApi;
