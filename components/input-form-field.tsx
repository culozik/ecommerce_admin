import {
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form";

import {
	TFormEntityData,
	InputFormFieldProps,
	FormEntitiesDataProps,
} from "@/types/components/input-form-fields-types";

import { Input } from "@/components/ui/input";

import { TEXT } from "@/constants/components/reusableComponents/input-form-field";

export const InputFormField: React.FC<InputFormFieldProps<any>> = ({
	form,
	loading,
	name,
	type,
}) => {
	const formEntitiesData: FormEntitiesDataProps<TFormEntityData> = {
		name: {
			name: TEXT.PRODUCT.NAME,
			label: TEXT.PRODUCT.LABEL,
			placeholder: TEXT.PRODUCT.PLACEHOLDER,
		},
		price: {
			name: TEXT.PRICE.NAME,
			label: TEXT.PRICE.LABEL,
			placeholder: TEXT.PRICE.PLACEHOLDER,
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
					<FormControl>
						<Input
							type={type}
							disabled={loading}
							placeholder={formEntity.placeholder}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
