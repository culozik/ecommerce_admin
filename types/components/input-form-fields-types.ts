import {
	Category,
	Color,
	Image,
	Product,
	Size,
	Billboard,
} from "@prisma/client";

export interface InputFormFieldProps<
	TFieldValues extends Billboard | Category | Color | Image | Product | Size
> {
	form: TFieldValues;
	name: string;
	loading: boolean;
	type: string;
}

export interface TFormEntityData {
	name: string;
	label: string;
	placeholder: string;
}

export interface FormEntitiesDataProps<prop> {
	[key: string]: prop;
}
