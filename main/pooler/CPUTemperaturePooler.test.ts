import si from "systeminformation";
import { mocked } from "ts-jest/utils";
import { CPUTemperaturePooler } from "./CPUTemperaturePooler";

jest.mock("systeminformation");
const mockSI = mocked(si, true);

test("Should get temperature", async () => {
	mockSI.cpuTemperature.mockResolvedValue({ main: 100, cores: [10], max: 1 });

	const pooler = new CPUTemperaturePooler();
	const result = await pooler.requestTemperature();

	expect(mockSI.cpuTemperature.mock.calls.length).toEqual(1);
	expect(result).toEqual(100);
});
