import { render } from "@testing-library/react";
import React from "react";
import { Dashboard } from "./Dashboard";
import "@testing-library/jest-dom/extend-expect";

let returnValue = {};
jest.mock("../hooks/useTemperature", () => ({
	useTemperature: () => returnValue,
}));

// disable apexcharts rendering
jest.mock("react-apexcharts", () => () => null);

test("Should render the values received", () => {
	returnValue = { cpu: { value: 100 }, weather: { value: 200 } };
	const el = render(<Dashboard />);
	expect(el.getByLabelText("CPU temperature")).toHaveTextContent("100");
	expect(el.getByLabelText("Weather temperature")).toHaveTextContent("200");
	el.unmount();
});

test("Should render error on CPU error", () => {
	returnValue = { cpu: { value: null, error: "CPU Error" }, weather: { value: 200 } };
	const el = render(<Dashboard />);
	expect(el.getByTitle("Weather temperature")).toHaveTextContent("200");
	expect(el.getByTitle("CPU error")).toHaveTextContent("CPU Error");
	el.unmount();
});

test("Should render error on Weather error", () => {
	returnValue = { cpu: { value: 100 }, weather: { value: null, error: "OWM Error" } };
	const el = render(<Dashboard />);
	expect(el.getByLabelText("CPU temperature")).toHaveTextContent("100");
	expect(el.getByLabelText("Weather error")).toHaveTextContent("OWM Error");
	el.unmount();
});
