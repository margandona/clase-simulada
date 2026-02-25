/**
 * @file dom.js
 * @description DOM manipulation utilities
 * @module utils/dom
 */

/**
 * Query selector with type safety
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (defaults to document)
 * @returns {HTMLElement|null} Selected element or null
 */
export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Query selector all with type safety
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (defaults to document)
 * @returns {NodeList} NodeList of elements
 */
export function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Get element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} Element or null
 */
export function byId(id) {
    return document.getElementById(id);
}

/**
 * Create element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Attributes object
 * @param {string|HTMLElement|Array} content - Content (text, element, or array of elements)
 * @returns {HTMLElement} Created element
 */
export function createElement(tag, attributes = {}, content = null) {
    const element = document.createElement(tag);

    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            const event = key.substring(2).toLowerCase();
            element.addEventListener(event, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    // Set content
    if (content !== null) {
        if (Array.isArray(content)) {
            content.forEach(item => {
                if (typeof item === 'string') {
                    element.appendChild(document.createTextNode(item));
                } else if (item instanceof HTMLElement) {
                    element.appendChild(item);
                }
            });
        } else if (typeof content === 'string') {
            element.textContent = content;
        } else if (content instanceof HTMLElement) {
            element.appendChild(content);
        }
    }

    return element;
}

/**
 * Add class to element
 * @param {HTMLElement} element - Target element
 * @param {string|Array<string>} classNames - Class name(s) to add
 */
export function addClass(element, classNames) {
    if (!element) return;
    const classes = Array.isArray(classNames) ? classNames : [classNames];
    element.classList.add(...classes);
}

/**
 * Remove class from element
 * @param {HTMLElement} element - Target element
 * @param {string|Array<string>} classNames - Class name(s) to remove
 */
export function removeClass(element, classNames) {
    if (!element) return;
    const classes = Array.isArray(classNames) ? classNames : [classNames];
    element.classList.remove(...classes);
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Force add/remove
 */
export function toggleClass(element, className, force = undefined) {
    if (!element) return;
    element.classList.toggle(className, force);
}

/**
 * Check if element has class
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} True if element has class
 */
export function hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
}

/**
 * Set multiple attributes on element
 * @param {HTMLElement} element - Target element
 * @param {Object} attributes - Attributes object
 */
export function setAttributes(element, attributes) {
    if (!element) return;
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
}

/**
 * Remove multiple attributes from element
 * @param {HTMLElement} element - Target element
 * @param {Array<string>} attributes - Attribute names to remove
 */
export function removeAttributes(element, attributes) {
    if (!element) return;
    attributes.forEach(attr => element.removeAttribute(attr));
}

/**
 * Show element (remove display: none)
 * @param {HTMLElement} element - Target element
 */
export function show(element) {
    if (element) {
        element.style.display = '';
    }
}

/**
 * Hide element (add display: none)
 * @param {HTMLElement} element - Target element
 */
export function hide(element) {
    if (element) {
        element.style.display = 'none';
    }
}

/**
 * Toggle element visibility
 * @param {HTMLElement} element - Target element
 */
export function toggle(element) {
    if (!element) return;
    element.style.display = element.style.display === 'none' ? '' : 'none';
}

/**
 * Empty element (remove all children)
 * @param {HTMLElement} element - Target element
 */
export function empty(element) {
    if (!element) return;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Add event listener with options
 * @param {HTMLElement} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object|boolean} options - Event options
 */
export function on(element, event, handler, options = false) {
    if (element) {
        element.addEventListener(event, handler, options);
    }
}

/**
 * Remove event listener
 * @param {HTMLElement} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object|boolean} options - Event options
 */
export function off(element, event, handler, options = false) {
    if (element) {
        element.removeEventListener(event, handler, options);
    }
}

/**
 * Delegate event listener
 * @param {HTMLElement} parent - Parent element
 * @param {string} event - Event name
 * @param {string} selector - Child selector
 * @param {Function} handler - Event handler
 */
export function delegate(parent, event, selector, handler) {
    if (!parent) return;
    
    parent.addEventListener(event, (e) => {
        const target = e.target.closest(selector);
        if (target) {
            handler.call(target, e);
        }
    });
}
