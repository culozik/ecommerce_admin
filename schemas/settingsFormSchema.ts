import * as z from "zod";

const formSchema = z.object({
	name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { SettingsFormValues };
