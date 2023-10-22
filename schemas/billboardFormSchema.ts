import * as z from "zod";

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { BillboardFormValues };
