import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";
import { IpcMainSetupChannel } from "./IpcMainSetupChannel";

let pooler: WeatherTemperaturePooler;
let channel: IpcMainSetupChannel;

beforeEach(() => {
	pooler = new WeatherTemperaturePooler();
	channel = new IpcMainSetupChannel(pooler);
});

test("Should send values", async () => {
	const replyMock = jest.fn();
	await channel.handleEvent({ reply: replyMock } as any, {
		replyChannel: "reply",
		city: "aa",
		appId: "bb",
	});
	expect(pooler.city).toEqual("aa");
	expect(pooler.appId).toEqual("bb");
	expect(replyMock.mock.calls[0][0]).toEqual("reply");
});

test("Should get the setup channel name", async () => {
	expect(channel.getChannel()).toEqual("setup");
});
