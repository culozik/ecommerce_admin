import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/sizes/api-sizes-constants";

//  -- Create new Size route --
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, value } = body;

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!name) {
			return new NextResponse(MESSAGES.NAME_REQUIRED, { status: 400 });
		}

		if (!value) {
			return new NextResponse(MESSAGES.VALUE_REQUIRED, { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse(MESSAGES.ID_REQUIRED, { status: 400 });
		}

		//  Check if storeId exist for this user
		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse(MESSAGES.UNAUTHORIZED, { status: 403 });
		}

		const size = await prismadb.size.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log("[SIZES_POST]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

// -- Get all sizes route --
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse(MESSAGES.ID_REQUIRED, { status: 400 });
		}

		const sizes = await prismadb.size.findMany({
			where: { storeId: params.storeId },
		});

		return NextResponse.json(sizes);
	} catch (error) {
		console.log("[SIZES_GET]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
