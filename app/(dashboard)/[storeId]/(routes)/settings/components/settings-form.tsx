"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";

import { formSchema } from "@/schemas/settingsFormSchema";
import { TEXT } from "@/constants/components/settingsForm/settingsFormConstants";

import type { SettingsFormValues } from "@/schemas/settingsFormSchema";

interface SettingsFormProps {
	initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const onSubmit = async (data: SettingsFormValues) => {
		console.log(data);
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={TEXT.HEADING_TITLE}
					description={TEXT.HEADING_DESCRIPTION}
				/>
				<Button variant="destructive" size="sm" onClick={() => {}}>
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
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</>
	);
};
