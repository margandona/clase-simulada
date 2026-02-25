/**
 * @file helpers.js
 * @description Utility helper functions
 * @module utils/helpers
 */

/**
 * Scroll to element smoothly
 * @param {HTMLElement} element - Element to scroll to
 * @param {string} block - Scroll alignment ('start', 'center', 'end', 'nearest')
 */
export function scrollToElement(element, block = 'start') {
    if (!element) return;
    
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block });
    }, 100);
}

/**
 * Setup keyboard navigation for buttons
 * @param {NodeList|Array} buttons - Button elements
 */
export function setupKeyboardNavigation(buttons) {
    buttons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

/**
 * Setup touch enhancements for mobile
 * @param {NodeList|Array} elements - Elements to enhance
 */
export function setupTouchEnhancements(elements) {
    elements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.opacity = '0.8';
        });
        element.addEventListener('touchend', () => {
            element.style.opacity = '1';
        });
    });
}

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 */
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

/**
 * Format time in seconds to MM:SS
 * @param {number} seconds - Seconds to format
 * @returns {string} Formatted time
 */
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Safe JSON parse
 * @param {string} json - JSON string
 * @param {*} defaultValue - Default value if parse fails
 * @returns {*} Parsed object or default value
 */
export function safeJSONParse(json, defaultValue = null) {
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error('JSON parse error:', error);
        return defaultValue;
    }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if in viewport
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Wait for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after wait time
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Deep clone object
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
