import * as z from "zod";

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { CategoryFormValues };
