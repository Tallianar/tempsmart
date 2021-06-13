import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { Setup } from "./Setup";
import { IpcSetupChannelRequest } from "../hooks/ipc/useIpcSetupChannel";
import "@testing-library/jest-dom/extend-expect";

jest.mock("electron", () => ({ ipcRenderer: { on: jest.fn(), off: jest.fn(), send: jest.fn() } }));

jest.mock("../data/cities.json", () => []);

const mockSendEvent = jest.fn();
jest.mock("../hooks/ipc/useIpcSetupChannel", () => {
	return {
		useIpcSetupChannel: function (callback: () => void) {
			return {
				sendEvent: (params: IpcSetupChannelRequest) => {
					callback();
					mockSendEvent(params);
				},
			};
		},
	};
});

let element: RenderResult;
const callback = jest.fn();
beforeEach(() => {
	element = render(<Setup onReady={callback} />);
});
afterEach(() => {
	element.unmount();
	callback.mockClear();
});

test("Should call onReady with the values entered", () => {
	fireEvent.change(element.getByLabelText("OpenWeatherMap API Key"), {
		target: { value: "aabb" },
	});
	fireEvent.change(element.getByLabelText("City"), { target: { value: "bbaa" } });
	fireEvent.click(element.getByText("Start"));

	expect(callback.mock.calls.length).toEqual(1);
	expect(mockSendEvent.mock.calls.length).toEqual(1);
	expect(mockSendEvent.mock.calls[0][0]["city"]).toEqual("bbaa");
});

test("Should show an error city has not been entered ", () => {
	fireEvent.change(element.getByLabelText("OpenWeatherMap API Key"), {
		target: { value: "aabb" },
	});
	fireEvent.click(element.getByText("Start"));
	expect(element.getByLabelText("City")).toHaveClass("is-invalid");
});

// test("Should show an error appId has not been entered ", () => {
// 	fireEvent.change(element.getByLabelText("City"), { target: { value: "bbaa" } });
// 	fireEvent.click(element.getByText("Start"));
// 	expect(element.getByLabelText("OpenWeatherMap API Key")).toHaveClass("is-invalid");
// 	expect(callback.mock.calls.length).toEqual(0);
// });

test("Should show an error appId was deleted", () => {
	fireEvent.change(element.getByLabelText("OpenWeatherMap API Key"), {
		target: { value: "bbaa" },
	});
	expect(element.getByLabelText("OpenWeatherMap API Key")).toHaveClass("is-valid");
	fireEvent.change(element.getByLabelText("OpenWeatherMap API Key"), { target: { value: "" } });
	fireEvent.click(element.getByText("Start"));
	expect(element.getByLabelText("OpenWeatherMap API Key")).toHaveClass("is-invalid");
	expect(callback.mock.calls.length).toEqual(0);
});
