import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/colors/api-colors-constants";

//  -- Unique color Get Route --
export async function GET(
	_req: Request,
	{ params }: { params: { colorId: string } }
) {
	try {
		if (!params.colorId) {
			return new NextResponse(MESSAGES.COLOR_ID_REQUIRED, { status: 400 });
		}

		//  Find a unique color
		const color = await prismadb.color.findUnique({
			where: {
				id: params.colorId,
			},
		});

		return NextResponse.json(color);
	} catch (err) {
		console.log("[Color_GET]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Color Update Route --
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; colorId: string } }
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

		if (!params.colorId) {
			return new NextResponse(MESSAGES.COLOR_ID_REQUIRED, { status: 400 });
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

		//  Find and update the color
		const color = await prismadb.color.updateMany({
			where: {
				id: params.colorId,
			},
			data: { name, value },
		});

		return NextResponse.json(color);
	} catch (err) {
		console.log("[COLOR_PATCH]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Color Delete Route --
export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; colorId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!params.colorId) {
			return new NextResponse(MESSAGES.COLOR_ID_REQUIRED, { status: 400 });
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

		//  Find and delete the color
		const color = await prismadb.color.deleteMany({
			where: {
				id: params.colorId,
			},
		});

		return NextResponse.json(color);
	} catch (err) {
		console.log("[COLOR_DELETE]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
