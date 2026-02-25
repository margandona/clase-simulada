/**
 * @file CharacterController.js
 * @description NOVA character animation management
 * @module ui/CharacterController
 */

/**
 * CharacterController class - Manages NOVA character animations
 * @class
 */
class CharacterController {
    /**
     * Constructor
     */
    constructor() {
        this.frames = [0, 1, 0, 2, 0]; // Animation sequence
        this.frameIndex = 0;
        this.animationTimer = null;
        this.frameElements = null;
    }

    /**
     * Initialize character animation
     * @param {NodeList} frameElements - Frame elements
     */
    initialize(frameElements) {
        this.frameElements = frameElements;
        this.showFrame(0);
        this.start();
    }

    /**
     * Show specific frame
     * @param {number} frameNumber - Frame index to show
     * @private
     */
    showFrame(frameNumber) {
        if (!this.frameElements) return;

        this.frameElements.forEach((el, i) => {
            el.classList.toggle('active', i === frameNumber);
        });
    }

    /**
     * Animate to next frame
     * @private
     */
    animateFrame() {
        // Show current frame
        const currentFrame = this.frames[this.frameIndex];
        this.showFrame(currentFrame);

        // Move to next frame
        this.frameIndex = (this.frameIndex + 1) % this.frames.length;

        // Calculate timing (blink = 100ms, mouth = 200ms, idle = 2500ms)
        let delay = this.frames[this.frameIndex] === 0 ? 2500 : 200;

        // Schedule next animation
        this.animationTimer = setTimeout(() => {
            this.animateFrame();
        }, delay);
    }

    /**
     * Start animation
     */
    start() {
        if (this.animationTimer) {
            this.stop();
        }
        
        // Start after initial delay
        this.animationTimer = setTimeout(() => {
            this.animateFrame();
        }, 2500);
    }

    /**
     * Stop animation
     */
    stop() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }
    }

    /**
     * Cleanup
     */
    destroy() {
        this.stop();
        this.frameElements = null;
    }
}

export default CharacterController;
