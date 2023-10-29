import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/sizes/api-sizes-constants";

//  -- Unique size Get Route --
export async function GET(
	_req: Request,
	{ params }: { params: { sizeId: string } }
) {
	try {
		if (!params.sizeId) {
			return new NextResponse(MESSAGES.SIZE_ID_REQUIRED, { status: 400 });
		}

		//  Find a unique size
		const size = await prismadb.size.findUnique({
			where: {
				id: params.sizeId,
			},
		});

		return NextResponse.json(size);
	} catch (err) {
		console.log("[SIZE_GET]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Size Update Route --
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; sizeId: string } }
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

		if (!params.sizeId) {
			return new NextResponse(MESSAGES.SIZE_ID_REQUIRED, { status: 400 });
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

		//  Find and update the size
		const size = await prismadb.size.updateMany({
			where: {
				id: params.sizeId,
			},
			data: { name, value },
		});

		return NextResponse.json(size);
	} catch (err) {
		console.log("[SIZE_PATCH]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Size Delete Route --
export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; sizeId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!params.sizeId) {
			return new NextResponse(MESSAGES.SIZE_ID_REQUIRED, { status: 400 });
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

		//  Find and delete the size
		const size = await prismadb.size.deleteMany({
			where: {
				id: params.sizeId,
			},
		});

		return NextResponse.json(size);
	} catch (err) {
		console.log("[SIZE_DELETE]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
