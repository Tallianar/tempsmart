/**
 * Abstract class to pool values from a resource.
 * Mainly to provide a common interface and caching ability
 */
export abstract class TemperaturePooler {
	protected readonly cacheDuration: number;
	private cachedTime: number = 0;
	private cachedValue: number | null = 0;

	constructor(cacheDuration: number) {
		this.cacheDuration = cacheDuration;
	}

	/**
	 * Call this function to automatically get data from the pooler
	 * If data was cached in a previous call, the cached value will be returned
	 */
	async requestTemperature() {
		const currentTime = Date.now();
		if (currentTime - this.cachedTime > this.cacheDuration) {
			this.cachedValue = await this.fetchTemperature();
			this.cachedTime = currentTime;
		}

		return this.cachedValue;
	}

	/**
	 * Implementation of the data fetching
	 */
	protected abstract fetchTemperature(): Promise<number>;
}
