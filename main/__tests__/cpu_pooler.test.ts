import si from "systeminformation";
import { mocked } from "ts-jest/utils";
import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";

jest.mock("systeminformation");
const mockSI = mocked(si, true);

describe("CPUTemperaturePooler", () => {
	test("Should get temperature", async () => {
		mockSI.cpuTemperature.mockResolvedValue({ main: 100, cores: [10], max: 1 });

		const pooler = new CPUTemperaturePooler();
		const result = await pooler.getTemperature();

		expect(mockSI.cpuTemperature.mock.calls.length).toEqual(1);
		expect(result).toEqual(100);
	});
});
