import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../Variable/ServerUrl";

const useToken = (user) => {
	const [token, setToken] = useState("");
	
	useEffect(() => {
		const getToken = async () => {
		
			const email = user?.user?.email;
			if (email) {
				const { data } = await axios.post(
					`${serverUrl}/login`,
					{
						email: email,
					}
				);
				setToken(data.accessToken);
				localStorage.setItem("accessToken", data.accessToken);
			}
		};
		getToken();
	}, [user]);
	return [token];
};

export default useToken;
