import React from "react";
import Title from "../../Common/Title/Title";
import Banner from "../Banner/Banner";

import TopItems from "../TopItems/TopItems";

const Home = () => {
	return (
		<div>
			<Title title={"Home"} />
			<Banner />
			<TopItems />
		</div>
	);
};

export default Home;
