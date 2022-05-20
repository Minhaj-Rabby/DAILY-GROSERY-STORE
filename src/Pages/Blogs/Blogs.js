import React from "react";
import Title from "../Common/Title/Title";

const Blogs = () => {
	return (
		<div className="container mx-auto my-12" style={{ minHeight: "75vh" }}>
			<Title title={"Blogs"}></Title>
			<h2 className="text-3xl text-center mb-10">Question answer</h2>
			<div className="accordion " id="accordionExample">
				<div className="accordion-item bg-white border border-gray-200">
					<h2 className="accordion-header mb-0" id="headingOne">
						<button
							className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-2xl text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none

      "
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							aria-expanded="true"
							aria-controls="collapseOne"
						>
							Difference between javascript and nodejs
						</button>
					</h2>
					<div
						id="collapseOne"
						className="accordion-collapse collapse show"
						aria-labelledby="headingOne"
						data-bs-parent="#accordionExample"
					>
						<div className="accordion-body py-4 px-5">
							<p className="sm:text-xl">
								JavaScript is a simple programming language that
								runs in any browser JavaScript Engine. Whereas
								Node JS is an interpreter or running environment
								for a JavaScript programming language that holds
								many excesses, it requires libraries that can
								easily be accessed from JavaScript programming
								for better use.
							</p>
						</div>
					</div>
				</div>
				<div className="accordion-item bg-white border border-gray-200">
					<h2 className="accordion-header mb-0" id="headingTwo">
						<button
							className="
									accordion-button
									collapsed
									relative
									flex
									items-center
									w-full
									py-4
									px-5
									text-2xl text-gray-800 text-left
									bg-white
									border-0
									rounded-none
									transition
									focus:outline-none
								"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseTwo"
							aria-expanded="false"
							aria-controls="collapseTwo"
						>
							When should you use nodejs and when should you use
							mongodb ?
						</button>
					</h2>
					<div
						id="collapseTwo"
						className="accordion-collapse collapse"
						aria-labelledby="headingTwo"
						data-bs-parent="#accordionExample"
					>
						<div className="accordion-body py-4 px-5">
							<p>
								NodeJS and MongoDB are two different process.
								NodeJS is a JavaScript runtime environment. It's
								actually helps JavaScript to run outside of
								server. It's used in server side development.
								But, MongoDB is NoSQL database which is document
								oriented. It represents data as of JSON
								documents. It's used for store data.{" "}
								<b>
									The summary is MongoDB is a database where
									we can store data and NodeJS helps us to to
									connect our client site to database by it's
									server site.
								</b>
							</p>
						</div>
					</div>
				</div>
				<div className="accordion-item bg-white border border-gray-200">
					<h2 className="accordion-header mb-0" id="headingThree">
						<button
							className="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-2xl text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      "
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseThree"
							aria-expanded="false"
							aria-controls="collapseThree"
						>
							Differences between sql and nosql databases.
						</button>
					</h2>
					<div
						id="collapseThree"
						className="accordion-collapse collapse"
						aria-labelledby="headingThree"
						data-bs-parent="#accordionExample"
					>
						<div className="accordion-body py-4 px-5">
							<p>
								SQL databases are vertically scalable, while
								NoSQL databases are horizontally scalable. SQL
								databases are table-based, while NoSQL databases
								are document, key-value, graph, or wide-column
								stores. SQL databases are better for multi-row
								transactions, while NoSQL is better for
								unstructured data like documents or JSON.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blogs;
