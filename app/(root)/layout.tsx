import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	// Find first active store user have
	const store = await prismadb.store.findFirst({ where: { userId } });

	if (store) {
		redirect(`/${store.id}`);
	}

	return <>{children}</>;
}
