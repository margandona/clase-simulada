/**
 * @file BackgroundController.js
 * @description Controls dynamic mission backgrounds behind NOVA character
 * @module ui/BackgroundController
 */

import GameState from '../models/GameState.js';

/**
 * BackgroundController class - Manages mission background changes
 * @class
 */
class BackgroundController {
    /**
     * Constructor
     */
    constructor() {
        this.gameState = GameState.getInstance();
        this.backgroundElement = document.getElementById('novaBackground');
        this.isHighContrast = false;
        
        // Background configuration
        this.backgrounds = {
            0: 'assets/fondos/fondo1.png',      // Default/Intro
            1: 'assets/fondos/fondo1.1.png',    // Mission 1: Activation
            2: 'assets/fondos/fondo2.png',      // Mission 2: Problem Exploration
            3: 'assets/fondos/fondo3.png',      // Mission 3: Apply Concepts
            4: 'assets/fondos/fondo4.png',      // Mission 4: System Repair
            5: 'assets/fondos/fondo5.png',      // Mission 5: Collaboration
            6: 'assets/fondos/fondo6.png',      // Mission 6: Launch
            'high-contrast': 'assets/fondos/alto-contraste.png'
        };
        
        // Preloaded images cache
        this.imageCache = new Map();
        
        console.log('🎨 BackgroundController initialized');
    }

    /**
     * Initialize controller - preload images and set initial background
     */
    init() {
        this.preloadImages();
        this.updateBackground();
    }

    /**
     * Preload all background images for smooth transitions
     */
    preloadImages() {
        console.log('🖼️ Preloading background images...');
        
        Object.entries(this.backgrounds).forEach(([key, path]) => {
            const img = new Image();
            img.src = path;
            this.imageCache.set(key, img);
            
            img.onload = () => {
                console.log(`✓ Preloaded: ${path}`);
            };
            
            img.onerror = () => {
                console.warn(`⚠️ Failed to load: ${path}`);
            };
        });
    }

    /**
     * Set background for specific mission number
     * @param {number} missionNumber - Mission number (0-6)
     */
    setMissionBackground(missionNumber) {
        if (this.isHighContrast) {
            console.log('ℹ️ High contrast mode active, skipping mission background change');
            return;
        }

        const backgroundPath = this.backgrounds[missionNumber];
        
        if (!backgroundPath) {
            console.warn(`⚠️ No background found for mission ${missionNumber}`);
            return;
        }

        if (this.backgroundElement) {
            // Add fade effect during transition
            this.backgroundElement.style.opacity = '0.7';
            
            setTimeout(() => {
                this.backgroundElement.style.backgroundImage = `url('${backgroundPath}')`;
                this.backgroundElement.style.opacity = '0.9';
                console.log(`🎨 Background updated to mission ${missionNumber}: ${backgroundPath}`);
            }, 150);
        }
    }

    /**
     * Update background based on current game state
     */
    updateBackground() {
        const completedMissionsCount = this.gameState.getCompletedMissionsCount();
        
        // Determine which background to show
        // Mission 0 = default, Missions 1-6 = respective backgrounds
        const missionNumber = Math.min(completedMissionsCount + 1, 6);
        
        // If no missions completed yet, show mission 1 background (activation theme)
        const backgroundIndex = completedMissionsCount === 0 ? 1 : missionNumber;
        
        this.setMissionBackground(backgroundIndex);
    }

    /**
     * Enable or disable high contrast mode
     * @param {boolean} enabled - Whether to enable high contrast mode
     */
    setHighContrastMode(enabled) {
        this.isHighContrast = enabled;
        
        if (!this.backgroundElement) {
            console.warn('⚠️ Background element not found');
            return;
        }

        if (enabled) {
            this.backgroundElement.classList.add('nova-background--high-contrast');
            this.backgroundElement.style.backgroundImage = `url('${this.backgrounds['high-contrast']}')`;
            this.backgroundElement.style.opacity = '1';
            console.log('🔆 High contrast mode enabled');
        } else {
            this.backgroundElement.classList.remove('nova-background--high-contrast');
            this.updateBackground();
            console.log('🔅 High contrast mode disabled');
        }
    }

    /**
     * Toggle high contrast mode
     * @returns {boolean} New high contrast state
     */
    toggleHighContrast() {
        this.setHighContrastMode(!this.isHighContrast);
        return this.isHighContrast;
    }

    /**
     * Manually set background by index (for testing or special events)
     * @param {number|string} index - Background index or 'high-contrast'
     */
    setBackground(index) {
        const backgroundPath = this.backgrounds[index];
        
        if (!backgroundPath) {
            console.warn(`⚠️ No background found for index ${index}`);
            return;
        }

        if (this.backgroundElement) {
            this.backgroundElement.style.backgroundImage = `url('${backgroundPath}')`;
            console.log(`🎨 Background manually set to: ${backgroundPath}`);
        }
    }

    /**
     * Get current mission number based on completed missions
     * @returns {number} Current mission number
     */
    getCurrentMissionNumber() {
        return this.gameState.getCompletedMissionsCount() + 1;
    }

    /**
     * Reset to default background
     */
    reset() {
        this.isHighContrast = false;
        this.setMissionBackground(0);
        console.log('🔄 Background reset to default');
    }
}

export default BackgroundController;
