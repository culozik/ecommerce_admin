import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/products/api-products-constants";

//  -- Create new product route --
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const {
			name,
			price,
			categoryId,
			colorId,
			sizeId,
			images,
			isFeatured,
			isArchived,
		} = body;

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!name) {
			return new NextResponse(MESSAGES.NAME_REQUIRED, { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse(MESSAGES.IMAGES_REQUIRED, { status: 400 });
		}

		if (!price) {
			return new NextResponse(MESSAGES.PRICE_REQUIRED, { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse(MESSAGES.CATEGORY_ID_REQUIRED, { status: 400 });
		}

		if (!colorId) {
			return new NextResponse(MESSAGES.COLOR_ID_REQUIRED, { status: 400 });
		}

		if (!sizeId) {
			return new NextResponse(MESSAGES.SIZE_ID_REQUIRED, { status: 400 });
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

		const product = await prismadb.product.create({
			data: {
				name,
				price,
				isFeatured,
				isArchived,
				categoryId,
				colorId,
				sizeId,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT_POST]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

// -- Get all products route --
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get("categoryId") || undefined;
		const colorId = searchParams.get("colorId") || undefined;
		const sizeId = searchParams.get("sizeId") || undefined;
		const isFeatured = searchParams.get("isFeatured");

		if (!params.storeId) {
			return new NextResponse(MESSAGES.ID_REQUIRED, { status: 400 });
		}

		const products = await prismadb.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				colorId,
				sizeId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log("[PRODUCTS_GET]", error);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
