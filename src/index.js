/**
 * Function invoked with arguments by NanoEventEmitter.prototype.emit when registered for given eventNames
 *
 * @callback ObserverCallback
 * @param  {*} [...args] zero ore more parameters passed by NanoEventEmitter.prototype.emit
 * @private
 */

/**
 * An EventEmitter
 *
 *
 * @example
 * ```js
 * import NanoEventEmitter from 'nano-event-emitter';
 * const eventEmitter = new NanoEventEmitter();
 * ```
 */
class NanoEventEmitter {
	/**
	 * Attached observers.
	 *
	 * @private
	 */
	observers = {};

	/**
	 * Create a NanoEventEmitter instance.
	 *
	 * @return NanoEventEmitter
	 *
	 * @example
	 * ```js
	 * import NanoEventEmitter from 'nano-event-emitter';
	 * const eventEmitter = NanoEventEmitter.create();
	 * ```
	 */
	static create(...args) {
		return new NanoEventEmitter(...args);
	}

	/**
	 * Attach an observer for one or more eventNames.
	 *
	 * @param  {!(string|string[])} eventNames array or string of space seperated event names
	 * @param  {ObserverCallback} observer  observer to invoke for eventNames
	 * @return {this}
	 *
	 * @example
	 * ```js
	 * import NanoEventEmitter from 'nano-event-emitter';
	 * const eventEmitter = NanoEventEmitter.create();
	 *
	 * eventEmitter.on('event', () => { console.log('event'); });
	 * eventEmitter.on('more-event', () => { console.log('more-event'); });
	 * eventEmitter.on(['even', 'more', 'events'], () => { console.log('even more events'); });
	 *
	 * eventEmitter.emit(['event', 'more-event']);
	 * // console: event
	 * // console: more-event
	 *
	 * eventEmitter.emit('even more events');
	 * // console: even more events
	 * // console: even more events
	 * // console: even more events
	 * ```
	 */
	on(eventNames, observer) {
		const events = Array.isArray(eventNames) ?
			eventNames :
			eventNames.split(' ');

		events.filter(Boolean).forEach(event => {
			this.observers[event] = this.observers[event] || [];
			this.observers[event].push(observer);
		});

		return this;
	}

	/**
	 * Detach an observer for one or more eventNames.
	 *
	 * @param  {!(string|string[])} eventNames array or string of space seperated event names
	 * @param  {?ObserverCallback} [observer] reference to observer function to detach. All observer functions for all eventNames are detached if omitted
	 * @return {this}
	 *
	 * @example
	 * ```js
	 * import NanoEventEmitter from 'nano-event-emitter';
	 * const eventEmitter = NanoEventEmitter.create();
	 *
	 * const yetAnotherObserver = () => console.log('yet-another-observer');
	 *
	 * eventEmitter.on('yet-another-event', () => { console.log('yet-another-event'); });
	 * eventEmitter.on('yet-another-event', () => { console.log('yet-another-event'); });
	 * eventEmitter.on('yet-another-event', yetAnotherObserver);
	 *
	 * eventEmitter.emit(['yet-another-event']);
	 * // console: yet-another-event
	 * // console: yet-another-event
	 * // console: yet-another-observer
	 *
	 * eventEmitter.off('yet-another-event', yetAnotherObserver);
	 * eventEmitter.emit('yet-another-event');
	 * // console: yet-another-event
	 * // console: yet-another-event
	 *
	 * eventEmitter.off('yet-another-event');
	 * eventEmitter.emit('yet-another-event');
	 * ```
	 */
	off(eventNames, observer) {
		const events = Array.isArray(eventNames) ?
			eventNames :
			eventNames.split(' ');

		if (typeof observer === 'undefined') {
			events.filter(Boolean).forEach(event => {
				delete this.observers[event];
			});
			return this;
		}

		events.filter(Boolean).forEach(event => {
			const observers = this.observers[event] || [];
			const index = observers.indexOf(observer);
			if (index > -1) {
				observers.splice(index, 1);
			}
		});

		return this;
	}

	/**
	 * Emit one or more events, invoking registered observers with optional args
	 *
	 * @param  {!(string|string[])} eventNames array or string of space seperated event names
	 * @param  {*} [...args] zero ore more parameters to pass to invoked observers
	 * @return {this}
	 */
	emit(eventNames, ...args) {
		const events = Array.isArray(eventNames) ?
			eventNames :
			eventNames.split(' ');

		events.filter(Boolean).forEach(event => {
			const observers = this.observers[event] || [];
			observers.forEach(observer => observer(...(args || [])));
		});

		return this;
	}
}

module.exports = NanoEventEmitter;
