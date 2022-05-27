import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../SmallComponents/Spinner/Spinner";
import Item from "../Item/Item";
import Summery from "../Summery/Summery";

const TopItems = () => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		axios
			.get("https://lit-hamlet-04037.herokuapp.com/products?size=6")
			.then((data) => setItems(data.data));
	}, []);

	return (
		<div>
			{items?.length ? (
				<div
					className="container mx-auto py-12"
					style={{ minHeight: "80vh" }}
				>
					<h2 className="text-center pb-8 font-bold uppercase text-lg sm:text-2xl pl-12">
						Most Famous items
					</h2>
					{items ? (
						<div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
							{items.map((item) => (
								<Item key={item._id} item={item} />
							))}
						</div>
					) : (
						<Spinner />
					)}
					<div className="flex justify-end pt-6 mr-5">
						<Link
							to={"/manageitems"}
							className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-lg leading-tight uppercase rounded hover:underline  focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out cursor-pointer"
						>
							Manage Inventories{" "}
							<i className="fa-solid fa-arrow-right-long"></i>
						</Link>
					</div>
					<Summery />
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default TopItems;
