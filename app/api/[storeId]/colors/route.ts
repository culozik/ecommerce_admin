import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/colors/api-colors-constants";

//  -- Create new Color route --
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

		const color = await prismadb.color.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLORS_POST]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

// -- Get all colors route --
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse(MESSAGES.ID_REQUIRED, { status: 400 });
		}

		const colors = await prismadb.color.findMany({
			where: { storeId: params.storeId },
		});

		return NextResponse.json(colors);
	} catch (error) {
		console.log("[COLORS_GET]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
