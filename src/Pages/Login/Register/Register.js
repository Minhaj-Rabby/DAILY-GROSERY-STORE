import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	useCreateUserWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";

import "./Register.css";

import InputField from "../InputField/InputField";
import auth from "../../../firebase.init";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import Spinner from "../../SmallComponents/Spinner/Spinner";
import useToken from "../../../CustomHooks/useToken";
import Title from "../../Common/Title/Title";

const Register = () => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth, {
			sendEmailVerification: true,
		});
	//profile update
	const [updateProfile, updating, errorP] = useUpdateProfile(auth);

	const [signInWithGoogle, userg, loadingG] = useSignInWithGoogle(auth);

	const [token] = useToken(user || userg);

	//inputs array

	const inputs = [
		{
			id: 1,
			name: "username",
			type: "text",
			placeholder: "Username",
			errorMessage: "*Username  shouldn't include any special character!",
			label: "Username",
			required: true,
			pattern: "^[a-z0-9_.]+$",
		},
		{
			id: 2,
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
			id: 3,
			name: "password",
			type: "password",
			placeholder: "Password",
			errorMessage:
				"*Password should be 6-14 characters and content at least one number and special character!",
			label: "Password",
			required: true,
			pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$",
		},
		{
			id: 4,
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm Password",
			errorMessage: "*Password don't match!",
			label: "Confirm Password",
			required: true,
			pattern: values.password,
		},
	];

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	//console.log(values);
	//navigate
	useEffect(() => {
		if (token) {
			navigate(from, { replace: true });
		}
	}, [token, navigate, from]);

	//create user function
	const handleCreateUser = async (e) => {
		e.preventDefault();
		if (values.password !== values.confirmPassword) {
			return;
		}
		await createUserWithEmailAndPassword(values.email, values.password);

		await updateProfile({ displayName: values.username });
	};
	if (loading || loadingG) {
		return (
			<div className="container mx-auto" style={{ minHeight: "80vh" }}>
				<Title title={"Register"} />
				<Spinner />
			</div>
		);
	}
	return (
		<div
			className="form-field flex items-center justify-center pt-4"
			style={{ minHeight: "90vh" }}
		>
			<Title title={"Register"} />
			<form className="shadow-lg" onSubmit={handleCreateUser}>
				<h1 className="text-center mb-4 text-2xl">Register</h1>
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
					Register
				</button>
				<p>{error ? error.message : ""}</p>
				<p className="text-gray-800 mt-6 text-center">
					Already have an account ?{" "}
					<Link
						to={"/login"}
						className="text-orange-400 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out cursor-pointer ml-2"
					>
						Login
					</Link>
				</p>
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

export default Register;
