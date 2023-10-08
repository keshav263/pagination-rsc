import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	try {
		const client = await clientPromise;
		const { searchParams } = new URL(req.url);
		const page = searchParams.get("page") || 1;
		console.log({ page });
		const productsPerPage = 24; // Number of products per page

		const skipCount = (page - 1) * productsPerPage; // Calculate how many products to skip

		const db = client.db("sample_mflix");
		const pipeline = [
			{
				$skip: skipCount,
			},
			{
				$limit: productsPerPage,
			},
		];

		const products = await db.collection("movies").countDocuments();
		return NextResponse.json({
			success: true,
			productsCount: products,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.error({
			status: 500,
			message: "Something went wrong",
		});
	}
}
