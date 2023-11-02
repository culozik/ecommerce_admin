import {
	Category,
	Color,
	Image,
	Product,
	Size,
	Billboard,
} from "@prisma/client";

export interface CheckboxFormFieldProps<TFieldValues extends Product> {
	form: TFieldValues;
	name: string;
}

export interface TFormEntityData {
	name: string;
	label: string;
	description: string;
}

export interface FormEntitiesDataProps<prop> {
	[key: string]: prop;
}
