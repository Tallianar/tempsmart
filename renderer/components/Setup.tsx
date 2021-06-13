import React, { useState } from "react";
import { useIpcSetupChannel } from "../hooks/ipc/useIpcSetupChannel";
import { CitiesDatalist } from "./CitiesDatalist";

export interface SetupProps {
	onReady: () => void;
}

/**
 * Form to request the city and appid fro the OpenWeatherMap
 * The details will be sent to the backend via ipc and on successful reply it will call the onReady callback
 */
const Setup: React.FC<SetupProps> = (props) => {
	const [city, setCity] = useState<string | null>(null);
	const [appId, setAppId] = useState<string | null>("2d567e25289ca017a464bcba6c011cf1");

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
		<div className={"vh-100 d-flex align-items-center justify-content-center"}>
			<div>
				<h3 className={"text-center"}>TempSmart</h3>
				<form className={"mt-4"} onSubmit={handleSubmit}>
					<div>
						<div className={"d-none"}>
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
									<div className="invalid-feedback">
										Please specify an API Key.
									</div>
								</div>
							</label>
						</div>
						<div>
							<div className={"input-group has-validation"}>
								<input
									className={"form-input " + validClassCity}
									list={"cities"}
									aria-label={"City"}
									name={"city"}
									value={city || ""}
									placeholder={"City"}
									onChange={handleCityChange}
								/>
								<div className="invalid-feedback">Please specify a city.</div>
								<CitiesDatalist />
							</div>
						</div>
						<div className={"mt-4 text-center"}>
							<button
								role={"submit"}
								className={"btn btn-primary"}
								aria-label={"Start"}
							>
								Start
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export { Setup };
