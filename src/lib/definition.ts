export type ProductType = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
};


export type CartProductType = {
    title: string;
    image: string;
    price: number;
    id: number;
    onClick?: () => void;
};


// Define the type for recipe data
export type RecipeType = {
    id: number;
    photo: { photo: string; photoId: number }[];
    name: string;
    description: string;
    level: string;
    durationInMinutes?: string;
}