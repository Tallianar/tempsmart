import React, { useState } from "react";
import { useIpcSetupChannel } from "../hooks/ipc/useIpcSetupChannel";
import { CitiesDatalist } from "./CitiesDatalist";

export interface SetupProps {
	onReady: () => void;
}
// "2d567e25289ca017a464bcba6c011cf1"
const Setup: React.FC<SetupProps> = (props) => {
	const [appId, setAppId] = useState<string | null>(null);
	const [city, setCity] = useState<string | null>(null);

	const validClassAppId = appId === null || appId.length > 0 ? "is-valid" : "is-invalid";
	const validClassCity = city === null || city.length > 0 ? "is-valid" : "is-invalid";

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
		if (!appId) {
			setAppId("");
			return;
		}
		if (!city) {
			setCity("");
			return;
		}

		sendEvent({ appId, city });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label className={"form-label"}>
					OpenWeatherMap API Key
					<div className={"input-group has-validation"}>
						<input
							className={"form-input " + validClassAppId}
							aria-label={"OpenWeatherMap API Key"}
							name={"appId"}
							value={appId || ""}
							onChange={handleKeyChange}
						/>
						<div className="invalid-feedback">Please specify an API Key.</div>
					</div>
				</label>
			</div>

			<div>
				<label>
					City
					<div className={"input-group has-validation"}>
						<input
							className={"form-input " + validClassCity}
							list={"cities"}
							aria-label={"City"}
							name={"city"}
							value={city || ""}
							onChange={handleCityChange}
						/>
						<div className="invalid-feedback">Please specify a city.</div>
						<CitiesDatalist />
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
