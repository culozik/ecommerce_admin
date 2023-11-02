import {
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectItem,
	SelectValue,
	SelectContent,
	SelectTrigger,
} from "@/components/ui/select";

import {
	ElemProps,
	TFormEntityData,
	SelectFormFieldProps,
	FormEntitiesDataProps,
} from "@/types/components/select-form-field-types";

import { TEXT } from "@/constants/components/reusableComponents/select-form-field";

export const SelectFormField: React.FC<SelectFormFieldProps<any>> = ({
	form,
	name,
	loading,
	data,
}) => {
	const formEntitiesData: FormEntitiesDataProps<TFormEntityData> = {
		category: {
			name: TEXT.CATEGORY.NAME,
			label: TEXT.CATEGORY.LABEL,
			placeholder: TEXT.CATEGORY.PLACEHOLDER,
			dataVal: TEXT.CATEGORY.DATA_VAL,
		},
		size: {
			name: TEXT.SIZE.NAME,
			label: TEXT.SIZE.LABEL,
			placeholder: TEXT.SIZE.PLACEHOLDER,
			dataVal: TEXT.SIZE.DATA_VAL,
		},
		color: {
			name: TEXT.COLOR.NAME,
			label: TEXT.COLOR.LABEL,
			placeholder: TEXT.COLOR.PLACEHOLDER,
			dataVal: TEXT.COLOR.DATA_VAL,
		},
	};

	const formEntity = { ...formEntitiesData[name] };

	return (
		<FormField
			control={form.control}
			name={formEntity.name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{formEntity.label}</FormLabel>
					<Select
						disabled={loading}
						onValueChange={field.onChange}
						value={field.value}
						defaultValue={field.value}
					>
						<FormControl>
							<SelectTrigger>
								<SelectValue
									defaultValue={field.value}
									placeholder={formEntity.placeholder}
								/>
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{data?.map((elem: ElemProps) => (
								<SelectItem key={elem.id} value={elem.id}>
									{elem[formEntity.dataVal]}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
