import React, { useState } from "react";
import "./InputField.css";

const InputField = (props) => {
	const [focused, setFocused] = useState(false);
	const { label, onChange, id, errorMessage, ...inputProps } = props;

	const handleFocused = (e) => {
		setFocused(true);
	};

	return (
		<div className="formInput mb-3">
			<label>{label}</label>
			<input
				{...inputProps}
				onChange={onChange}
				onBlur={handleFocused}
				focused={focused.toString()}
				onFocus={() =>
					inputProps.name === "confirmPassword" && setFocused(true)
				}
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
			/>
			<span className="text-xs text-red-500">{errorMessage}</span>
		</div>
	);
};

export default InputField;
