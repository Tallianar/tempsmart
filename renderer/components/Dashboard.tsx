import React from "react";
import { useTemperature } from "../hooks/useTemperature";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
	const { weather, cpu } = useTemperature(10000);

	return (
		<main title={"Dashboard"}>
			<div>
				CPU: <span aria-label={"CPU temperature"}>{cpu.value}</span>
				{cpu.error && <div aria-label={"CPU error"}>{cpu.error}</div>}
			</div>
			<div>
				Weather: <span aria-label={"Weather temperature"}>{weather.value}</span>
				{weather.error && <div aria-label={"Weather error"}>{weather.error}</div>}
			</div>
		</main>
	);
};

export { Dashboard };
