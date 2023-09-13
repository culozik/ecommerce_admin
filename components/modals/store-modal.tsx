"use client";
import { useState } from "react";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { MESSAGES, TEXT } from "@/constants/modals/store-modal-constants";

const formSchema = z.object({
	name: z.string().min(1),
});

export const StoreModal = () => {
	const storeModal = useStoreModal();

	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	//Submit function for creating a store
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);

			const response = await axios.post("/api/stores", values);

			window.location.assign(`/${response.data.id}`);
		} catch (error) {
			toast.error(MESSAGES.ERROR);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title={TEXT.TITLE}
			description={TEXT.DESCRIPTION}
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="space-y-4 py-2 pb-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{TEXT.FORM_LABEL}</FormLabel>
										<FormControl>
											<Input
												disabled={loading}
												placeholder={TEXT.PLACEHOLDER}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button
									disabled={loading}
									variant="outline"
									onClick={storeModal.onClose}
								>
									{TEXT.BTN_CANCEL}
								</Button>
								<Button disabled={loading} type="submit">
									{TEXT.BTN_SUBMIT}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
