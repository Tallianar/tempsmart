import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";
import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";
import { IpcMainTemperatureChannel } from "./IpcMainTemperatureChannel";

const mockCPU = jest.spyOn(CPUTemperaturePooler.prototype, "requestTemperature");
const mockOWM = jest.spyOn(WeatherTemperaturePooler.prototype, "requestTemperature");
let channel: IpcMainTemperatureChannel;

beforeEach(() => {
	channel = new IpcMainTemperatureChannel();
});

afterEach(() => {
	mockCPU.mockClear();
	mockOWM.mockClear();
});

test("Should send values", async () => {
	mockCPU.mockResolvedValue(100);
	mockOWM.mockResolvedValue(200);

	const replyMock = jest.fn();
	await channel.handleEvent({ reply: replyMock } as any, { replyChannel: "reply-channel" });
	expect(mockCPU.mock.calls.length).toEqual(1);
	expect(replyMock.mock.calls[0][0]).toEqual("reply-channel");
	expect(replyMock.mock.calls[0][1]).toEqual({ cpu: 100, weather: 200 });
});

test("Should get the temperature channel name", async () => {
	expect(channel.getChannel()).toEqual("temperature");
});
