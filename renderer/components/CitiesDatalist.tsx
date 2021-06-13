import React, { useMemo } from "react";
import cities from "../data/cities.json";

export interface CitiesDatalistProps {}

const CitiesDatalist: React.FC<CitiesDatalistProps> = (props) => {
	return useMemo(
		() => (
			<datalist id={"cities"}>
				{cities.map((city) => (
					<option data-testid={city} key={city} value={city}>
						{city}
					</option>
				))}
			</datalist>
		),
		[]
	);
};

export { CitiesDatalist };
