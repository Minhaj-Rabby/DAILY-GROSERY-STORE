import React from "react";
import { useNavigate } from "react-router-dom";

const Item = (props) => {
	const { _id, img, name, price, supplierName, quantity } = props.item;
	//handle Update stock
	const navigate = useNavigate();
	const handleUpdateStock = () => {
		const url = `/inventory/${_id}`;
		navigate(url);
	};
	return (
		<div className="flex justify-center ">
			<div className="rounded shadow-lg bg-gray-50 relative">
				<img className="rounded-t-lg" src={img} alt="product" />

				<div className="p-6">
					<h5 className="text-gray-900 text-xl  mb-2 font-bold">
						{name}
					</h5>
					<div className="flex justify-between text-gray-400 text-sm mt-4">
						<span> Quantity : {quantity}</span>
						<span>Brand : {supplierName}</span>
					</div>
					<button
						onClick={handleUpdateStock}
						type="button"
						className="font-bold w-full mt-6 inline-block px-6 py-2.5 btn text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-200 hover:shadow-lg hover: text-white focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						style={{ color: "#0A033C" }}
					>
						Update Stock
					</button>
				</div>
				<p className="flex justify-center items-center w-14 h-8 absolute bg-yellow-50 rounded-sm text-black top-3 left-4">
					${price}
				</p>
			</div>
		</div>
	);
};

export default Item;
