import React from "react";
import { useTemperature } from "./hooks/useTemperature";

interface Props {}

const App = ({}: Props) => {
	const { weather, cpu } = useTemperature("app-temperature", 10000);

	return (
		<div>
			<div>CPU: {cpu}</div>
			<div>Weather: {weather}</div>
		</div>
	);
};

export { App };
