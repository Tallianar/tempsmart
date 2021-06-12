import React from "react";
import { useTemperature } from "../hooks/useTemperature";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
	const { weather, cpu } = useTemperature(10000);

	return (
		<main title={"Dashboard"}>
			<div>
				CPU: <span aria-label={"CPU Temperature"}>{cpu}</span>
			</div>
			<div>
				Weather: <span aria-label={"Weather Temperature"}>{weather}</span>
			</div>
		</main>
	);
};

export { Dashboard };
