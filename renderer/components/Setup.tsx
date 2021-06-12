import React, { useState } from "react";
import { useIpcSetupChannel } from "../hooks/ipc/useIpcSetupChannel";

export interface SetupProps {
	onReady: () => void;
}

const Setup: React.FC<SetupProps> = (props) => {
	const [appId, setAppId] = useState("2d567e25289ca017a464bcba6c011cf1");
	const [city, setCity] = useState("Edinburgh");

	const { sendEvent } = useIpcSetupChannel(() => {
		props.onReady();
	});

	const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAppId(e.target.value);
	};

	const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
	};

	const handleSubmit = () => {
		sendEvent({ appId, city });
	};

	return (
		<div>
			<div>
				<label>
					OpenWeatherMap API Key
					<input
						aria-label={"OpenWeatherMap API Key"}
						name={"appId"}
						value={appId}
						onChange={handleKeyChange}
					/>
				</label>
			</div>

			<div>
				<label>
					City
					<input
						aria-label={"City"}
						name={"city"}
						value={city}
						onChange={handleCityChange}
					/>
				</label>
			</div>
			<div>
				<button aria-label={"Submit"} onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export { Setup };
