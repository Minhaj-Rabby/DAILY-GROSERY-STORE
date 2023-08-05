import { async } from "@firebase/util";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Title from "../Common/Title/Title";
import Modal from "../SmallComponents/Modal/Modal";
import { serverUrl } from "../../Variable/ServerUrl";

const SingleItemInfo = () => {
	const [item, setItem] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const { id } = useParams();
	const { name, quantity, price, img, supplierName, discription } = item;
	const [newQ, setNewQ] = useState(0);

	const [user] = useAuthState(auth);

	const [values, setValues] = useState({
		deliver: false,
		update: false,
	});
	useEffect(() => {
		const url = `${serverUrl}/products/${id}`;
		axios.get(url).then((data) => setItem(data.data));
	}, [id]);
	useEffect(() => {
		setNewQ(parseInt(quantity));
	}, [quantity]);

	const handleDeliverQuantity = async (qInput) => {
	
		if (parseInt(qInput) <= newQ) {
			const q = newQ - parseInt(qInput);

			setNewQ(q);

			const result = await axios.put(
				`${serverUrl}/products/${id}`,
				{
					quantity: q,
				}
			);

			const sellItem = {
				img: img,
				productId: id,
				productName: name,
				quantity: parseInt(qInput),
				deliverUser: user.email,
			};
			const selResult = await axios.put(
				`${serverUrl}/sellProducts`,
				{
					...sellItem,
				}
			);

			const sold = {
				...sellItem,
				username: user.displayName,
				date: new Date().toLocaleDateString(),
				time: new Date().toLocaleTimeString(),
			};
			await axios.post(
				`${serverUrl}/soldProducts`,
				{ ...sold }
			);
		} else {
			toast("Not enough items left");
		}
		
	};
	const handleUpdateStock = async (qInput) => {
		const q = parseInt(qInput) + newQ;
		setNewQ(q);
		const result = await axios.put(
			`${serverUrl}/products/${id}`,
			{
				quantity: q,
			}
		);


	};

	return (
		<div
			className="container py-20 mx-auto px-2"
			style={{ minHeight: "80vh" }}
		>
			<Title title={"Stock or Deliver Items"} />
			<h2 className="text-center text-gray-500 text-2xl uppercase mb-8">
				Inventory
			</h2>
			<div className="flex justify-center">
				<div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
					<img
						className=" w-full  md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
						src={img}
						alt="productimg"
					/>
					<div className="p-6 flex flex-col justify-start">
						<h5 className="text-gray-900 text-xl  mb-2 font-bold">
							{name}
						</h5>
						<p className="text-gray-700 text-base mb-4">
							{discription}
						</p>
						<p className="text-gray-700 text-base mb-4">
							Brand : {supplierName}
						</p>
						<p className="text-gray-600 text-sm pt-2">
							Quantity : {newQ}
						</p>
						<p className="text-gray-600 text-sm pt-2">
							Unit Price : {price}
						</p>
						<div className="flex items-center justify-between mt-3">
							<button
								onClick={() => {
									setShowModal(true);
									setValues({ update: true, deliver: false });
								}}
								type="button"
								className="inline-block px-6 py-2.5 mx-2 bg-yellow-500 text-white  text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out font-bold"
							>
								stock update
							</button>
							<button
								onClick={() => {
									setShowModal(true);
									setValues({ update: false, deliver: true });
								}}
								type="button"
								className="mx-3 inline-block px-6 py-2.5 bg-purple-600 text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
							>
								Deliver
							</button>
						</div>
					</div>
				</div>
			</div>
			{values.deliver ? (
				<Modal
					header={"Deliver Items"}
					handleDeliverQuantity={handleDeliverQuantity}
					showModal={showModal}
					setShowModal={setShowModal}
				></Modal>
			) : (
				<Modal
					header={"Increase Items"}
					handleDeliverQuantity={handleUpdateStock}
					showModal={showModal}
					setShowModal={setShowModal}
				></Modal>
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
		</div>
	);
};

export default SingleItemInfo;
