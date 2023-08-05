import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Title from "../Common/Title/Title";
import { serverUrl } from "../../Variable/ServerUrl";

const AddProduct = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const [product, setProduct] = useState({
		name: "",
		img: "",
		price: "",
		quantity: "",
		discription: "",
		supplierName: "",
		username: user.displayName,
		email: user.email,
	});
	const handleOnBlur = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await axios.post(
			`${serverUrl}/products`,
			{
				...product,
			}
		);
		if (result.data) {
			navigate("/manageitems");
		}
	};

	return (
		<div
			className="container mx-auto flex justify-center items-center"
			style={{ minHeight: "90vh" }}
		>
			<Title title={"Add Product"} />
			<div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
				<h3 className="text-center text-xl my-8 font-bold uppercase">
					Add new product
				</h3>
				<form className="md:w-96" onSubmit={handleSubmit}>
					<div className="form-group mb-6">
						<input
							onBlur={handleOnBlur}
							onChange={handleOnBlur}
							type="text"
							className="form-control block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white 
                                        focus:border-blue-600 focus:outline-none"
							name="name"
							placeholder="Product name"
							required
						/>
					</div>
					<div className="form-group mb-6">
						<input
							onBlur={handleOnBlur}
							onChange={handleOnBlur}
							type="number"
							className="form-control block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="quantity"
							placeholder="Quantity"
							required
							pattern="^[1-9]\d*$"
							min={0}
						/>
						<input
							onBlur={handleOnBlur}
							onChange={handleOnBlur}
							type="number"
							className="my-4 form-control block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="price"
							placeholder="Unit price"
							required
							pattern="^[1-9]\d*$"
							min={0}
						/>
						<input
							onBlur={handleOnBlur}
							onChange={handleOnBlur}
							type="text"
							className="form-control block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white 
                                        focus:border-blue-600 focus:outline-none"
							name="supplierName"
							placeholder="Supplier"
							required
						/>
						<input
							onBlur={handleOnBlur}
							onChange={handleOnBlur}
							type="text"
							className="mt-4 form-control block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white 
                                        focus:border-blue-600 focus:outline-none"
							name="img"
							placeholder="Image url"
							required
						/>
					</div>
					<div className="form-group mb-6">
						<textarea
							onBlur={handleOnBlur}
							onChange={handleOnBlur}
							className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-sm
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
							name="discription"
							rows="3"
							placeholder="Short dicription about product"
						></textarea>
					</div>

					<button
						type="submit"
						className="
                                w-full
                                px-6
                                py-2.5
                                bg-blue-600
                                text-white
                                font-bold
                                text-xs
                                leading-tight
                                uppercase
                                rounded
                                shadow-md
                                hover:bg-blue-700 hover:shadow-lg
                                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                active:bg-blue-800 active:shadow-lg
                                transition
                                duration-150
                                ease-in-out"
					>
						Add product
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;
