import { Product } from "@models/Product";
import { mongooseConnect } from "@mongoose/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await mongooseConnect();
    const body = await req.json();

    const { title, description, price, images, category, properties } = body;
    const productDoc = await Product.create({
        title,
        description,
        price,
        images,
        category,
        properties,
    });

    return NextResponse.json(productDoc);
}