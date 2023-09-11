interface Messages {
	SUCCESS: string;
	ERROR: string;
}

interface Text {
	TITLE: string;
	DESCRIPTION: string;
	PLACEHOLDER: string;
	FORM_LABEL: string;
	BTN_SUBMIT: string;
	BTN_CANCEL: string;
}

export const MESSAGES: Messages = {
	SUCCESS: "Store created.",
	ERROR: "Something went wrong.",
};

export const TEXT: Text = {
	TITLE: "Crete store",
	DESCRIPTION: "Add a new store to manage products and categories",
	PLACEHOLDER: "E-Commerce",
	FORM_LABEL: "Name",
	BTN_SUBMIT: "Continue",
	BTN_CANCEL: "Cancel",
};
