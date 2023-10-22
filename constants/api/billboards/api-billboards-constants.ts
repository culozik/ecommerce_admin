interface Messages {
	UNAUTHORIZED: string;
	UNAUTHENTICATED: string;
	LABEL_REQUIRED: string;
	URL_REQUIRED: string;
	ID_REQUIRED: string;
	BILLBOARD_ID_REQUIRED: string;
	ERROR: string;
}

export const MESSAGES: Messages = {
	UNAUTHORIZED: "Unauthorized",
	UNAUTHENTICATED: "Unauthenticated",
	LABEL_REQUIRED: "Label is Required",
	URL_REQUIRED: "Image URL is required",
	ID_REQUIRED: "Store id is required",
	BILLBOARD_ID_REQUIRED: "Billboard id is required",
	ERROR: "Internal error",
};
