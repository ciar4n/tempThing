class AlertElement extends HTMLElement {
	constructor() {
		super();
	}

	/* Attributes to monitor */
	static get observedAttributes() { return ['level', 'button']; }
	get level() { return this.getAttribute('level'); }
	get button() { return this.getAttribute('button'); }

	/* Called when the element is inserted into a document */
	connectedCallback() {
		this.setAttribute('role', 'alert');
		this.classList.add("show");

		// Default to info
		if (!this.level || ['info', 'warning', 'danger', 'success'].indexOf(this.level) === -1) {
			this.setAttribute('level', 'info');
		}

		if (this.button && this.button === "true") {
			this.appendCloseButton();
		}
	}

	/* Called when the element is removed from a document */
	disconnectedCallback() {
		this.removeEventListener('close.joomla.alert', this);
		this.removeEventListener('closed.joomla.alert', this);
		if (this.firstChild.tagName.toLowerCase() === 'button') this.firstChild.removeEventListener('click', this);
	}

	/* Respond to attribute changes */
	attributeChangedCallback(attr, oldValue, newValue) {
		if (attr === 'level') {
			if (['info', 'warning', 'danger', 'success'].indexOf(newValue) === -1) {
				this.setAttribute('level', oldValue);
			}
		}
		if (attr === 'button') {
			if (['true', 'false'].indexOf(newValue) === -1) {
				this.setAttribute('button', 'false');
				this.removeCloseButton();
			}
			if (newValue === "true") this.appendCloseButton();
		}
	}

	/* Method to close the alert */
	close() {
		this.dispatchCustomEvent('close.bs.alert');
		this.addEventListener("transitionend", function (event) {
			let OriginalCustomEvent = new CustomEvent('closed.joomla.alert');
			OriginalCustomEvent.relatedTarget = this;
			this.dispatchEvent(OriginalCustomEvent);
			this.removeEventListener('closed.joomla.alert', this);
			this.parentNode.removeChild(this);
		}, false);
		this.classList.remove('show');
	}

	/* Method to dispatch events */
	dispatchCustomEvent(eventName) {
		let OriginalCustomEvent = new CustomEvent(eventName);
		OriginalCustomEvent.relatedTarget = this;
		this.dispatchEvent(OriginalCustomEvent);
		this.removeEventListener(eventName, this);
	}

	/* Method to create the close button */
	appendCloseButton() {
		const closeLabel = (window.Joomla && Joomla.JText && Joomla.JText._ && typeof Joomla.JText._ === 'function' && Joomla.JText._('JCLOSE')) ? Joomla.JText._('JCLOSE') : 'Close';
		if (!this.querySelector('button[aria-label="' + closeLabel + '"]')) {
			let closeButton = document.createElement('button');
			closeButton.setAttribute('aria-label', closeLabel);
			closeButton.classList.add('close');
			closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

			if (this.firstChild) {
				this.insertBefore(closeButton, this.firstChild);
			} else {
				this.appendChild(closeButton);
			}

				/* Add the required listener */
			if (this.firstChild && this.firstChild.tagName && this.firstChild.tagName.toLowerCase() === 'button') {
				this.firstChild.addEventListener('click', function () {
					this.parentNode.close();
				});
			}
		}
	}

	/* Method to remove the close button */
	removeCloseButton() {
		let button = this.querySelector('button');
		if (button) {
			button.removeEventListener('click', this);
			button.parentNode.removeChild(button);
		}
	}
}

customElements.define('{{REGISTERELEMENT}}', AlertElement);
