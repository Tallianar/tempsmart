import { render } from "@testing-library/react";
import React from "react";
import { Dashboard } from "./Dashboard";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../hooks/useTemperature", () => ({
	useTemperature: (refresh: number) => ({
		cpu: 100,
		weather: 200,
	}),
}));

test("Should render the values received", () => {
	const el = render(<Dashboard />);
	expect(el.getByLabelText("CPU Temperature")).toHaveTextContent("100");
	expect(el.getByLabelText("Weather Temperature")).toHaveTextContent("200");
	el.unmount();
});

test("Should render error on CPU error", () => {

});

test("Should render error on Weather error", () => {

});
