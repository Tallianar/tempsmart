import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Setup } from "./Setup";
import {IpcSetupChannelRequest} from "../hooks/ipc/useIpcSetupChannel";

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

test("Should call onReady with the values entered", () => {
	const cb = jest.fn();
	const el = render(<Setup onReady={cb} />);
	fireEvent.change(el.getByLabelText("OpenWeatherMap API Key"), {
		target: { value: "aabb" },
	});
	fireEvent.change(el.getByLabelText("City"), { target: { value: "bbaa" } });
	fireEvent.click(el.getByText("Submit"));

	expect(cb.mock.calls.length).toEqual(1);
	expect(mockSendEvent.mock.calls.length).toEqual(1);
	expect(mockSendEvent.mock.calls[0][0]).toEqual({ city: "bbaa", appId: "aabb" });
});

test("Should show an error city has not been entered ", () => {

})

test("Should show an error appId has not been entered ", () => {

})
