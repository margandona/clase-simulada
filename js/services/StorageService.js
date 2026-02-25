/**
 * @file StorageService.js
 * @description LocalStorage persistence service
 * @module services/StorageService
 */

/**
 * StorageService class - Handles state persistence
 * @class
 */
class StorageService {
    /**
     * Storage key constant
     * @static
     * @readonly
     */
    static STORAGE_KEY = 'novaGameState';

    /**
     * Save state to localStorage
     * @param {Object} state - State object to save
     * @returns {boolean} Success status
     */
    static save(state) {
        try {
            const serialized = JSON.stringify(state);
            localStorage.setItem(StorageService.STORAGE_KEY, serialized);
            return true;
        } catch (error) {
            console.error('Error saving state:', error);
            return false;
        }
    }

    /**
     * Load state from localStorage
     * @returns {Object|null} Loaded state or null if not found
     */
    static load() {
        try {
            const serialized = localStorage.getItem(StorageService.STORAGE_KEY);
            if (serialized === null) {
                return null;
            }
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Error loading state:', error);
            return null;
        }
    }

    /**
     * Clear saved state
     * @returns {boolean} Success status
     */
    static clear() {
        try {
            localStorage.removeItem(StorageService.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing state:', error);
            return false;
        }
    }

    /**
     * Check if saved state exists
     * @returns {boolean} True if state exists
     */
    static exists() {
        return localStorage.getItem(StorageService.STORAGE_KEY) !== null;
    }
}

export default StorageService;
