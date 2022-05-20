import React from "react";
import {
	useAuthState,
	useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Spinner from "../../SmallComponents/Spinner/Spinner";

const RequireAuth = ({ children }) => {
	const [user, loadding] = useAuthState(auth);
	const [sendEmailVerification, sending, error] =
		useSendEmailVerification(auth);
	const location = useLocation();
	if (loadding) {
		return (
			<div
				className="flex justify-center items-center"
				style={{ minHeight: "50vh" }}
			>
				<Spinner />
			</div>
		);
	}
	if (!user) {
		return <Navigate to={"/login"} state={{ from: location }} replace />;
	}
	if (!user.emailVerified) {
		return (
			<div
				className="container mx-auto px-2 py-12 flex flex-col items-center justify-center"
				style={{ minHeight: "80vh" }}
			>
				<h2 className="text-lg mb-3">
					Please check you email and verify your email address
				</h2>
				<p className="text-sm mb-3">
					After verify email address please make a reload on the
					website
				</p>
				<button
					onClick={async () => {
						await sendEmailVerification();
						toast("Sent verification mail");
					}}
					className="p-1 bg-blue-500"
				>
					Send verifiction email
				</button>
			</div>
		);
	}
	return children;
};

export default RequireAuth;
