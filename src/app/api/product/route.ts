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
export async function GET(req: NextRequest) {
    await mongooseConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
        const productDoc = await Product.findById(id);
        return NextResponse.json(productDoc);
    } else {
        const productDocs = await Product.find();
        return NextResponse.json(productDocs);
    }
}
export async function DELETE(req: NextRequest) {
    await mongooseConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product deleted successfully." });
    } else {
        return NextResponse.json({ message: "Product ID is required." }, { status: 400 });
    }
}