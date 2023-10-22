import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/billboards/api-billboards-constants";

//  -- Unique billboard Get Route --
export async function GET(
	_req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		if (!params.billboardId) {
			return new NextResponse(MESSAGES.BILLBOARD_ID_REQUIRED, { status: 400 });
		}

		//  Find a unique billboard
		const billboard = await prismadb.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (err) {
		console.log("[BILLBOARD_GET]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Billboard Update Route --
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { label, imageUrl } = body;

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!label) {
			return new NextResponse(MESSAGES.LABEL_REQUIRED, { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse(MESSAGES.URL_REQUIRED, { status: 400 });
		}

		if (!params.billboardId) {
			return new NextResponse(MESSAGES.BILLBOARD_ID_REQUIRED, { status: 400 });
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

		//  Find and update the store
		const billboard = await prismadb.billboard.updateMany({
			where: {
				id: params.billboardId,
			},
			data: { label, imageUrl },
		});

		return NextResponse.json(billboard);
	} catch (err) {
		console.log("[BILLBOARD_PATCH]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Billboard Delete Route --
export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!params.billboardId) {
			return new NextResponse(MESSAGES.BILLBOARD_ID_REQUIRED, { status: 400 });
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

		//  Find and delete the billboard
		const billboard = await prismadb.billboard.deleteMany({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (err) {
		console.log("[BILLBOARD_DELETE]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
