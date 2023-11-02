import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { MESSAGES } from "@/constants/api/products/api-products-constants";

//  -- Unique product Get Route --
export async function GET(
	_req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		if (!params.productId) {
			return new NextResponse(MESSAGES.PRODUCT_ID_REQUIRED, { status: 400 });
		}

		//  Find a unique product
		const product = await prismadb.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true,
			},
		});

		return NextResponse.json(product);
	} catch (err) {
		console.log("[PRODUCT_GET]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Product Update Route --
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; productId: string } }
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

		if (!params.productId) {
			return new NextResponse(MESSAGES.PRODUCT_ID_REQUIRED, { status: 400 });
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

		//  Find and update the product
		await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name,
				price,
				categoryId,
				colorId,
				sizeId,
				images: {
					deleteMany: {},
				},
				isFeatured,
				isArchived,
			},
		});

		const product = await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (err) {
		console.log("[PRODUCT_PATCH]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}

//  -- Product Delete Route --
export async function DELETE(
	_req: Request,
	{ params }: { params: { storeId: string; productId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse(MESSAGES.UNAUTHENTICATED, { status: 401 });
		}

		if (!params.productId) {
			return new NextResponse(MESSAGES.PRODUCT_ID_REQUIRED, { status: 400 });
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

		//  Find and delete the product
		const product = await prismadb.product.deleteMany({
			where: {
				id: params.productId,
			},
		});

		return NextResponse.json(product);
	} catch (err) {
		console.log("[PRODUCT_DELETE]", err);
		return new NextResponse(MESSAGES.ERROR, { status: 500 });
	}
}
