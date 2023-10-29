import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/categories/api-categories-constants";

//  -- Unique category Get Route --
export async function GET(
	_req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		if (!params.categoryId) {
			return new NextResponse(MESSAGES.CATEGORY_ID_REQUIRED, { status: 400 });
		}

		//  Find a unique category
		const category = await prismadb.category.findUnique({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (err) {
		console.log("[CATEGORY_GET]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Category Update Route --
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
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

		if (!params.categoryId) {
			return new NextResponse(MESSAGES.CATEGORY_ID_REQUIRED, { status: 400 });
		}

		//  Fetch and check if storeId exist for this user
		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse(MESSAGES.UNAUTHORIZED, { status: 403 });
		}

		//  Find and update the category
		const category = await prismadb.category.updateMany({
			where: {
				id: params.categoryId,
			},
			data: { name, billboardId },
		});

		return NextResponse.json(category);
	} catch (err) {
		console.log("[CATEGORY_PATCH]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Category Delete Route --
export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; categoryId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!params.categoryId) {
			return new NextResponse(MESSAGES.CATEGORY_ID_REQUIRED, { status: 400 });
		}

		//  Fetch and check if storeId exist for this user
		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse(MESSAGES.UNAUTHORIZED, { status: 403 });
		}

		//  Find and delete the category
		const category = await prismadb.category.deleteMany({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (err) {
		console.log("[CATEGORY_DELETE]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
