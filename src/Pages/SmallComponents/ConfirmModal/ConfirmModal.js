import React from "react";

const ConfirmModal = (props) => {
	const { showModal, setShowModal, setConfirm } = props;
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
									<h3 className="text-xl font-semibold text-blue-500">
										Are you want to Delete ?
									</h3>
								</div>
								{/*body*/}
								<div className="relative p-6 flex justify-evenly">
									<button
										onClick={() => {
											setConfirm(false);
											setShowModal(false);
										}}
										type="submit"
										className="text-gray-200 bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded mt-4"
									>
										Cancle
									</button>
									<button
										onClick={() => {
											setConfirm(true);
											setShowModal(false);
										}}
										type="submit"
										className="text-gray-200   bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded mt-4"
									>
										Delete
									</button>
								</div>

							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default ConfirmModal;
