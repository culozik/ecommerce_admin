import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/categories/api-categories-constants";

//  -- Create new category route --
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, billboardId } = body;

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!name) {
			return new NextResponse(MESSAGES.NAME_REQUIRED, { status: 400 });
		}

		if (!billboardId) {
			return new NextResponse(MESSAGES.BILLBOARD_ID, { status: 400 });
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

		const category = await prismadb.category.create({
			data: {
				name,
				billboardId,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log("[CATEGORIES_POST]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

// -- Get all categories route --
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse(MESSAGES.ID_REQUIRED, { status: 400 });
		}

		const categories = await prismadb.category.findMany({
			where: { storeId: params.storeId },
		});

		return NextResponse.json(categories);
	} catch (error) {
		console.log("[CATEGORIES_GET]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
