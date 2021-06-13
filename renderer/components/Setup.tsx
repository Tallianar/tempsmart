import React, { useState } from "react";
import { useIpcSetupChannel } from "../hooks/ipc/useIpcSetupChannel";
import cities from "../data/cities.json";

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		sendEvent({ appId, city });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label className={"form-label"}>
					OpenWeatherMap API Key
					<div>
						<input
							className={"form-input"}
							aria-label={"OpenWeatherMap API Key"}
							name={"appId"}
							value={appId}
							onChange={handleKeyChange}
						/>
					</div>
				</label>
			</div>

			<div>
				<label>
					City
					<div>
						<input
							list={"cities"}
							aria-label={"City"}
							name={"city"}
							value={city}
							onChange={handleCityChange}
						/>
						<datalist id={"cities"}>
							{cities.map((city) => (
								<option data-testid={city} key={city} value={city}>
									{city}
								</option>
							))}
						</datalist>
					</div>
				</label>
			</div>
			<div className={"mt-4"}>
				<button role={"submit"} className={"btn btn-primary"} aria-label={"Submit"}>
					Submit
				</button>
			</div>
		</form>
	);
};

export { Setup };
