import * as z from "zod";

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(4).regex(/^#/, {
		message: "String must be a valid hex color code",
	}),
});

type ColorFormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { ColorFormValues };
