interface Messages {
	UNAUTHORIZED: string;
	UNAUTHENTICATED: string;
	NAME_REQUIRED: string;
	IMAGES_REQUIRED: string;
	PRICE_REQUIRED: string;
	CATEGORY_ID_REQUIRED: string;
	COLOR_ID_REQUIRED: string;
	SIZE_ID_REQUIRED: string;
	URL_REQUIRED: string;
	ID_REQUIRED: string;
	PRODUCT_ID_REQUIRED: string;
	ERROR: string;
}

export const MESSAGES: Messages = {
	UNAUTHORIZED: "Unauthorized",
	UNAUTHENTICATED: "Unauthenticated",
	NAME_REQUIRED: "Name is Required",
	IMAGES_REQUIRED: "Images are Required",
	PRICE_REQUIRED: "Price is Required",
	CATEGORY_ID_REQUIRED: "Category ID is Required",
	COLOR_ID_REQUIRED: "Color ID is Required",
	SIZE_ID_REQUIRED: "Size ID is Required",
	URL_REQUIRED: "Image URL is required",
	ID_REQUIRED: "Store ID is required",
	PRODUCT_ID_REQUIRED: "Product ID is required",
	ERROR: "Internal error",
};
