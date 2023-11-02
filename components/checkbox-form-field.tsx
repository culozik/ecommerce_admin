import {
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import {
	TFormEntityData,
	CheckboxFormFieldProps,
	FormEntitiesDataProps,
} from "@/types/components/checkbox-form-types";

import { TEXT } from "@/constants/components/reusableComponents/checkbox-form-field";

export const CheckboxFormField: React.FC<CheckboxFormFieldProps<any>> = ({
	form,
	name,
}) => {
	const formEntitiesData: FormEntitiesDataProps<TFormEntityData> = {
		isFeatured: {
			name: TEXT.FEATURED.NAME,
			label: TEXT.FEATURED.LABEL,
			description: TEXT.FEATURED.DESCRIPTION,
		},
		isArchived: {
			name: TEXT.ARCHIVED.NAME,
			label: TEXT.ARCHIVED.LABEL,
			description: TEXT.ARCHIVED.DESCRIPTION,
		},
	};

	const formEntity = { ...formEntitiesData[name] };

	return (
		<FormField
			control={form.control}
			name={formEntity.name}
			render={({ field }) => (
				<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className="space-y-1 leading-none">
						<FormLabel>{formEntity.label}</FormLabel>
						<FormDescription>{formEntity.description}</FormDescription>
					</div>
				</FormItem>
			)}
		/>
	);
};
