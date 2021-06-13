import { render, RenderResult } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { CitiesDatalist } from "./CitiesDatalist";

jest.mock("../data/cities.json", () => ["London, GB", "New York, US"]);

let element: RenderResult;
beforeEach(() => {
	element = render(<CitiesDatalist />);
});
afterEach(() => {
	element.unmount();
});

test("Should render a list of cities", () => {
	expect(element.getByTestId("London, GB")).toBeInTheDocument();
	expect(element.getByTestId("New York, US")).toBeInTheDocument();
});
