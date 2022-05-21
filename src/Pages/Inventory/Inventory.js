import { async } from "@firebase/util";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Common/Title/Title";
import ConfirmModal from "../SmallComponents/ConfirmModal/ConfirmModal";
import Spinner from "../SmallComponents/Spinner/Spinner";
import TableRowItem from "./TableRowItem";

const Inventory = () => {
	const [items, setItems] = useState([]);
	const [confirm, setConfirm] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [id, setId] = useState("");

	useEffect(() => {
		setLoading(true);
		axios
			.get("https://lit-hamlet-04037.herokuapp.com/products")
			.then((data) => {
				setItems(data.data);
				setLoading(false);
			});
	}, []);

	//delete opration
	const handleDeleteOparation = (id) => {
		setShowModal(true);
		setId(id);
	};
	useEffect(() => {
		const de = async () => {
			if (confirm) {
				const result = await axios.delete(
					`https://lit-hamlet-04037.herokuapp.com/products/${id}`
				);
				if (result?.data.deletedCount) {
					const restData = items.filter((item) => item._id !== id);
					setItems(restData);
					setConfirm(false);
				}
			}
		};
		de();
	}, [confirm, id, items]);

	//navigate

	const navigate = useNavigate();

	return (
		<div
			className="pt-8"
			style={{ backgroundColor: "#F7F7F9", minHeight: "80vh" }}
		>
			<Title title={"Manage Items"} />
			<h2 className="text-center text-gray-500 text-2xl uppercase mb-3">
				Manage Items
			</h2>
			{!isLoading ? (
				<>
					{items?.length ? (
						<div className="container mx-auto py-5">
							<div className="flex justify-end">
								<button
									onClick={() => {
										navigate("/addProduct");
									}}
									type="button"
									className="mb-5 inline-block px-6 py-2.5 bg-gray-500 text-white  text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
								>
									<FontAwesomeIcon
										className="text-base"
										icon={faSquarePlus}
									></FontAwesomeIcon>{" "}
									<span className="uppercase text-sm">
										Add product
									</span>
								</button>
							</div>
							<div className="flex flex-col">
								<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
										<div className="overflow-x-auto">
											<table className=" min-w-full border text-center">
												<thead className="border-b">
													<tr>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-center border-r"
														>
															Image
														</th>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-center border-r"
														>
															Name
														</th>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-center border-r"
														>
															Quantity
														</th>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-center border-r"
														>
															Unit Price
														</th>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-ccenter border-r"
														>
															Supplier
														</th>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-center border-r"
														>
															Item Add
														</th>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-center border-r"
														>
															Item Deliver
														</th>
														<th
															scope="col"
															className="text-sm font-bold text-gray-900 px-6 py-4 text-center border-r"
														>
															Delete
														</th>
													</tr>
												</thead>

												<tbody>
													{items.map((item) => (
														<TableRowItem
															key={item._id}
															item={item}
															handleDeleteOparation={
																handleDeleteOparation
															}
														/>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<p className="text-center text-lg text-red-500">
							No Product item found
						</p>
					)}
				</>
			) : (
				<Spinner />
			)}
			{showModal && (
				<ConfirmModal
					showModal={showModal}
					setShowModal={setShowModal}
					setConfirm={setConfirm}
				/>
			)}
		</div>
	);
};

export default Inventory;
