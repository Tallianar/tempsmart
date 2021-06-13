import React from "react";
import { TemperatureResponse } from "../hooks/ipc/useIpcTemperatureChannel";

export interface TemperatureViewProps {
	name: "CPU" | "Weather";
	temperature: TemperatureResponse;
}

/**
 * Simple view to display the current temperature values
 */
const TemperatureView: React.FC<TemperatureViewProps> = (props) => {
	return (
		<div className={"text-center p-2 bg-light rounded my-2"}>
			{props.temperature.error ? (
				<div
					className={"text-danger"}
					title={`${props.name} error`}
					aria-label={`${props.name} error`}
				>
					{props.temperature.error}
				</div>
			) : (
				<>
					<h2
						title={`${props.name} temperature`}
						aria-label={`${props.name} temperature`}
					>
						{props.temperature.value}
					</h2>
					<span>{props.name} temperature</span>
				</>
			)}
		</div>
	);
};

export { TemperatureView };
