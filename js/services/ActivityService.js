/**
 * @file ActivityService.js
 * @description Activity lifecycle and business logic management
 * @module services/ActivityService
 */

import { MISSIONS } from '../data/missions.js';
import { getCompletionMessage } from '../data/messages.js';
import GameState from '../models/GameState.js';

/**
 * ActivityService class - Manages activity workflow and validation
 * @class
 */
class ActivityService {
    /**
     * Constructor
     */
    constructor() {
        this.gameState = GameState.getInstance();
    }

    /**
     * Get mission by ID
     * @param {number} missionId - Mission ID
     * @returns {Object|null} Mission data or null
     */
    getMission(missionId) {
        return MISSIONS[missionId] || null;
    }

    /**
     * Get submission by ID
     * @param {string} submissionId - Submission ID (e.g., '1a')
     * @returns {Object|null} Submission data or null
     */
    getSubmission(submissionId) {
        const missionId = parseInt(submissionId.charAt(0));
        const mission = this.getMission(missionId);
        
        if (!mission) return null;
        
        return mission.submissions.find(s => s.id === submissionId) || null;
    }

    /**
     * Check if activity can be opened
     * @param {string} submissionId - Submission ID
     * @returns {Object} Result with canOpen boolean and reason
     */
    canOpenActivity(submissionId) {
        if (this.gameState.isMissionCompleted(submissionId)) {
            return {
                canOpen: false,
                reason: '✓ Ya completaste esta actividad. ¡Excelente trabajo!'
            };
        }

        const submission = this.getSubmission(submissionId);
        if (!submission) {
            return {
                canOpen: false,
                reason: 'Actividad no encontrada'
            };
        }

        // Check if requires previous activity
        if (submission.requiresPrevious) {
            if (!this.gameState.isMissionCompleted(submission.requiresPrevious)) {
                return {
                    canOpen: true, // Can open but with limited functionality
                    requiresPrevious: true,
                    previousId: submission.requiresPrevious
                };
            }
        }

        return { canOpen: true };
    }

    /**
     * Initialize activity tracking
     * @param {string} submissionId - Submission ID
     */
    initializeActivity(submissionId) {
        const interactions = this.gameState.get('activityInteractions');
        if (!interactions[submissionId]) {
            this.gameState.trackInteraction(submissionId, 'initialized');
        }
        this.gameState.set('currentActivity', submissionId);
    }

    /**
     * Validate quiz activity
     * @param {Object} submission - Submission data
     * @param {HTMLElement} container - Container element
     * @returns {Object} Validation result
     */
    validateQuiz(submission, container) {
        const selected = container.querySelector('input[name="quiz-answer"]:checked');
        if (!selected) {
            return { 
                isValid: false, 
                message: 'Por favor selecciona una opción.' 
            };
        }
        
        const isCorrect = selected.dataset.correct === 'true';
        return {
            isValid: true,
            isCorrect: isCorrect,
            message: isCorrect ? submission.feedback.correct : submission.feedback.incorrect
        };
    }

    /**
     * Validate classification activity
     * @param {Object} submission - Submission data
     * @param {HTMLElement} container - Container element
     * @returns {Object} Validation result
     */
    validateClassification(submission, container) {
        const selected = container.querySelector('.classification-btn.selected');
        if (!selected) {
            return { 
                isValid: false, 
                message: 'Por favor selecciona una clasificación.' 
            };
        }
        
        const isCorrect = selected.dataset.answer === submission.correctAnswer;
        return {
            isValid: true,
            isCorrect: isCorrect,
            message: isCorrect ? submission.explanation.correct : submission.explanation.incorrect
        };
    }

    /**
     * Validate checklist activity
     * @param {Object} submission - Submission data
     * @param {HTMLElement} container - Container element
     * @returns {Object} Validation result
     */
    validateChecklist(submission, container) {
        const checked = container.querySelectorAll('.checklist-items input[type="checkbox"]:checked');
        const minRequired = 2; // Could be configurable in submission data
        const isCorrect = checked.length >= minRequired;
        
        return {
            isValid: true,
            isCorrect: isCorrect,
            message: isCorrect ? submission.feedback.correct : submission.feedback.incorrect
        };
    }

    /**
     * Validate activity based on type
     * @param {string} submissionId - Submission ID
     * @param {HTMLElement} container - Container element
     * @returns {Object} Validation result
     */
    validateActivity(submissionId, container) {
        const submission = this.getSubmission(submissionId);
        if (!submission) {
            return { isValid: false, message: 'Actividad no encontrada' };
        }

        this.gameState.incrementAttempts(submissionId);

        let result = { isValid: false, isCorrect: false, message: '' };

        switch (submission.toolType) {
            case 'quiz':
                result = this.validateQuiz(submission, container);
                break;
            case 'classification':
                result = this.validateClassification(submission, container);
                break;
            case 'checklist':
                result = this.validateChecklist(submission, container);
                break;
            default:
                result = { isValid: false, message: 'Tipo de actividad no soportado' };
        }

        return result;
    }

    /**
     * Complete activity
     * @param {string} submissionId - Submission ID
     * @returns {Object} Completion result with messages
     */
    completeActivity(submissionId) {
        if (this.gameState.isMissionCompleted(submissionId)) {
            return {
                success: false,
                message: '✓ Ya completaste esta actividad'
            };
        }

        const submission = this.getSubmission(submissionId);
        if (!submission) {
            return {
                success: false,
                message: 'Actividad no encontrada'
            };
        }

        // Add completion
        this.gameState.addCompletedMission(submissionId);
        this.gameState.addRewards(10);
        this.gameState.completeActivity(submissionId);

        // Get completion message
        const missionId = parseInt(submissionId.charAt(0));
        const mission = this.getMission(missionId);
        const phase = mission.phase;

        // Check for special progress messages
        const messages = [];
        const completedCount = this.gameState.get('completedMissions').length;

        // First submission ever
        if (!this.gameState.get('firstSubmissionShown') && completedCount === 1) {
            this.gameState.set('firstSubmissionShown', true);
            messages.push({ type: 'progress', key: 'firstSubmission', delay: 3000 });
        }

        // Mission completed (every 3 submissions)
        if (completedCount % 3 === 0) {
            messages.push({ type: 'progress', key: 'missionComplete', delay: 3500 });
        }

        return {
            success: true,
            submission: submission,
            completionMessage: getCompletionMessage(phase),
            novaMessage: submission.novaMessage,
            progressMessages: messages,
            rewards: 10
        };
    }

    /**
     * Check if final completion reached
     * @returns {Object|null} Final completion data or null
     */
    checkFinalCompletion() {
        const mission6Complete = ['6a', '6b', '6c'].every(id => 
            this.gameState.isMissionCompleted(id)
        );

        if (mission6Complete && !this.gameState.get('showedFinalScreen')) {
            this.gameState.set('showedFinalScreen', true);
            
            return {
                isComplete: true,
                rewards: this.gameState.getRewards(),
                message: this.getFinalCelebrationMessage()
            };
        }

        return null;
    }

    /**
     * Get final celebration message
     * @returns {string} Final message
     */
    getFinalCelebrationMessage() {
        const rewards = this.gameState.getRewards();
        return `
🎉 ¡MISIÓN CUMPLIDA! 🎉

✅ Sistema restaurado al 100%
🚀 NOVA está lista para despegar
🏆 Total de puntos: ${rewards}
⭐ Misiones completadas: 6/6

💭 NOVA dice:
"Gracias por ayudarme a regresar a casa.
Aprendiste a diferenciar funciones y condiciones.
¡Eres un excelente ingeniero de software!"

🌟 Recompensa desbloqueada:
🏅 MAESTRO DEL SISTEMA
        `;
    }
}

export default ActivityService;
