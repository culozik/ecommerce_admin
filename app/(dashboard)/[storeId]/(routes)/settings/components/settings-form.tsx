"use client";

import axios from "axios";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ApiAlert } from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";

import { useOrigin } from "@/hooks/use-origin";

import { formSchema } from "@/schemas/settingsFormSchema";
import { TEXT } from "@/constants/components/settingsForm/settingsFormConstants";

import type { SettingsFormValues } from "@/schemas/settingsFormSchema";

interface SettingsFormProps {
	initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const onSubmit = async (data: SettingsFormValues) => {
		try {
			setLoading(true);
			await axios.patch(`/api/stores/${params.storeId}`, data);
			router.refresh();
			toast.success("Store updated successfully.");
		} catch (err) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);

			await axios.delete(`/api/stores/${params.storeId}`);
			router.refresh();
			router.push("/");
			toast.success("Store deleted.");
		} catch (err) {
			toast.error("Make sure you removed all products and categories first.");
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
				<Heading
					title={TEXT.HEADING_TITLE}
					description={TEXT.HEADING_DESCRIPTION}
				/>
				<Button
					disabled={loading}
					variant="destructive"
					size="icon"
					onClick={handleModalOpen}
				>
					<Trash className="h-4 w-4" />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Store name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						Save changes
					</Button>
				</form>
			</Form>
			<Separator />
			<ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description={`${origin}/api/${params.storeId}`}
				variant="public"
			/>
		</>
	);
};
