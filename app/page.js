import Image from "next/image";
import styles from "./page.module.css";
import Pagination from "./components/Pagination";

async function getCount() {
	const response = await fetch("http://localhost:3000/api/product-count", {
		method: "GET",
	});

	if (!response.ok) {
		return 0;
	}

	const responseJson = await response.json();
	console.log(responseJson.productsCount);
	return responseJson.productsCount;
}

async function getProducts(searchParams) {
	const { page } = searchParams;

	const pageParam = page ? `&page=${page}` : "";

	const response = await fetch(`http://localhost:3000/api?${pageParam}`, {
		method: "GET",
	});

	if (!response.ok) {
		return [];
	}

	const responseJson = await response.json();
	console.log(responseJson.products.length);
	return responseJson.products;
}

export default async function Home(props) {
	const products = await getProducts(props.searchParams);
	const productsCount = await getCount();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>Pagination</p>
			</div>
			<div className={styles.content}>
				{products.map((product, index) => (
					<div key={index} className={styles.item}>
						<Image
							fill
							src={`http://unsplash.it/200/200?random&sig=${product._id}`}
							alt={product.title}
						/>
					</div>
				))}
			</div>
			<Pagination products={productsCount} />
		</div>
	);
}
