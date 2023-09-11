import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/stores/api-store-constants";

// Create new store route
export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name } = body;

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHORIZED, { status: 401 });
		}

		if (!name) {
			return new NextResponse(MESSAGES.NAME_REQUIRED, { status: 400 });
		}

		const store = await prismadb.store.create({
			data: {
				name,
				userId,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORES_POST]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
