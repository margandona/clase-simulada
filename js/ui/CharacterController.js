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
        this.sprite = null;
        this.currentState = 'idle';
        this.stateTimeout = null;
    }

    /**
     * Initialize character animation
     * @param {NodeList} frameElements - Frame elements
     */
    initialize(frameElements) {
        this.frameElements = frameElements;
        this.sprite = document.getElementById('novaSprite');
        this.showFrame(0);
        this.start();
        
        // Set default animation state
        this.setAnimationState('idle');
    }

    /**
     * Set NOVA animation state
     * @param {string} state - Animation state (idle, thinking, celebration, bounce, swing, shake, pulse)
     * @param {number} duration - Duration in ms (0 = infinite)
     */
    setAnimationState(state, duration = 0) {
        if (!this.sprite) return;

        // Clear previous state timeout
        if (this.stateTimeout) {
            clearTimeout(this.stateTimeout);
            this.stateTimeout = null;
        }

        // Remove all animation classes
        this.sprite.classList.remove(
            'nova-sprite--idle',
            'nova-sprite--thinking',
            'nova-sprite--celebration',
            'nova-sprite--bounce',
            'nova-sprite--swing',
            'nova-sprite--shake',
            'nova-sprite--pulse'
        );

        // Add new animation class
        const className = `nova-sprite--${state}`;
        this.sprite.classList.add(className);
        this.currentState = state;

        console.log(`🎭 NOVA animation: ${state}`);

        // Return to idle after duration
        if (duration > 0) {
            this.stateTimeout = setTimeout(() => {
                this.setAnimationState('idle');
            }, duration);
        }
    }

    /**
     * Play celebration animation
     */
    celebrate() {
        this.setAnimationState('celebration', 1000);
    }

    /**
     * Play thinking animation
     * @param {number} duration - Duration in ms (default: 3000)
     */
    think(duration = 3000) {
        this.setAnimationState('thinking', duration);
    }

    /**
     * Play bounce animation
     */
    bounce() {
        this.setAnimationState('bounce', 600);
    }

    /**
     * Play shake animation (for errors)
     */
    shake() {
        this.setAnimationState('shake', 500);
    }

    /**
     * Play pulse animation
     * @param {number} duration - Duration in ms (default: 2000)
     */
    pulse(duration = 2000) {
        this.setAnimationState('pulse', duration);
    }

    /**
     * Play swing animation
     * @param {number} duration - Duration in ms (0 = infinite)
     */
    swing(duration = 0) {
        this.setAnimationState('swing', duration);
    }

    /**
     * Return to idle animation
     */
    idle() {
        this.setAnimationState('idle');
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
        
        if (this.stateTimeout) {
            clearTimeout(this.stateTimeout);
            this.stateTimeout = null;
        }
        
        this.frameElements = null;
        this.sprite = null;
    }
}

export default CharacterController;
