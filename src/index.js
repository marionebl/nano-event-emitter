class NanoEventEmitter {
	observers = {};

	on(eventNames, listener) {
		const events = Array.isArray(eventNames) ?
			eventNames :
			eventNames.split(' ');

		events.forEach(event => {
			this.observers[event] = this.observers[event] || [];
			this.observers[event].push(listener);
		});
	}

	off(event, listener) {
		if (typeof this.observers[event] === 'undefined') {
			return;
		}

		if (typeof listener === 'undefined') {
			delete this.observers[event];
			return;
		}

		const index = this.observers[event].indexOf(listener);

		if (index > -1) {
			this.observers[event].splice(index, 1);
		}
	}

	emit(event, ...args) {
		if (typeof this.observers[event] === 'undefined') {
			return;
		}

		this.observers[event].forEach(observer => observer(...args));
	}
}

module.exports = NanoEventEmitter;
