import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

import {
	useSendPasswordResetEmail,
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";

import InputField from "../InputField/InputField";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";

import Spinner from "../../SmallComponents/Spinner/Spinner";
import useToken from "../../../CustomHooks/useToken";
import Title from "../../Common/Title/Title";

const Login = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const [err, setErr] = useState("");
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const [signInWithGoogle, userg, loadingG, errorg] =
		useSignInWithGoogle(auth);
	
	const [sendPasswordResetEmail, sending, reError] =
		useSendPasswordResetEmail(auth);

	const [lAfter, setLAfter] = useState(false);

	const [token] = useToken(user || userg);
	

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	
	useEffect(() => {
		setErr(reError?.code);
	}, [reError]);
	
	const inputs = [
		{
			id: 1,
			name: "email",
			type: "text",
			placeholder: "Email",
			errorMessage: "*It should be valid email address!",
			label: "Email",
			required: true,
			pattern:
				"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
		},
		{
			id: 2,
			name: "password",
			type: "password",
			placeholder: "Password",
			errorMessage:
				"*Password should be 6-14 characters and content at least one number and special character!",
			label: "Password",
			required: true,
			pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$",
		},
	];
	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		
		if (token) {
		
			navigate(from, { replace: true });
		}
	}, [token, navigate, from]);
	
	const handleUserSignIn = async (e) => {
		e.preventDefault();
		await signInWithEmailAndPassword(values.email, values.password);
	};

	if (loading || loadingG) {
		return (
			<div className="container mx-auto" style={{ minHeight: "80vh" }}>
				<Title title={"Login"} />
				<Spinner />
			</div>
		);
	}

	return (
		//new

		<div
			className=" form-field flex items-center justify-center "
			style={{ minHeight: "90vh" }}
		>
			<Title title={"Login"} />

			<form className="shadow-lg p-3 rounded" onSubmit={handleUserSignIn}>
				<h1 className="text-center mb-4 text-2xl">Login</h1>
				{inputs.map((input) => (
					<InputField
						key={input.id}
						{...input}
						value={values[input.name]}
						onChange={onChange}
					/>
				))}

				<button
					type="submit"
					className="
                    mt-4
                        w-full
                        px-6
                        py-2.5
                        bg-zinc-600
                        text-white
                        font-bold
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-stone-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
				>
					Login
				</button>

				<p className="text-gray-800 mt-6 text-center text-sm">
					New to Daily Grosery stock?{" "}
					<span
						onClick={() => {
							navigate("/register");
							
						}}
						className="text-orange-400 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out cursor-pointer ml-2"
					>
						Create new account
					</span>
				</p>
				<p className="text-gray-800 mt-6 text-center">
					Forget password ?{" "}
					<span
						onClick={async () => {
							if (values.email) {
								await sendPasswordResetEmail(values.email);

								if (sending) {
									toast("Sent email");
								}
							}
						}}
						className="text-orange-400 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out cursor-pointer ml-2"
					>
						Reset
					</span>
				</p>
				<p className="mt-3 text-xs text-red-500 text-center">
					{error && error?.code}
				</p>
		
				<p className="mt-3 text-xs text-red-500 text-center">{err}</p>
				<div className="flex justify-center items-center mt-3">
					<div className="border-t-2 w-20 mt-1 mr-2"></div>
					<span>or</span>
					<div className="border-t-2 w-20 mt-1 ml-2"></div>
				</div>
				<button
					onClick={() => signInWithGoogle()}
					className="
                        mt-6
                        w-full
                        px-6
                        py-2.5
                        bg-white
                        text-zinc-400
                        font-bold
                        text-sm
                        leading-tight
                      
                        rounded
                        shadow-md
                        hover:bg-stone-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
				>
					<i className="  text-blue-500 fa-brands fa-google"></i>
					<span className="ml-3">Continue with google</span>
				</button>
			</form>
		</div>
	);
};

export default Login;
