"use client";

import axios from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/image-upload";
import { AlertModal } from "@/components/modals/alert-modal";
import { InputFormField } from "@/components/input-form-field";
import { SelectFormField } from "@/components/select-form-field";
import { CheckboxFormField } from "@/components/checkbox-form-field";

import { formSchema } from "@/schemas/productFormSchema";

import type { ProductFormValues } from "@/schemas/productFormSchema";

interface ProductFormProps {
	initialData: (Product & { images: Image[] }) | null;
	categories: Category[];
	colors: Color[];
	sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories,
	colors,
	sizes,
}) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? "Edit product" : "Create product";
	const description = initialData ? "Edit a product" : "Create a new product";
	const toastMessage = initialData ? "Product updated." : "Product created.";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? { ...initialData, price: parseFloat(String(initialData?.price)) }
			: {
					name: "",
					images: [],
					price: 0,
					categoryId: "",
					colorId: "",
					sizeId: "",
					isFeatured: false,
					isArchived: false,
			  },
	});

	const onSubmit = async (data: ProductFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/products/${params.productId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/products`, data);
			}

			router.refresh();
			router.push(`/${params.storeId}/products`);
			toast.success(toastMessage);
		} catch (err) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);

			await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
			router.refresh();
			router.push(`/${params.storeId}/products`);
			toast.success("Product deleted.");
		} catch (err) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	// -- Handle modal state --
	const handleModalOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				loading={loading}
				onClose={handleClose}
				onConfirm={onDelete}
			/>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="icon"
						onClick={handleModalOpen}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map((image) => image.url)}
										disabled={loading}
										onChange={(url) =>
											field.onChange([...field.value, { url }])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter((current) => current.url !== url),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<InputFormField
							form={form}
							loading={loading}
							name={"name"}
							type={"text"}
						/>
						<InputFormField
							form={form}
							loading={loading}
							name={"price"}
							type={"number"}
						/>
						<SelectFormField
							form={form}
							name={"category"}
							loading={loading}
							data={categories}
						/>
						<SelectFormField
							form={form}
							name={"size"}
							loading={loading}
							data={sizes}
						/>
						<SelectFormField
							form={form}
							name={"color"}
							loading={loading}
							data={colors}
						/>
						<CheckboxFormField form={form} name={"isFeatured"} />
						<CheckboxFormField form={form} name={"isArchived"} />
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
