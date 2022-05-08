import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import "./Navbar.css";

const Navbar = () => {
	const navigate = useNavigate();
	const handleLoginBtn = () => {
		navigate("/login");
	};

	const [user] = useAuthState(auth);

	const handleSignOut = () => {
		signOut(auth);
	};
	return (
		<div className="sticky-top">
			<nav
				className="
                    relative
                    w-full
                    flex flex-wrap
                    items-center
                    justify-between
                    py-2
                    bg-gray-100
                    text-gray-500
                    hover:text-gray-700
                    focus:text-gray-700
                    shadow-lg
                    navbar navbar-expand-lg navbar-light
                    
                    "
			>
				<div className="container mx-auto w-full flex flex-wrap items-center justify-between px-6">
					<button
						className="
                        navbar-toggler
                        text-gray-500
                        border-0
                        hover:shadow-none hover:no-underline
                        py-2
                        px-2.5
                        bg-transparent
                        focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
                        "
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="bars"
							className="w-6"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
						>
							<path
								fill="currentColor"
								d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
							></path>
						</svg>
					</button>
					<div
						className="collapse navbar-collapse flex-grow items-center"
						id="navbarSupportedContent"
					>
						<NavLink
							className="
                                flex
                                items-center
                                text-gray-900
                                hover:text-gray-900
                                focus:text-gray-900
                                mt-2
                                lg:mt-0
                                mr-1
                            "
							to={"/"}
						>
							<img
								src="https://i.ibb.co/YLQWkBW/favicon.png"
								style={{ height: "15px",marginRight:"6px"}}
								alt=""
								loading="lazy"
							/>{" "}
							<span className="font-bold">Daily Grosery Mart</span>
						</NavLink>

						{/* <!-- Left links --> */}
						<ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
							<li className="nav-item p-2">
								<NavLink
									to={"/"}
									className={(navInfo) =>
										navInfo.isActive
											? `active-l nav-link`
											: `a nav-link`
									}
								>
									Home
								</NavLink>
							</li>
							<li className="nav-item p-2">
								<NavLink
									to={"/inventory"}
									className={(navInfo) =>
										navInfo.isActive
											? `active-l nav-link`
											: `a nav-link`
									}
								>
									Inventory
								</NavLink>
							</li>
							<li className="nav-item p-2">
								<NavLink
									to={"/solditems"}
									className={(navInfo) =>
										navInfo.isActive
											? `active-l nav-link`
											: `a nav-link`
									}
								>
									Sold items
								</NavLink>
							</li>
							<li className="nav-item p-2">
								<NavLink
									to={"/blogs"}
									className={(navInfo) =>
										navInfo.isActive
											? `active-l nav-link`
											: `a nav-link`
									}
								>
									Blogs
								</NavLink>
							</li>
						</ul>
					</div>
					{!user ? (
						<button
							onClick={handleLoginBtn}
							className="bg-blue-700 text-white px-4 py-1 rounded hover:text-amber-500"
						>
							SignIn
						</button>
					) : (
						<div className="flex justify-center">
							<div>
								<div className="dropdown relative">
									<button
										className="
										dropdown-toggle
										px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out
										flex
										items-center
										whitespace-nowrap
									"
										type="button"
										id="dropdownMenuSmallButton"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										{user.displayName}
										<svg
											aria-hidden="true"
											focusable="false"
											data-prefix="fas"
											data-icon="caret-down"
											className="w-2 ml-2"
											role="img"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 320 512"
										>
											<path
												fill="currentColor"
												d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
											></path>
										</svg>
									</button>
									<ul
										className="
										dropdown-menu
										min-w-max
										absolute
										
										bg-white
										text-base
										z-50
										float-left
										py-2
										list-none
										text-left
										rounded-lg
										shadow-lg
										mt-1
										hidden
										m-0
										bg-clip-padding
										border-none
									"
										aria-labelledby="dropdownMenuSmallButton"
									>
										<li>
											<Link
												to={"/addProduct"}
												className="
												dropdown-item
												text-sm
												py-2
												px-4
												font-normal
												block
												w-full
												whitespace-nowrap
												bg-transparent
												text-gray-700
												hover:bg-gray-100
          "
											>
												Add product
											</Link>
										</li>
										<li>
											<Link
												to={"/myaddproducts"}
												className="
												dropdown-item
												text-sm
												py-2
												px-4
												font-normal
												block
												w-full
												whitespace-nowrap
												bg-transparent
												text-gray-700
												hover:bg-gray-100
											"
											>
												My items
											</Link>
										</li>
										<li>
											<Link
												to={"/inventory"}
												className="
												dropdown-item
												text-sm
												py-2
												px-4
												font-normal
												block
												w-full
												whitespace-nowrap
												bg-transparent
												text-gray-700
												hover:bg-gray-100
											"
											>
												Manage Items
											</Link>
										</li>
										<li>
											<span
												onClick={handleSignOut}
												className="
												dropdown-item
												text-sm
												py-2
												px-4
												font-normal
												block
												w-full
												whitespace-nowrap
												bg-transparent
												text-gray-700
												hover:bg-gray-100
												cursor-pointer
         									"
											>
												SignOut
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					)}

					{/* <!-- Right elements --> */}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
