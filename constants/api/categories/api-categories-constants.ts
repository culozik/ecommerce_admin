interface Messages {
	UNAUTHORIZED: string;
	UNAUTHENTICATED: string;
	NAME_REQUIRED: string;
	BILLBOARD_ID: string;
	ID_REQUIRED: string;
	CATEGORY_ID_REQUIRED: string;
	ERROR: string;
}

export const MESSAGES: Messages = {
	UNAUTHORIZED: "Unauthorized",
	UNAUTHENTICATED: "Unauthenticated",
	NAME_REQUIRED: "Name is Required",
	BILLBOARD_ID: "Billboard ID is required",
	ID_REQUIRED: "Store id is required",
	CATEGORY_ID_REQUIRED: "Category ID is required",
	ERROR: "Internal error",
};
