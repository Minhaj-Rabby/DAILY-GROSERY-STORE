import React from "react";

const Footer = () => {
	return (
		<div className=" text-white" style={{ background: "#2F384A" }}>
			<div style={{ alignItems:"center"}} className="py-8 flex  sm:flex-row flex-col justify-between container mx-auto md:px-8 gap-5 px-2">
				<div className="flex flex-col">
					<img className="flex w-20 md:w-20" style={{ alignItems: "center" }} src="https://i.ibb.co/YLQWkBW/favicon.png" alt="Logo"></img>
					<p  className="md:w-80">Daily Grosery Mart</p>
				</div>
				<div className="flex flex-col justify-start">
					<p className="text-2xl">Contact us</p>
					<p>
						<i className="fa-solid fa-envelope"></i>
						{"  "}
						help.dailygroserymart@yahoo.com
					</p>
					<p>
						<i className="fa-solid fa-location-dot"></i>
						{"  "} Dhaka, Bangladesh
					</p>
					<p>
						<i className="fa-solid fa-phone"></i>
						{"  "} +8801625382484
					</p>
				</div>
			</div>
			<div className="flex justify-center py-8 border-t-2">
				<p>
					© {new Date().getFullYear()} Daily Grosery Mart, All Rights
					Reserved
				</p>
			</div>
		</div>
	);
};

export default Footer;
