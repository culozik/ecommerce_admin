import {
	Category,
	Color,
	Image,
	Product,
	Size,
	Billboard,
} from "@prisma/client";

export interface SelectFormFieldProps<
	TFieldValues extends Billboard | Category | Color | Image | Product | Size
> {
	form: TFieldValues;
	name: string;
	loading: boolean;
	data: { id?: string; name?: string; value?: string }[] | null;
}

export interface ElemProps {
	[key: string]: any;
}

export interface TFormEntityData {
	name: string;
	label: string;
	placeholder: string;
	dataVal: string;
}

export interface FormEntitiesDataProps<prop> {
	[key: string]: prop;
}
