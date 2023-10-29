interface Messages {
	UNAUTHORIZED: string;
	UNAUTHENTICATED: string;
	NAME_REQUIRED: string;
	VALUE_REQUIRED: string;
	ID_REQUIRED: string;
	SIZE_ID_REQUIRED: string;
	ERROR: string;
}

export const MESSAGES: Messages = {
	UNAUTHORIZED: "Unauthorized",
	UNAUTHENTICATED: "Unauthenticated",
	NAME_REQUIRED: "Name is Required",
	VALUE_REQUIRED: "Value is required",
	ID_REQUIRED: "Store id is required",
	SIZE_ID_REQUIRED: "Size id is required",
	ERROR: "Internal error",
};
