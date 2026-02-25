/**
 * @file PadletService.js
 * @description Service for managing Padlet interactions and state
 * @module services/PadletService
 */

/**
 * PadletService class - Manages Padlet interactions, iframe detection, and persistence
 * @class
 */
class PadletService {
    constructor() {
        this.padletStates = new Map();
        this.iframeMonitors = new Map();
        this.STORAGE_KEY = 'nova_padlet_interactions';
        this.loadStates();
    }

    /**
     * Create a Padlet container with full interactivity detection
     * @param {string} padletId - Unique padlet identifier
     * @param {string} embedUrl - Padlet embed URL
     * @param {Object} options - Configuration options
     * @param {Function} onInteraction - Callback when user interacts with Padlet
     * @returns {HTMLElement} Padlet container element
     */
    createPadletContainer(padletId, embedUrl, options = {}, onInteraction = null) {
        const {
            height = 400,
            maxWidth = 480,
            showOpenButton = true,
            showLoadingIndicator = true,
            fallbackButtonText = 'Abrir Padlet en nueva ventana'
        } = options;

        // Create container
        const container = document.createElement('div');
        container.className = 'padlet-interactive-container';
        container.id = `padlet-${padletId}`;
        container.dataset.padletId = padletId;
        container.style.maxWidth = `${maxWidth}px`;
        container.style.margin = '20px auto';

        // Check if already interacted
        const hasInteracted = this.hasInteracted(padletId);
        if (hasInteracted) {
            container.classList.add('padlet-completed');
        }

        // Build HTML
        let html = '';

        // Loading indicator
        if (showLoadingIndicator) {
            html += `
                <div class="padlet-loading" id="padlet-loading-${padletId}">
                    <div class="padlet-spinner"></div>
                    <p>Cargando Padlet...</p>
                </div>
            `;
        }

        // Embed wrapper
        html += `
            <div class="padlet-embed-wrapper" style="position: relative; width: 100%; padding-bottom: ${height / maxWidth * 100}%; height: 0; overflow: hidden;">
                <iframe 
                    id="padlet-iframe-${padletId}"
                    src="${embedUrl}"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                    allow="encrypted-media"
                    allowfullscreen="true"
                    class="padlet-iframe">
                </iframe>
            </div>
        `;

        // Open button
        if (showOpenButton) {
            html += `
                <div class="padlet-button-container">
                    <button 
                        class="padlet-open-btn" 
                        id="padlet-open-${padletId}"
                        type="button"
                        aria-label="Abrir Padlet en nueva ventana">
                        🌐 ${fallbackButtonText}
                    </button>
                </div>
            `;
        }

        container.innerHTML = html;

        // Setup event listeners
        this.setupInteractionDetection(container, padletId, embedUrl, onInteraction);
        this.setupOpenButton(container, padletId, embedUrl);
        this.setupIframeLoadEvents(container, padletId);

        return container;
    }

    /**
     * Setup interaction detection for Padlet iframe
     * @private
     */
    setupInteractionDetection(container, padletId, embedUrl, onInteraction) {
        const iframe = container.querySelector(`#padlet-iframe-${padletId}`);
        if (!iframe) return;

        // Track interaction flags
        let hasClicked = false;
        let hasScrolled = false;
        let hasTyped = false;

        // Try to detect user interactions
        const detectInteraction = () => {
            if (!this.hasInteracted(padletId)) {
                this.markAsInteracted(padletId);
                this.updateContainerState(container, padletId);
                
                if (onInteraction && typeof onInteraction === 'function') {
                    onInteraction(padletId);
                }
            }
        };

        // Method 1: Monitor postMessage from iframe
        window.addEventListener('message', (event) => {
            // Check if message comes from Padlet domain
            if (embedUrl.includes(event.origin) || event.origin.includes('padlet')) {
                // Log any interaction message from Padlet
                console.log('📌 Padlet interaction detected via postMessage');
                detectInteraction();
            }
        });

        // Method 2: Monitor iframe visibility changes
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('📌 Padlet iframe is visible');
                    detectInteraction();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(iframe);
        this.iframeMonitors.set(padletId, observer);

        // Method 3: Click on iframe (best effort, cross-origin limitation)
        iframe.addEventListener('load', () => {
            try {
                // Try to detect user activity through load event
                console.log('✅ Padlet iframe loaded');
                // Set automatic interaction after a delay (user views the content)
                setTimeout(() => detectInteraction(), 3000);
            } catch (e) {
                // Cross-origin prevents direct access, but load event shows user is viewing
                console.log('ℹ️ Padlet loaded (cross-origin restrictions apply)');
                setTimeout(() => detectInteraction(), 2000);
            }
        });

        // As fallback, detect interaction after 5 seconds of visibility
        let visibleTime = 0;
        setInterval(() => {
            if (window.getComputedStyle(iframe).display !== 'none') {
                visibleTime += 1000;
                if (visibleTime >= 5000) {
                    detectInteraction();
                    visibleTime = -10000; // Only trigger once
                }
            } else {
                visibleTime = 0;
            }
        }, 1000);
    }

    /**
     * Setup "Open Padlet" button
     * @private
     */
    setupOpenButton(container, padletId, embedUrl) {
        const openBtn = container.querySelector(`#padlet-open-${padletId}`);
        if (!openBtn) return;

        openBtn.addEventListener('click', () => {
            // Convert preview embed URL to regular padlet URL
            const regularUrl = embedUrl.replace('/embeds/preview_embed', '');
            window.open(regularUrl, 'padlet_window', 'width=1000,height=800');
            
            // Mark as interacted
            this.markAsInteracted(padletId);
            this.updateContainerState(container, padletId);
        });
    }

    /**
     * Setup iframe load event handling
     * @private
     */
    setupIframeLoadEvents(container, padletId) {
        const iframe = container.querySelector(`#padlet-iframe-${padletId}`);
        const loadingIndicator = container.querySelector(`#padlet-loading-${padletId}`);

        if (!iframe) return;

        // Hide loading when iframe loads
        iframe.addEventListener('load', () => {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        });

        // Handle load errors
        iframe.addEventListener('error', () => {
            console.warn(`❌ Failed to load Padlet ${padletId}`);
            if (loadingIndicator) {
                loadingIndicator.innerHTML = `
                    <div class="padlet-error">
                        <p>⚠️ No se pudo cargar el Padlet</p>
                        <p>Por favor, abre en una nueva ventana</p>
                    </div>
                `;
            }
        });
    }

    /**
     * Mark Padlet as interacted and save to localStorage
     * @param {string} padletId - Padlet identifier
     */
    markAsInteracted(padletId) {
        this.padletStates.set(padletId, {
            interacted: true,
            timestamp: new Date().toISOString()
        });
        this.saveStates();
    }

    /**
     * Check if Padlet has been interacted with
     * @param {string} padletId - Padlet identifier
     * @returns {boolean} True if user has interacted
     */
    hasInteracted(padletId) {
        const state = this.padletStates.get(padletId);
        return state ? state.interacted : false;
    }

    /**
     * Update container visual state
     * @private
     */
    updateContainerState(container, padletId) {
        container.classList.add('padlet-completed');
        const openBtn = container.querySelector(`#padlet-open-${padletId}`);
        if (openBtn) {
            openBtn.classList.add('disabled');
            openBtn.setAttribute('disabled', 'disabled');
        }
    }

    /**
     * Save states to localStorage
     * @private
     */
    saveStates() {
        const statesObj = {};
        this.padletStates.forEach((value, key) => {
            statesObj[key] = value;
        });
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(statesObj));
        } catch (e) {
            console.warn('⚠️ Cannot save to localStorage:', e);
        }
    }

    /**
     * Load states from localStorage
     * @private
     */
    loadStates() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const statesObj = JSON.parse(stored);
                Object.entries(statesObj).forEach(([key, value]) => {
                    this.padletStates.set(key, value);
                });
            }
        } catch (e) {
            console.warn('⚠️ Cannot load from localStorage:', e);
        }
    }

    /**
     * Clear all Padlet interaction states
     */
    clearAllStates() {
        this.padletStates.clear();
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('⚠️ Cannot clear localStorage:', e);
        }
    }

    /**
     * Get interaction state for all Padlets
     * @returns {Object} Object with padlet states
     */
    getAllStates() {
        const states = {};
        this.padletStates.forEach((value, key) => {
            states[key] = value;
        });
        return states;
    }

    /**
     * Cleanup resources for a Padlet
     * @param {string} padletId - Padlet identifier
     */
    cleanup(padletId) {
        const observer = this.iframeMonitors.get(padletId);
        if (observer) {
            observer.disconnect();
            this.iframeMonitors.delete(padletId);
        }
    }
}

// Create and export singleton instance
const padletService = new PadletService();
export default padletService;
