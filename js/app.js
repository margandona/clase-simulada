/**
 * @file app.js
 * @description Main application entry point - coordinates all modules
 * @module app
 */

import GameState from './models/GameState.js';
import StorageService from './services/StorageService.js';
import MessageService from './services/MessageService.js';
import ActivityService from './services/ActivityService.js';
import AudioService from './services/AudioService.js';
import ModalController from './ui/ModalController.js';
import CharacterController from './ui/CharacterController.js';
import ActivityRenderer from './ui/ActivityRenderer.js';
import UIController from './ui/UIController.js';
import BackgroundController from './ui/BackgroundController.js';
import { setupKeyboardNavigation, setupTouchEnhancements } from './utils/helpers.js';
import { byId, $$ } from './utils/dom.js';

/**
 * NOVAGame class - Main application controller
 * @class
 */
class NOVAGame {
    /**
     * Constructor
     */
    constructor() {
        // Initialize core services
        this.gameState = GameState.getInstance();
        this.messageService = new MessageService();
        this.activityService = new ActivityService();
        this.audioService = new AudioService();
        
        // Initialize UI controllers
        this.modalController = new ModalController(this.audioService);
        this.characterController = new CharacterController();
        this.activityRenderer = new ActivityRenderer(this.audioService);
        this.uiController = new UIController(this.messageService);
        this.backgroundController = new BackgroundController();

        // Bind methods
        this.handleMissionClick = this.handleMissionClick.bind(this);
        this.handleSubmissionClick = this.handleSubmissionClick.bind(this);
        this.handleActivityValidate = this.handleActivityValidate.bind(this);
        this.handleActivityComplete = this.handleActivityComplete.bind(this);
    }

    /**
     * Initialize application
     */
    init() {
        console.log('🚀 Initializing NOVA Game...');

        // Load saved state
        this.loadState();

        // Setup UI components
        console.log('📋 Setting up modals...');
        this.setupModals();
        
        console.log('🎵 About to setup audio buttons...');
        console.log('   - modalController exists:', !!this.modalController);
        console.log('   - audioService exists:', !!this.audioService);
        this.modalController.setupAudioButtons(); // Setup audio buttons AFTER registering modals
        console.log('✅ Audio buttons setup complete');
        
        this.setupCharacter();
        this.setupBackground();
        this.setupMissionButtons();
        this.setupMessageSystem();
        this.setupActivityModal();
        this.setupMuteToggle();

        // Setup accessibility enhancements
        this.setupAccessibility();

        // Initial UI update
        this.uiController.updateAll();

        // Start auto messages
        this.messageService.startAutoMessages();

        // Setup cleanup on page unload
        this.setupCleanup();

        console.log('✅ NOVA Game initialized successfully');
    }

    /**
     * Load state from storage
     */
    loadState() {
        const savedState = StorageService.load();
        if (savedState) {
            this.gameState.update(savedState);
            console.log('📦 State loaded from storage');
        }
    }

    /**
     * Save state to storage
     */
    saveState() {
        const state = this.gameState.getState();
        StorageService.save(state);
    }

    /**
     * Setup modal system
     */
    setupModals() {
        // Register modals
        this.modalController.register(
            'story',
            byId('storyModal'),
            byId('closeStory')
        );

        this.modalController.register(
            'concepts',
            byId('conceptsModal'),
            byId('closeConcepts')
        );

        this.modalController.register(
            'mission',
            byId('missionModal'),
            byId('closeMission')
        );

        this.modalController.register(
            'activity',
            byId('activityModal'),
            byId('closeActivity')
        );

        // Setup modal triggers
        byId('storyBtn')?.addEventListener('click', () => {
            this.modalController.open('story');
        });

        byId('conceptsBtn')?.addEventListener('click', () => {
            this.modalController.open('concepts');
            this.messageService.show("💡 Estos conceptos son clave para ayudar a NOVA.", 3000);
        });
    }

    /**
     * Setup character animation
     */
    setupCharacter() {
        const frames = $$('.character-frame');
        if (frames.length > 0) {
            this.characterController.initialize(frames);
        }
    }

    /**
     * Setup dynamic backgrounds
     */
    setupBackground() {
        this.backgroundController.init();
    }

    /**
     * Setup mission buttons
     */
    setupMissionButtons() {
        // Status button
        byId('mission-status-btn')?.addEventListener('click', () => {
            const completedCount = this.gameState.getCompletedMissionsCount();
            const progressPercent = this.gameState.getProgressPercentage();
            const rewards = this.gameState.getRewards();
            
            alert(
                `⭐ Progreso: ${completedCount}/6 misiones\n` +
                `📊 Sistema: ${progressPercent}%\n` +
                `🏆 Puntos: ${rewards}`
            );
        });

        // Mission buttons (1-6)
        for (let i = 1; i <= 6; i++) {
            const btn = byId(`mission-${i}-btn`);
            if (btn) {
                btn.addEventListener('click', () => this.handleMissionClick(i));
            }
        }

        // Close submenu button
        byId('closeSubmenu')?.addEventListener('click', () => {
            this.uiController.hideSubmenu();
        });
    }

    /**
     * Handle mission button click
     * @param {number} missionId - Mission ID
     */
    handleMissionClick(missionId) {
        const mission = this.activityService.getMission(missionId);
        if (!mission) {
            console.error('Mission not found:', missionId);
            return;
        }

        this.uiController.showSubmenu(missionId, mission, this.handleSubmissionClick);
    }

    /**
     * Handle submission click from submenu
     * @param {string} submissionId - Submission ID
     * @param {number} missionId - Mission ID
     */
    handleSubmissionClick(submissionId, missionId) {
        // Check if can open
        const canOpen = this.activityService.canOpenActivity(submissionId);
        if (!canOpen.canOpen) {
            alert(canOpen.reason);
            return;
        }

        // Get submission data
        const submission = this.activityService.getSubmission(submissionId);
        if (!submission) {
            console.error('Submission not found:', submissionId);
            return;
        }

        // Initialize activity
        this.activityService.initializeActivity(submissionId);

        // Get mission for phase info
        const mission = this.activityService.getMission(missionId);

        // Update modal UI
        this.uiController.updateActivityModal(submission, mission.phase);

        // Reset feedback and buttons
        this.uiController.hideActivityFeedback();
        this.uiController.disableCompleteButton();
        this.uiController.toggleValidateButton(false);

        // Render activity content
        const contentContainer = byId('activityContent');
        if (contentContainer) {
            this.activityRenderer.render(submission, contentContainer, {
                onSelectionChange: () => {
                    this.uiController.hideActivityFeedback();
                    this.uiController.toggleValidateButton(true);
                },
                onComplete: () => {
                    this.uiController.enableCompleteButton();
                },
                onFeedback: (type, message) => {
                    this.uiController.showActivityFeedback(type, message);
                }
            });
        }

        // Open modal
        this.modalController.open('activity');

        // Show NOVA message
        if (submission.novaMessage) {
            setTimeout(() => {
                this.messageService.show(`💭 NOVA: "${submission.novaMessage}"`, 4000);
            }, 800);
        }
    }

    /**
     * Setup activity modal
     */
    setupActivityModal() {
        // Cancel button
        byId('cancelActivityBtn')?.addEventListener('click', () => {
            this.modalController.close('activity');
        });

        // Validate button
        byId('validateActivityBtn')?.addEventListener('click', () => {
            this.handleActivityValidate();
        });

        // Complete button
        byId('completeActivityBtn')?.addEventListener('click', () => {
            this.handleActivityComplete();
        });

        // UDL Controls
        byId('toggleReadingMode')?.addEventListener('click', () => {
            const readingMode = !this.gameState.get('readingMode');
            this.gameState.set('readingMode', readingMode);
            
            const modalContent = document.querySelector('.activity-modal-content');
            modalContent?.classList.toggle('reading-mode', readingMode);
            
            const icon = byId('readingModeIcon');
            if (icon) icon.textContent = readingMode ? '📘' : '📖';
        });

        byId('toggleAudio')?.addEventListener('click', () => {
            const isEnabled = this.audioService.toggle();
            const icon = byId('toggleAudio');
            if (icon) {
                icon.style.opacity = isEnabled ? '1' : '0.5';
                this.messageService.show(
                    isEnabled ? '🔊 Audio activado' : '🔇 Audio desactivado', 
                    2000
                );
            }
        });
    }

    /**
     * Handle activity validation
     */
    handleActivityValidate() {
        const activityId = this.gameState.get('currentActivity');
        if (!activityId) return;

        const container = byId('activityContent');
        if (!container) return;

        const result = this.activityService.validateActivity(activityId, container);

        if (!result.isValid) {
            this.uiController.showActivityFeedback('incorrect', result.message);
            return;
        }

        this.uiController.showActivityFeedback(
            result.isCorrect ? 'correct' : 'incorrect',
            result.message
        );

        if (result.isCorrect) {
            this.uiController.enableCompleteButton();
        }
    }

    /**
     * Handle activity completion
     */
    handleActivityComplete() {
        const activityId = this.gameState.get('currentActivity');
        if (!activityId) return;

        const result = this.activityService.completeActivity(activityId);

        if (!result.success) {
            alert(result.message);
            return;
        }

        // Show completion message
        this.messageService.show(
            `✅ ¡Completado!\n📍 ${result.submission.name}\n🏆 +${result.rewards} puntos`,
            4000
        );

        // Show NOVA message
        if (result.novaMessage) {
            setTimeout(() => {
                this.messageService.show(`💭 NOVA: "${result.novaMessage}"`, 4000);
            }, 2000);
        }

        // Show progress messages
        result.progressMessages.forEach(msg => {
            setTimeout(() => {
                this.messageService.showProgressMessage(msg.key);
            }, msg.delay);
        });

        // Save state
        this.saveState();

        // Update UI
        this.uiController.updateAll();

        // Update mission background
        this.backgroundController.updateBackground();

        // Close modal and submenu
        this.modalController.close('activity');
        this.uiController.hideSubmenu();

        // Restart auto messages
        this.messageService.startAutoMessages();

        // Check final completion
        this.checkFinalCompletion();
    }

    /**
     * Check if game is fully completed
     */
    checkFinalCompletion() {
        const finalResult = this.activityService.checkFinalCompletion();
        
        if (finalResult && finalResult.isComplete) {
            // Save state
            this.saveState();

            // Show final message
            setTimeout(() => {
                this.messageService.showProgressMessage('allComplete');
            }, 1000);

            setTimeout(() => {
                alert(finalResult.message);
            }, 2500);
        }
    }

    /**
     * Setup message system
     */
    setupMessageSystem() {
        const toast = byId('novaMessageToast');
        const text = byId('novaMessageText');
        const closeBtn = byId('novaMessageClose');

        if (toast && text && closeBtn) {
            this.messageService.initialize(toast, text, closeBtn, this.audioService);
        }
    }

    /**
     * Setup mute toggle
     */
    setupMuteToggle() {
        const muteBtn = byId('muteToggleBtn');
        const muteIcon = byId('muteIcon');

        if (!muteBtn || !muteIcon) return;

        // Update icon on load
        const isMuted = this.gameState.get('messagesMuted');
        muteIcon.textContent = isMuted ? '🔕' : '🔔';
        muteBtn.setAttribute(
            'aria-label',
            isMuted ? 'Activar mensajes automáticos' : 'Silenciar mensajes automáticos'
        );

        // Handle click
        muteBtn.addEventListener('click', () => {
            const newMuteState = this.messageService.toggleMute();
            muteIcon.textContent = newMuteState ? '🔕' : '🔔';
            muteBtn.setAttribute(
                'aria-label',
                newMuteState ? 'Activar mensajes automáticos' : 'Silenciar mensajes automáticos'
            );
            this.saveState();
        });
    }

    /**

        // Update audio button visual state
        const audioBtn = byId('toggleAudio');
        if (audioBtn) {
            audioBtn.style.opacity = this.audioService.isEnabled() ? '1' : '0.5';
            audioBtn.style.transition = 'opacity 0.3s ease';
        }
     * Setup accessibility enhancements
     */
    setupAccessibility() {
            this.audioService.stop();
        // Keyboard navigation
        const buttons = $$('button');
        setupKeyboardNavigation(buttons);

        // Touch enhancements
        setupTouchEnhancements(buttons);
    }

    /**
     * Setup cleanup on page unload
     */
    setupCleanup() {
        window.addEventListener('beforeunload', () => {
            this.saveState();
            this.characterController.destroy();
            this.messageService.stopAutoMessages();
        });
    }
}

/**
 * Initialize application when DOM is ready
 */
function initializeApp() {
    const game = new NOVAGame();
    game.init();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for debugging
export default NOVAGame;
