/**
 * @file ModalController.js
 * @description Modal window management
 * @module ui/ModalController
 */

/**
 * ModalController class - Manages modal windows
 * @class
 */
class ModalController {
    /**
     * Constructor
     * @param {AudioService} audioService - Audio service for TTS
     */
    constructor(audioService = null) {
        this.modals = new Map();
        this.audioService = audioService;
        this.previouslyFocusedElement = null;
        this.setupKeyboardHandlers();
        // Note: setupAudioButtons() moved to be called after modals are registered
    }

    /**
     * Register a modal
     * @param {string} name - Modal identifier
     * @param {HTMLElement} element - Modal element
     * @param {HTMLElement} closeButton - Close button element
     */
    register(name, element, closeButton) {
        this.modals.set(name, { element, closeButton });

        // Setup close button
        closeButton.addEventListener('click', () => this.close(name));

        // Close on background click
        element.addEventListener('click', (e) => {
            if (e.target === element) {
                this.close(name);
            }
        });

        // Initialize aria attributes
        element.setAttribute('aria-hidden', 'true');
        // Note: inert removed from HTML, now handled by CSS pointer-events
    }

    /**
     * Open modal
     * @param {string} name - Modal identifier
     */
    open(name) {
        const modal = this.modals.get(name);
        if (!modal) {
            console.warn(`Modal "${name}" not found`);
            return;
        }

        // Save currently focused element
        this.previouslyFocusedElement = document.activeElement;

        // Show the modal
        modal.element.classList.add('active');
        modal.element.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus the close button for accessibility
        const closeBtn = modal.closeButton;
        if (closeBtn) {
            // Use setTimeout to ensure focus happens after render
            setTimeout(() => closeBtn.focus(), 100);
        }
    }

    /**
     * Close modal
     * @param {string} name - Modal identifier
     */
    close(name) {
        const modal = this.modals.get(name);
        if (!modal) {
            console.warn(`Modal "${name}" not found`);
            return;
        }

        // Blur any focused element inside modal
        const focusedElement = modal.element.querySelector(':focus');
        if (focusedElement) {
            focusedElement.blur();
        }

        modal.element.classList.remove('active');
        modal.element.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Restore focus to previously focused element if available
        if (this.previouslyFocusedElement && this.previouslyFocusedElement !== document.body) {
            setTimeout(() => {
                try {
                    this.previouslyFocusedElement.focus();
                } catch (e) {
                    // If element is no longer in DOM, focus body
                    document.body.focus();
                }
            }, 100);
        }
    }

    /**
     * Close all modals
     */
    closeAll() {
        this.modals.forEach((modal, name) => {
            this.close(name);
        });
    }

    /**
     * Check if modal is open
     * @param {string} name - Modal identifier
     * @returns {boolean} True if modal is open
     */
    isOpen(name) {
        const modal = this.modals.get(name);
        return modal ? modal.element.classList.contains('active') : false;
    }

    /**
     * Setup audio buttons for modals
     * @public
     */
    setupAudioButtons() {
        console.log('🎚️ Setting up audio buttons...');
        console.log('📦 AudioService available:', !!this.audioService);
        
        if (!this.audioService) {
            console.error('❌ AudioService not available! Audio buttons will not work.');
            return;
        }

        // Story modal audio button
        const storyAudioBtn = document.querySelector('#storyModal .audio-btn-story');
        console.log('📌 Story audio button found:', !!storyAudioBtn);
        
        if (storyAudioBtn) {
            storyAudioBtn.addEventListener('click', (e) => {
                console.log('🖱️ Story audio button clicked!');
                e.preventDefault();
                
                const storyText = document.querySelector('#storyModal .modal-text');
                console.log('📄 Story text element found:', !!storyText);
                
                if (storyText) {
                    const isPlaying = this.audioService.isPlaying_status();
                    console.log('🔄 Current playing status:', isPlaying);
                    
                    if (isPlaying) {
                        console.log('⏹️ Stopping audio...');
                        this.audioService.stop();
                        storyAudioBtn.textContent = '🔊 Escuchar historia';
                    } else {
                        const text = this.extractTextFromElement(storyText);
                        console.log('📝 Extracted text length:', text.length);
                        console.log('📝 Text preview:', text.substring(0, 100) + '...');
                        
                        console.log('🎤 Calling speak()...');
                        const result = this.audioService.speak(text, () => {
                            console.log('🏁 Callback triggered - audio finished');
                            storyAudioBtn.textContent = '🔊 Escuchar historia';
                        });
                        console.log('✅ speak() returned:', result);
                        
                        storyAudioBtn.textContent = '⏹️ Detener';
                    }
                }
            });
        }

        // Concepts modal audio button
        const conceptsAudioBtn = document.querySelector('#conceptsModal .audio-btn-concepts');
        console.log('📌 Concepts audio button found:', !!conceptsAudioBtn);
        
        if (conceptsAudioBtn) {
            conceptsAudioBtn.addEventListener('click', (e) => {
                console.log('🖱️ Concepts audio button clicked!');
                e.preventDefault();
                
                const conceptsText = document.querySelector('#conceptsModal .modal-text');
                console.log('📄 Concepts text element found:', !!conceptsText);
                
                if (conceptsText) {
                    const isPlaying = this.audioService.isPlaying_status();
                    console.log('🔄 Current playing status:', isPlaying);
                    
                    if (isPlaying) {
                        console.log('⏹️ Stopping audio...');
                        this.audioService.stop();
                        conceptsAudioBtn.textContent = '🔊 Escuchar conceptos';
                    } else {
                        const text = this.extractTextFromElement(conceptsText);
                        console.log('📝 Extracted text length:', text.length);
                        console.log('📝 Text preview:', text.substring(0, 100) + '...');
                        
                        console.log('🎤 Calling speak()...');
                        const result = this.audioService.speak(text, () => {
                            console.log('🏁 Callback triggered - audio finished');
                            conceptsAudioBtn.textContent = '🔊 Escuchar conceptos';
                        });
                        console.log('✅ speak() returned:', result);
                        
                        conceptsAudioBtn.textContent = '⏹️ Detener';
                    }
                }
            });
        }
        
        console.log('✅ Audio buttons setup complete');
    }

    /**
     * Extract readable text from element
     * @private
     * @param {HTMLElement} element - Element to extract text from
     * @returns {string} Extracted text
     */
    extractTextFromElement(element) {
        console.log('🔍 Extracting text from element...');
        
        const clone = element.cloneNode(true);
        
        // Remove script and style elements
        clone.querySelectorAll('script, style').forEach(el => el.remove());
        
        // Get text content
        let text = clone.textContent
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 5000); // Limit to 5000 characters for performance
        
        console.log('✅ Text extracted. Length:', text.length);
        console.log('preview:', text.substring(0, 200));
        
        return text;
    }
}

export default ModalController;
