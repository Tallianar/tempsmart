/**
 * Abstract class to pool values from a resource.
 * Mainly to provide a common interface and caching ability
 */
export abstract class TemperaturePooler {
	protected readonly cacheDuration: number;
	/**
	 * When the value was cached
	 */
	private cachedTime: number = 0;

	/**
	 * Cached value
	 */
	private cachedValue: number | null = null;

	/**
	 * Save the current ongoing request so that if other request come while this is ongoing, we can attach to that
	 */
	private currentRequest: Promise<number> | null = null;

	/**
	 * @param cacheDuration cache duration in ms
	 */
	constructor(cacheDuration: number) {
		this.cacheDuration = cacheDuration;
	}

	/**
	 * Call this function to automatically get data from the pooler
	 * If data was cached in a previous call, the cached value will be returned
	 *
	 * The current ongoing request is stored in the currentRequest member so that if more requests comes
	 * they can listen to the same result
	 */
	async requestTemperature() {
		const currentTime = Date.now();
		if (currentTime - this.cachedTime > this.cacheDuration) {
			if (!this.currentRequest) {
				this.currentRequest = this.fetchTemperature();
			}

			this.cachedValue = await this.currentRequest;
			this.currentRequest = null;
			this.cachedTime = currentTime;
		}

		return this.cachedValue;
	}

	/**
	 * Implementation of the data fetching
	 */
	protected abstract fetchTemperature(): Promise<number>;
}
