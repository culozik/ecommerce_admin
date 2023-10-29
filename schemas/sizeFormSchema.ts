import * as z from "zod";

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { SizeFormValues };
