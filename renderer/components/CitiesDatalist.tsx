import React, { useMemo } from "react";
import cities from "../data/cities.json";

export interface CitiesDatalistProps {}

/**
 * Provide a <datalist /> to attach to an input with all the available cities
 */
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
