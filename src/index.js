import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "tw-elements";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
	<HelmetProvider>
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</HelmetProvider>,
	document.getElementById("root")
);
