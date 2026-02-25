/**
 * @file UIController.js
 * @description Main UI update and display controller
 * @module ui/UIController
 */

import GameState from '../models/GameState.js';
import MessageService from '../services/MessageService.js';

/**
 * UIController class - Manages UI updates
 * @class
 */
class UIController {
    /**
     * Constructor
     * @param {MessageService} messageService - Message service instance
     */
    constructor(messageService) {
        this.gameState = GameState.getInstance();
        this.messageService = messageService;
        this.currentMission = null;
        this.currentMissionData = null;
    }

    /**
     * Update all UI elements
     */
    updateAll() {
        this.updateMissionCounters();
        this.updateSystemPercentage();
        this.updateMissionBadges();
        this.updateCurrentPhase();
        this.updateNOVAMessage();
    }

    /**
     * Update mission counters (missions completed, rewards)
     */
    updateMissionCounters() {
        const completedCount = this.gameState.getCompletedMissionsCount();
        const rewards = this.gameState.getRewards();

        const missionCountEl = document.getElementById('missionCount');
        const rewardsCountEl = document.getElementById('rewardsCount');

        if (missionCountEl) missionCountEl.textContent = completedCount;
        if (rewardsCountEl) rewardsCountEl.textContent = rewards;
    }

    /**
     * Update system percentage in info box
     */
    updateSystemPercentage() {
        const progressPercent = this.gameState.getProgressPercentage();
        const systemInfo = document.querySelector('.info-item:nth-child(3)');
        
        if (systemInfo) {
            systemInfo.innerHTML = `<span class="info-label">🌡️</span> Sistema: ${progressPercent}%`;
        }
    }

    /**
     * Update mission badges (checkmarks)
     */
    updateMissionBadges() {
        const completedByType = {};
        const completedMissions = this.gameState.get('completedMissions');

        completedMissions.forEach(subId => {
            const type = subId.charAt(0);
            completedByType[type] = (completedByType[type] || 0) + 1;
        });

        for (let i = 1; i <= 6; i++) {
            const badge = document.getElementById(`badge-${i}`);
            if (badge && completedByType[i] && completedByType[i] === 3) {
                badge.textContent = '✓';
                badge.classList.add('completed');
                badge.parentElement.setAttribute('aria-label', `Misión ${i} completada`);
            }
        }
    }

    /**
     * Update current learning phase
     */
    updateCurrentPhase() {
        const newPhase = this.gameState.calculateCurrentPhase();
        this.gameState.setPhase(newPhase);
    }

    /**
     * Update NOVA message in info box
     */
    updateNOVAMessage() {
        const phase = this.gameState.getPhase();
        const message = this.messageService.getPhaseMessage(phase);
        
        const stateInfo = document.querySelector('.info-item:nth-child(4)');
        if (stateInfo) {
            stateInfo.innerHTML = `<span class="info-label">💭</span> ${message}`;
        }
    }

    /**
     * Show submenu with mission details
     * @param {number} missionId - Mission ID
     * @param {Object} mission - Mission data
     * @param {Function} onSubmissionClick - Callback for submission click
     */
    showSubmenu(missionId, mission, onSubmissionClick) {
        // Store current mission for updates
        this.currentMission = missionId;
        this.currentMissionData = mission;
        this.currentOnSubmissionClick = onSubmissionClick;

        this._renderSubmenu();
    }

    /**
     * Render submenu items (private helper)
     * @private
     */
    _renderSubmenu() {
        const submenu = document.getElementById('submenu');
        const submenuTitle = document.getElementById('submenu-title');
        const submenuItems = document.getElementById('submenuItems');

        if (!submenu || !submenuTitle || !submenuItems || !this.currentMissionData) return;

        // Update submenu
        submenuTitle.textContent = this.currentMissionData.title;
        submenuItems.innerHTML = '';

        // Add instructions if available
        if (this.currentMissionData.instructions) {
            const instructionsEl = document.createElement('div');
            instructionsEl.className = 'submenu-instructions';
            instructionsEl.textContent = this.currentMissionData.instructions;
            submenuItems.appendChild(instructionsEl);
        }

        // Add submission items
        this.currentMissionData.submissions.forEach((sub) => {
            const item = document.createElement('div');
            item.className = 'submenu-item';
            item.setAttribute('data-submission-id', sub.id);

            const isCompleted = this.gameState.isMissionCompleted(sub.id);
            if (isCompleted) {
                item.classList.add('completed');
            }

            item.innerHTML = `
                <div class="submenu-item-title">${sub.name} ${isCompleted ? '✅' : ''}</div>
                <div class="submenu-item-desc">${isCompleted ? 'Completada' : 'Toca para empezar'}</div>
            `;

            item.addEventListener('click', () => {
                if (this.currentOnSubmissionClick) {
                    this.currentOnSubmissionClick(sub.id, this.currentMission);
                }
            });

            submenuItems.appendChild(item);
        });

        submenu.style.display = 'block';
        
        // Scroll to submenu
        setTimeout(() => {
            submenu.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    /**
     * Update specific activity in submenu after completion
     * @param {string} submissionId - Submission ID that was completed
     */
    updateActivityInSubmenu(submissionId) {
        const submenuItems = document.getElementById('submenuItems');
        if (!submenuItems) return;

        // Find the item with matching submission ID
        const item = submenuItems.querySelector(`[data-submission-id="${submissionId}"]`);
        if (!item) return;

        // Update the item
        item.classList.add('completed');
        const titleDiv = item.querySelector('.submenu-item-title');
        const descDiv = item.querySelector('.submenu-item-desc');
        
        if (titleDiv) {
            // Remove old checkmark if exists, add new one
            titleDiv.textContent = titleDiv.textContent.replace(' ✅', '');
            titleDiv.textContent += ' ✅';
        }
        
        if (descDiv) {
            descDiv.textContent = 'Completada';
        }
    }

    /**
     * Update current submenu without closing it
     * @deprecated Use updateActivityInSubmenu instead
     */
    updateCurrentSubmenu() {
        if (this.currentMission && this.currentMissionData) {
            this._renderSubmenu();
        }
    }

    /**
     * Hide submenu
     */
    hideSubmenu() {
        const submenu = document.getElementById('submenu');
        if (submenu) {
            submenu.style.display = 'none';
        }
    }

    /**
     * Update activity modal content
     * @param {Object} submission - Submission data
     * @param {string} phase - Learning phase
     */
    updateActivityModal(submission, phase) {
        // Update title and goal
        const titleEl = document.getElementById('activity-modal-title');
        const goalEl = document.getElementById('activityGoal');

        if (titleEl) titleEl.textContent = submission.name;
        if (goalEl) goalEl.textContent = `🎯 ${submission.learningGoal}`;

        // Render instructions
        this.renderActivityInstructions(submission);

        // Render UDL hints
        this.renderActivityHints(submission);
    }

    /**
     * Render activity instructions
     * @private
     */
    renderActivityInstructions(submission) {
        const instructionsSection = document.getElementById('activityInstructions');
        const instructionsList = document.getElementById('activityInstructionsList');

        if (!instructionsList) return;

        instructionsList.innerHTML = '';

        if (submission.instructions && Array.isArray(submission.instructions)) {
            submission.instructions.forEach(inst => {
                const li = document.createElement('li');
                li.textContent = inst;
                instructionsList.appendChild(li);
            });
            if (instructionsSection) instructionsSection.style.display = 'block';
        } else {
            if (instructionsSection) instructionsSection.style.display = 'none';
        }
    }

    /**
     * Render activity hints (UDL)
     * @private
     */
    renderActivityHints(submission) {
        const hintsSection = document.getElementById('activityHints');
        const hintsList = document.getElementById('activityHintsList');

        if (!hintsList) return;

        hintsList.innerHTML = '';

        if (submission.udlHints && submission.udlHints.length > 0) {
            submission.udlHints.forEach(hint => {
                const li = document.createElement('li');
                li.textContent = hint;
                hintsList.appendChild(li);
            });
            if (hintsSection) hintsSection.style.display = 'block';
        } else {
            if (hintsSection) hintsSection.style.display = 'none';
        }
    }

    /**
     * Show activity feedback
     * @param {string} type - 'correct' or 'incorrect'
     * @param {string} message - Feedback message
     */
    showActivityFeedback(type, message) {
        const feedbackEl = document.getElementById('activityFeedback');
        const feedbackText = document.getElementById('activityFeedbackText');

        if (!feedbackEl || !feedbackText) return;

        feedbackEl.className = 'activity-feedback';
        feedbackEl.classList.add(type === 'correct' ? 'feedback-correct' : 'feedback-incorrect');
        feedbackText.textContent = message;
        feedbackEl.style.display = 'block';

        // Scroll to feedback
        setTimeout(() => {
            feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    /**
     * Hide activity feedback
     */
    hideActivityFeedback() {
        const feedbackEl = document.getElementById('activityFeedback');
        if (feedbackEl) {
            feedbackEl.style.display = 'none';
            feedbackEl.className = 'activity-feedback';
        }
    }

    /**
     * Enable complete button
     */
    enableCompleteButton() {
        const btn = document.getElementById('completeActivityBtn');
        if (btn) {
            btn.disabled = false;
            btn.classList.add('enabled');
        }
    }

    /**
     * Disable complete button
     */
    disableCompleteButton() {
        const btn = document.getElementById('completeActivityBtn');
        if (btn) {
            btn.disabled = true;
            btn.classList.remove('enabled');
        }
    }

    /**
     * Show/hide validate button
     * @param {boolean} show - Whether to show the button
     */
    toggleValidateButton(show) {
        const btn = document.getElementById('validateActivityBtn');
        if (btn) {
            btn.style.display = show ? 'block' : 'none';
        }
    }
}

export default UIController;
