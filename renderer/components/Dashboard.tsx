import React from "react";
import { useTemperature } from "../hooks/useTemperature";
import { SparkChart } from "./SparkChart";
import { TemperatureView } from "./TemperatureView";

export interface DashboardProps {}

/**
 * Display the current temperatures and a chart with the historic values
 */
const Dashboard: React.FC<DashboardProps> = (props) => {
	const { weather, cpu } = useTemperature(60000, "dashboard-temp");

	return (
		<main data-testid={"dashboard"} className={"row m-2"}>
			<div className={"col-2"}>
				<TemperatureView temperature={cpu} name={"CPU"} />
				<TemperatureView temperature={weather} name={"Weather"} />
			</div>
			<div className={"col-10"}>
				<SparkChart />
			</div>
		</main>
	);
};

export { Dashboard };
