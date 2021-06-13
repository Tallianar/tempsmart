import React from "react";
import { ApexOptions } from "apexcharts";
import { useTemperatureHistory } from "../hooks/useTemperatureHistory";
import ReactApexChart from "react-apexcharts";

export interface SparkChartProps {}

/**
 * Provide a graph to visualize the historic temperature values
 */
const SparkChart: React.FC<SparkChartProps> = (props) => {
	const { weatherHistory, cpuHistory } = useTemperatureHistory("spark-temperature");
	const series = [
		{
			name: "Weather",
			data: weatherHistory.map((v) => [v.time, v.value]),
		},
		{
			name: "CPU",
			data: cpuHistory.map((v) => [v.time, v.value]),
		},
	];
	const options: ApexOptions = {
		theme: {
			mode: "dark",
			palette: "palette1",
			monochrome: {
				color: "#255aee",
			},
		},
		chart: {
			id: "chart1",
			type: "line",
			height: 380,
			zoom: { enabled: false },
			toolbar: { show: false },
			background: "#00000000",
		},
		markers: {
			radius: 0,
			size: 0,
		},
		dataLabels: { enabled: false },
		stroke: { width: 3 },
		xaxis: { type: "datetime" },
		yaxis: [
			{
				title: {
					text: "Weather Temp",
				},
			},
			{
				opposite: true,
				title: {
					text: "CPU Temp",
				},
			},
		],
		tooltip: { enabled: false },
	};

	return <ReactApexChart options={options} series={series} height={320} />;
};

export { SparkChart };
