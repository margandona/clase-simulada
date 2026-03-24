/**
 * @file MessageService.js
 * @description JARVIS message and toast notification management
 * @module services/MessageService
 */

import { AUTO_TOAST_MESSAGES, PROGRESS_MESSAGES, JARVIS_MESSAGES } from '../data/messages.js';
import GameState from '../models/GameState.js';

/**
 * MessageService class - Manages JARVIS messages and notifications
 * @class
 */
class MessageService {
    /**
     * Constructor
     * @param {AudioService} audioService - Audio service for TTS (optional)
     */
    constructor(audioService = null) {
        this.gameState = GameState.getInstance();
        this.audioService = audioService;
        this.characterController = null;
        this.messageTimer = null;
        this.toastElement = null;
        this.textElement = null;
    }

    /**
     * Initialize message system
     * @param {HTMLElement} toastElement - Toast container element
     * @param {HTMLElement} textElement - Text content element
     * @param {HTMLElement} closeButton - Close button element
     * @param {AudioService} audioService - Audio service (optional)
     */
    initialize(toastElement, textElement, closeButton, audioService = null) {
        this.toastElement = toastElement;
        this.textElement = textElement;
        if (audioService) {
            this.audioService = audioService;
        }

        // Close button handler
        closeButton.addEventListener('click', () => this.hide());

        // Auto-hide on click
        toastElement.addEventListener('click', (e) => {
            if (e.target !== closeButton) {
                this.hide();
            }
        });
    }

    /**
     * Set character controller for animations
     * @param {CharacterController} characterController - Character controller instance
     */
    setCharacterController(characterController) {
        this.characterController = characterController;
    }

    /**
     * Show toast message
     * @param {string} message - Message to display
     * @param {number} duration - Duration in ms (0 = no auto-hide)
     * @param {boolean} autoSpeak - Auto-speak message with TTS
     */
    show(message, duration = 5000, autoSpeak = true) {
        if (!this.toastElement || !this.textElement) {
            console.warn('MessageService not initialized');
            return;
        }

        // Clean message from emojis for speech
        const messageForSpeech = message.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();

        this.textElement.textContent = message;
        this.toastElement.classList.add('show');

        // Speak message if audio enabled and autoSpeak is true
        if (autoSpeak && this.audioService && messageForSpeech && !message.includes('próximamente')) {
            try {
                this.audioService.speak(messageForSpeech);
            } catch (e) {
                console.warn('Audio playback error:', e);
            }
        }

        if (duration > 0) {
            setTimeout(() => this.hide(), duration);
        }
    }

    /**
     * Hide toast message
     */
    hide() {
        if (this.toastElement) {
            this.toastElement.classList.remove('show');
        }
    }

    /**
     * Start automatic message rotation
     */
    startAutoMessages() {
        if (this.gameState.get('messagesMuted')) {
            return;
        }

        // Clear existing timer
        if (this.messageTimer) {
            clearTimeout(this.messageTimer);
        }

        // Show first message after 5 seconds
        this.messageTimer = setTimeout(() => {
            this.showNextAutoMessage();
        }, 5000);
    }

    /**
     * Show next automatic message based on current phase
     */
    showNextAutoMessage() {
        if (this.gameState.get('messagesMuted')) {
            return;
        }

        const phase = this.gameState.getPhase();
        const messages = AUTO_TOAST_MESSAGES[phase] || AUTO_TOAST_MESSAGES.activation;

        // Get next message (rotate through variations)
        const messageIndex = this.gameState.get('lastMessageIndex') % messages.length;
        const message = messages[messageIndex];

        this.gameState.set('lastMessageIndex', messageIndex + 1);

        // Show message with audio (if enabled)
        const shouldSpeak = this.audioService && this.audioService.isEnabled() && 
                           !this.gameState.get('messagesMuted');
        this.show(message, 6000, shouldSpeak);

        // Schedule next message (random 20-30 seconds)
        const nextDelay = 20000 + Math.random() * 10000;
        this.messageTimer = setTimeout(() => {
            this.showNextAutoMessage();
        }, nextDelay);
    }

    /**
     * Show progress-triggered message
     * @param {string} type - Message type (firstSubmission, missionComplete, allComplete)
     */
    showProgressMessage(type) {
        const message = PROGRESS_MESSAGES[type];
        if (message) {
            const shouldSpeak = this.audioService && this.audioService.isEnabled();
            this.show(message, 5000, shouldSpeak);
            
            // JARVIS pulses for important progress messages
            if (this.characterController) {
                if (type === 'missionComplete' || type === 'allComplete') {
                    this.characterController.celebrate();
                } else if (type === 'firstSubmission') {
                    this.characterController.pulse(2000);
                }
            }
        }
    }

    /**
     * Get phase-specific message
     * @param {string} phase - Learning phase
     * @returns {string} Phase message
     */
    getPhaseMessage(phase) {
        return JARVIS_MESSAGES[phase] || JARVIS_MESSAGES.default;
    }

    /**
     * Stop auto messages
     */
    stopAutoMessages() {
        if (this.messageTimer) {
            clearTimeout(this.messageTimer);
            this.messageTimer = null;
        }
    }

    /**
     * Toggle mute state
     * @returns {boolean} New mute state
     */
    toggleMute() {
        const newMuteState = !this.gameState.get('messagesMuted');
        this.gameState.set('messagesMuted', newMuteState);

        if (newMuteState) {
            this.hide();
            this.stopAutoMessages();
            this.show("🔕 Mensajes automáticos silenciados", 2000, false);
        } else {
            this.show("🔔 Mensajes automáticos activados", 2000, false);
            this.startAutoMessages();
        }

        return newMuteState;
    }
}

export default MessageService;
