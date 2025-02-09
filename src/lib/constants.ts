export const BASE_URL = "https://localhost:8080";
export const FILE_SIZE = 1024 * 1024 * 2; // 2MB
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
// image preview
export const getImageUrl = (photoFileName: string | undefined): string => {
    return photoFileName
        ? `${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/v1/fileView/${photoFileName}`
        : "/assets/image_login.png";
};