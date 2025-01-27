import { kroryaApi } from "../api";

export const productApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        //                        <result type,         args type>
        getProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 1, pageSize = 10 }) =>
                `api/products/?page=${page}&page_size=${pageSize}`,
        }),
        // get single product
        getProductById: builder.query<any, number>({
            query: (id) => `api/products/${id}/`,
        }),
        // update a product
        updateProduct: builder.mutation<
            any,
            { id: number; updatedProduct: object; }
        >({
            query: ({ id, updatedProduct }) => ({
                url: `/api/products/${id}/`,
                method: "PATCH",
                body: updatedProduct,
            }),
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
} = productApi;