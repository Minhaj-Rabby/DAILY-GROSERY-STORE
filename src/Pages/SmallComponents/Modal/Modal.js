import React, { useState } from "react";

export default function Modal(props) {
	const { showModal, setShowModal, handleDeliverQuantity, header } = props;
	const [quantity, setQuantity] = useState(0);

	return (
		<>
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-2xl font-semibold text-blue-500">
										{header}
									</h3>
									<button
										type="button"
										className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
										onClick={() => {
											setShowModal(false);
										}}
									></button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">

									<form
										className="flex flex-col items-center justify-center"
										onSubmit={(e) => {
											e.preventDefault();
											if (/^[1-9]\d*$/.test(quantity)) {
												handleDeliverQuantity(quantity);
												setShowModal(false);
											}
										}}
									>
										<input
											onChange={(e) => {
												setQuantity(e.target.value);
											}}
											name="qunatity"
											type="number"
											required
											className="form-control
															block
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
											placeholder="Enter Quantity"
											min={0}
											pattern="^[1-9]\d*$"
										/>
										<button
											type="submit"
											className="text-gray-200 bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded mt-4"
										>
											Submit
										</button>
									</form>
								</div>

							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
