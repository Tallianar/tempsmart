import { render } from "@testing-library/react";
import React from "react";
import { TemperatureView } from "./TemperatureView";
import "@testing-library/jest-dom/extend-expect";

test("Should render the name of the view", () => {
	const el = render(
		<TemperatureView temperature={{ value: 100, time: 1 }} name={"test-name" as any} />
	);
	expect(el.getByTitle("test-name temperature")).toBeInTheDocument();
	el.unmount();
});

test("Should render the temperature", () => {
	const el = render(<TemperatureView temperature={{ value: 100, time: 1 }} name={"CPU"} />);
	expect(el.getByTitle("CPU temperature")).toHaveTextContent("100");
	el.unmount();
});
