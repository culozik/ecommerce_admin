import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/billboards/api-billboards-constants";

//  -- Create new billboard route --
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
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

		const billboard = await prismadb.billboard.create({
			data: {
				label,
				imageUrl,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_POST]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

// -- Get all billboards route --
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		if (!params.storeId) {
			return new NextResponse(MESSAGES.ID_REQUIRED, { status: 400 });
		}

		const billboards = await prismadb.billboard.findMany({
			where: { storeId: params.storeId },
		});

		return NextResponse.json(billboards);
	} catch (error) {
		console.log("[BILLBOARDS_GET]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
