import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import RandomColor from "../../../Function/RandomColor";

const Summery = () => {
	const [products, setProducts] = useState([]);
	const [data, setData] = useState([]);
	const [color, setColor] = useState([]);
	const [sell, setSell] = useState([]);
	useEffect( () => {
		const fn = async () => {
			await axios
				.get("https://lit-hamlet-04037.herokuapp.com/products")
				.then((data) => {
					setProducts(data.data);
					const datas = data.data.map((item) => {
						return { name: item.name, value: parseInt(item.quantity) };
					});
					const colors = data.data.map(() => RandomColor());
					setData(datas);
					setColor(colors);
				});
		}
		fn()
	}, []);
	useEffect( () => {
		const fn = async () => {
			await axios
				.get("https://lit-hamlet-04037.herokuapp.com/soldProducts")
				.then((data) => {
					setSell(data.data);
				});
		}
		fn()
	}, []);
	//extra

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const RADIAN = Math.PI / 180;
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};
	return (
		<>
			<div className="container mx-auto py-10">
				<h2 className="text-center pb-8 font-bold uppercase text-lg sm:text-2xl pl-12">
					Product Summary
				</h2>
				<div className="flex flex-col">
					<div className="overflow-x-auto flex justify-between items-center">
						<div>
							<h2 className="text-center my-6 font-bold">
								Product vs Price per unit BarChart
							</h2>
							<BarChart
								width={700}
								height={300}
								data={products}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="price" fill="#8884d8" />
							</BarChart>
						</div>
						<div>
							<h2 className="text-center my-6 font-bold">
								Product vs Quantity PieChart
							</h2>
							<PieChart width={700} height={400}>
								<Pie
									data={data}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={renderCustomizedLabel}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
								>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={color[index % color.length]}
										/>
									))}
								</Pie>
								<Legend />
								<Tooltip />
							</PieChart>
						</div>
					</div>
				</div>
			</div>
			<div className="container py-12 mx-auto">
				<h2 className="text-center pb-8 font-bold uppercase text-lg sm:text-2xl pl-12">
					Overall Summery
				</h2>
				<div className="grid gap-4 items-end justify-center  md:grid-cols-3">
					<div className="bg-indigo-700 p-12 flex flex-col justify-center items-center rounded text-white">
						<p className="lg:text-base font-bold my-5">
							Total Product
						</p>
						<span className="text-3xl font-bold ">
							{data.length}
						</span>
					</div>
					<div className="bg-yellow-400 p-12 flex flex-col items-center rounded text-white">
						<p className="lg:text-base font-bold my-5">
							Total Items In Stock
						</p>
						<span className="text-3xl font-bold ">
							{data.reduce((p, n) => p + parseInt(n.value), 0)}
						</span>
					</div>
					<div className="bg-green-600 p-12 flex flex-col items-center rounded text-white ">
						<p className="lg:text-base font-bold my-5">
							Total Items Sell
						</p>
						<span className="text-3xl font-bold ">
							{sell.reduce((p, n) => p + parseInt(n.quantity), 0)}
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Summery;