interface Messages {
	UNAUTHORIZED: string;
	UNAUTHENTICATED: string;
	NAME_REQUIRED: string;
	VALUE_REQUIRED: string;
	ID_REQUIRED: string;
	COLOR_ID_REQUIRED: string;
	ERROR: string;
}

export const MESSAGES: Messages = {
	UNAUTHORIZED: "Unauthorized",
	UNAUTHENTICATED: "Unauthenticated",
	NAME_REQUIRED: "Name is Required",
	VALUE_REQUIRED: "Value is required",
	ID_REQUIRED: "Store id is required",
	COLOR_ID_REQUIRED: "Color id is required",
	ERROR: "Internal error",
};
