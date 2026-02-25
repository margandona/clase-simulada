/**
 * @file GameState.js
 * @description Game state management model
 * @module models/GameState
 */

/**
 * GameState class - Singleton pattern for centralized state management
 * @class
 */
class GameState {
    /**
     * Private constructor for singleton pattern
     * @private
     */
    constructor() {
        if (GameState.instance) {
            return GameState.instance;
        }

        this.state = {
            completedMissions: [],
            characterFrame: 0,
            rewards: 0,
            currentPhase: 'activation',
            showedFinalScreen: false,
            messagesMuted: false,
            lastMessageIndex: 0,
            firstSubmissionShown: false,
            activityInteractions: {},
            currentActivity: null,
            readingMode: false
        };

        GameState.instance = this;
    }

    /**
     * Get singleton instance
     * @returns {GameState} The singleton instance
     */
    static getInstance() {
        if (!GameState.instance) {
            GameState.instance = new GameState();
        }
        return GameState.instance;
    }

    /**
     * Get complete state object
     * @returns {Object} The current state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Get specific state property
     * @param {string} key - State property key
     * @returns {*} The value of the property
     */
    get(key) {
        return this.state[key];
    }

    /**
     * Set specific state property
     * @param {string} key - State property key
     * @param {*} value - Value to set
     */
    set(key, value) {
        this.state[key] = value;
    }

    /**
     * Update multiple state properties
     * @param {Object} updates - Object with properties to update
     */
    update(updates) {
        this.state = { ...this.state, ...updates };
    }

    /**
     * Reset state to initial values
     */
    reset() {
        this.state = {
            completedMissions: [],
            characterFrame: 0,
            rewards: 0,
            currentPhase: 'activation',
            showedFinalScreen: false,
            messagesMuted: false,
            lastMessageIndex: 0,
            firstSubmissionShown: false,
            activityInteractions: {},
            currentActivity: null,
            readingMode: false
        };
    }

    /**
     * Add completed mission
     * @param {string} missionId - Mission ID to add
     */
    addCompletedMission(missionId) {
        if (!this.state.completedMissions.includes(missionId)) {
            this.state.completedMissions.push(missionId);
        }
    }

    /**
     * Check if mission is completed
     * @param {string} missionId - Mission ID to check
     * @returns {boolean} True if mission is completed
     */
    isMissionCompleted(missionId) {
        return this.state.completedMissions.includes(missionId);
    }

    /**
     * Get completed missions count
     * @returns {number} Number of completed missions
     */
    getCompletedMissionsCount() {
        return Math.floor(this.state.completedMissions.length / 3);
    }

    /**
     * Add rewards
     * @param {number} amount - Amount of rewards to add
     */
    addRewards(amount) {
        this.state.rewards += amount;
    }

    /**
     * Get current rewards
     * @returns {number} Current rewards
     */
    getRewards() {
        return this.state.rewards;
    }

    /**
     * Update current learning phase
     * @param {string} phase - New phase
     */
    setPhase(phase) {
        this.state.currentPhase = phase;
    }

    /**
     * Get current learning phase
     * @returns {string} Current phase
     */
    getPhase() {
        return this.state.currentPhase;
    }

    /**
     * Calculate current phase based on progress
     * @returns {string} Calculated phase
     */
    calculateCurrentPhase() {
        const completedCount = this.getCompletedMissionsCount();
        const phases = ['activation', 'exploration', 'understanding', 'application', 'collaborative', 'closure'];
        
        if (completedCount < 6) {
            return phases[completedCount] || 'activation';
        }
        return 'closure';
    }

    /**
     * Calculate progress percentage
     * @returns {number} Progress percentage (0-100)
     */
    getProgressPercentage() {
        return Math.round((this.getCompletedMissionsCount() / 6) * 100);
    }

    /**
     * Track activity interaction
     * @param {string} activityId - Activity ID
     * @param {string} interactionType - Type of interaction
     */
    trackInteraction(activityId, interactionType) {
        if (!this.state.activityInteractions[activityId]) {
            this.state.activityInteractions[activityId] = {
                opened: Date.now(),
                attempts: 0,
                interactions: []
            };
        }
        this.state.activityInteractions[activityId].interactions.push(interactionType);
    }

    /**
     * Increment activity attempts
     * @param {string} activityId - Activity ID
     */
    incrementAttempts(activityId) {
        if (!this.state.activityInteractions[activityId]) {
            this.state.activityInteractions[activityId] = {
                opened: Date.now(),
                attempts: 0,
                interactions: []
            };
        }
        this.state.activityInteractions[activityId].attempts++;
    }

    /**
     * Mark activity as completed
     * @param {string} activityId - Activity ID
     */
    completeActivity(activityId) {
        if (this.state.activityInteractions[activityId]) {
            this.state.activityInteractions[activityId].completed = Date.now();
        }
    }
}

export default GameState;
