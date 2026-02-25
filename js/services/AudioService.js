/**
 * @file AudioService.js
 * @description Text-to-Speech audio service using Web Speech API
 * @module services/AudioService
 */

/**
 * AudioService class - Manages text-to-speech using Web Speech API
 * @class
 */
class AudioService {
    /**
     * Constructor
     */
    constructor() {
        // Initialize Web Speech API
        const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;
        this.SpeechSynthesisUtterance = SpeechSynthesisUtterance;
        this.speechSynthesis = window.speechSynthesis;
        
        // Log initial diagnostics
        console.log('🎵 AudioService initializing...');
        console.log('📢 SpeechSynthesisUtterance available:', !!this.SpeechSynthesisUtterance);
        console.log('🔊 speechSynthesis available:', !!this.speechSynthesis);
        
        // State
        this.isPlaying = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.queue = [];
        this.currentCallback = null;
        
        // Settings
        this.settings = {
            enabled: true,
            volume: 1.0,
            rate: 1.0,
            pitch: 1.0,
            language: 'es-ES',
            voiceIndex: 0
        };

        // Load settings from localStorage
        this.loadSettings();
        
        // Setup event listeners for speech synthesis
        this.setupListeners();
        
        console.log('✅ AudioService initialized. Enabled:', this.settings.enabled);
    }

    /**
     * Load settings from localStorage
     * @private
     */
    loadSettings() {
        const saved = localStorage.getItem('novaAudioSettings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.settings = { ...this.settings, ...parsed };
            } catch (e) {
                console.warn('Failed to load audio settings');
            }
        }
    }

    /**
     * Save settings to localStorage
     * @private
     */
    saveSettings() {
        localStorage.setItem('novaAudioSettings', JSON.stringify(this.settings));
    }

    /**
     * Setup event listeners for speech synthesis
     * @private
     */
    setupListeners() {
        if (!this.speechSynthesis) {
            console.warn('⚠️ speechSynthesis not available');
            return;
        }

        this.speechSynthesis.onstart = () => {
            console.log('🎬 Speech started');
        };

        this.speechSynthesis.onend = () => {
            console.log('🏁 Speech ended');
            this.isPlaying = false;
            this.isPaused = false;
            
            // Call callback if provided
            if (this.currentCallback) {
                this.currentCallback();
                this.currentCallback = null;
            }
            
            // Play next in queue
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                this.speak(next.text, next.callback);
            }
        };

        this.speechSynthesis.onerror = (event) => {
            console.error('❌ Speech error:', event.error);
            this.isPlaying = false;
        };

        this.speechSynthesis.onpause = () => {
            console.log('⏸️ Speech paused');
            this.isPaused = true;
        };

        this.speechSynthesis.onresume = () => {
            console.log('▶️ Speech resumed');
            this.isPaused = false;
        };
    }

    /**
     * Check if Web Speech API is supported
     * @returns {boolean} True if supported
     */
    isSupported() {
        return !!this.speechSynthesis && !!this.SpeechSynthesisUtterance;
    }

    /**
     * Speak text
     * @param {string} text - Text to speak
     * @param {Function} callback - Callback when finished
     * @returns {boolean} Success status
     */
    speak(text, callback = null) {
        console.log('🎤 Speak called. Text length:', text ? text.length : 0);
        console.log('📊 Audio state:', {
            isSupported: this.isSupported(),
            isEnabled: this.settings.enabled,
            isPlaying: this.isPlaying,
            textExists: !!text
        });

        if (!this.isSupported()) {
            console.error('❌ Web Speech API not supported');
            if (callback) callback();
            return false;
        }

        if (!this.settings.enabled) {
            console.warn('⚠️ Audio is disabled (disabled in settings)');
            if (callback) callback();
            return false;
        }

        if (!text || text.trim().length === 0) {
            console.warn('⚠️ Text is empty or whitespace only');
            if (callback) callback();
            return false;
        }

        // Queue if already speaking
        if (this.isPlaying) {
            console.log('⏳ Already playing. Queueing text. Queue size:', this.queue.length);
            this.queue.push({ text, callback });
            return true;
        }

        try {
            // Cancel any ongoing speech
            this.speechSynthesis.cancel();

            // Create utterance
            this.currentUtterance = new this.SpeechSynthesisUtterance(text);
            this.currentUtterance.lang = this.settings.language;
            this.currentUtterance.volume = this.settings.volume;
            this.currentUtterance.rate = this.settings.rate;
            this.currentUtterance.pitch = this.settings.pitch;

            console.log('🔧 Utterance created:', {
                text: text.substring(0, 100),
                lang: this.currentUtterance.lang,
                volume: this.currentUtterance.volume,
                rate: this.currentUtterance.rate,
                pitch: this.currentUtterance.pitch
            });

            // Store callback
            this.currentCallback = callback;

            // Speak
            this.isPlaying = true;
            console.log('🎵 Calling speechSynthesis.speak()...');
            this.speechSynthesis.speak(this.currentUtterance);
            console.log('✅ speechSynthesis.speak() called successfully');

            return true;
        } catch (error) {
            console.error('❌ Audio playback error:', error);
            this.isPlaying = false;
            return false;
        }
    }

    /**
     * Pause speech
     */
    pause() {
        if (this.speechSynthesis && this.isPlaying) {
            this.speechSynthesis.pause();
        }
    }

    /**
     * Resume speech
     */
    resume() {
        if (this.speechSynthesis && this.isPaused) {
            this.speechSynthesis.resume();
        }
    }

    /**
     * Stop speech
     */
    stop() {
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
            this.isPlaying = false;
            this.isPaused = false;
            this.queue = [];
        }
    }

    /**
     * Toggle audio on/off
     */
    toggle() {
        this.settings.enabled = !this.settings.enabled;
        this.saveSettings();
        
        if (!this.settings.enabled) {
            this.stop();
        }
        
        return this.settings.enabled;
    }

    /**
     * Set volume
     * @param {number} volume - Volume level (0-1)
     */
    setVolume(volume) {
        this.settings.volume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }

    /**
     * Get volume
     * @returns {number} Current volume
     */
    getVolume() {
        return this.settings.volume;
    }

    /**
     * Set speech rate
     * @param {number} rate - Speech rate (0.5-2.0)
     */
    setRate(rate) {
        this.settings.rate = Math.max(0.5, Math.min(2.0, rate));
        this.saveSettings();
    }

    /**
     * Get speech rate
     * @returns {number} Current rate
     */
    getRate() {
        return this.settings.rate;
    }

    /**
     * Set pitch
     * @param {number} pitch - Pitch level (0.5-2.0)
     */
    setPitch(pitch) {
        this.settings.pitch = Math.max(0.5, Math.min(2.0, pitch));
        this.saveSettings();
    }

    /**
     * Get pitch
     * @returns {number} Current pitch
     */
    getPitch() {
        return this.settings.pitch;
    }

    /**
     * Set language
     * @param {string} lang - Language code (e.g., 'es-ES', 'en-US')
     */
    setLanguage(lang) {
        this.settings.language = lang;
        this.saveSettings();
    }

    /**
     * Get language
     * @returns {string} Current language
     */
    getLanguage() {
        return this.settings.language;
    }

    /**
     * Check if audio is enabled
     * @returns {boolean} Enabled status
     */
    isEnabled() {
        return this.settings.enabled;
    }

    /**
     * Check if currently playing
     * @returns {boolean} Playing status
     */
    isPlaying_status() {
        return this.isPlaying;
    }

    /**
     * Get all available voices
     * @returns {Array} Available voices
     */
    getAvailableVoices() {
        if (!this.speechSynthesis) return [];
        return this.speechSynthesis.getVoices();
    }

    /**
     * Get available Spanish voices
     * @returns {Array} Spanish voices
     */
    getSpanishVoices() {
        const voices = this.getAvailableVoices();
        return voices.filter(v => v.lang.includes('es'));
    }
}

export default AudioService;
