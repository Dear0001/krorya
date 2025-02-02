import { kroryaApi } from "../api";

export const fileApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<{ fileName: string }, FormData>({
            query: (formData) => ({
                url: '/api/v1/fileView/file',
                method: 'POST',
                body: formData,
            }),
        }),
        viewFile: builder.query<any, string>({
            query: (fileName: string) => `/api/v1/fileView/${fileName}`,
        }),
    }),
});

export const { useUploadFileMutation, useViewFileQuery } = fileApi;
