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

        // Setup welcome screen FIRST (displays main menu)
        this.setupWelcomeScreen();

        // Setup cleanup on page unload
        this.setupCleanup();

        console.log('✅ Welcome screen ready. Waiting for player to start mission...');
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

        this.modalController.register(
            'medalAward',
            byId('medalAwardModal'),
            byId('closeMedalAward')
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

        // Add click interaction to NOVA
        const novaSprite = byId('novaSprite');
        if (novaSprite) {
            novaSprite.addEventListener('click', () => {
                this.handleNovaClick();
            });
        }
    }

    /**
     * Handle NOVA click interaction
     */
    handleNovaClick() {
        const animations = ['bounce', 'swing', 'pulse'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        
        this.characterController.setAnimationState(randomAnimation, 1500);
        
        const messages = [
            '¡Hola! 👋',
            '¿Listo para más misiones? 🚀',
            'Cada bit cuenta... 💫',
            '¡Sigamos explorando! 🌟',
            'Tu ayuda es invaluable 💙'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        this.messageService.show(randomMessage, 2500);
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

        // NOVA reacts to mission selection
        this.characterController.bounce();

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

        // NOVA bounce animation when opening activity
        this.characterController.bounce();

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

        // NOVA thinks while validating
        this.characterController.think(1500);

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
            // NOVA celebrates correct answer
            this.characterController.celebrate();
            this.uiController.enableCompleteButton();
        } else {
            // NOVA shakes on incorrect answer
            this.characterController.shake();
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

        // NOVA big celebration on completion
        this.characterController.celebrate();

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

        // Update submenu to mark activity as completed
        this.uiController.updateActivityInSubmenu(activityId);

        // Check and show medal modal if earned
        this.checkAndShowMedalModal();

        // Close modal
        this.modalController.close('activity');

        // Restart auto messages
        this.messageService.startAutoMessages();

        // Check final completion
        this.checkFinalCompletion();
    }

    /**
     * Check if a medal was earned and show modal if applicable
     */
    checkAndShowMedalModal() {
        const completedCount = this.gameState.get('completedMissions').length;
        
        // Medal earned every 3 completions (medals 1-4 for 6 missions)
        if (completedCount % 3 === 0) {
            // Determine which medal (1, 2, 3, or 4)
            const medalId = completedCount / 3;
            
            // Check if already shown this medal's modal
            if (medalId <= 4 && !this.gameState.isMedalModalShown(medalId)) {
                // Mark medal as earned
                this.gameState.addEarnedMedal(medalId);
                
                // Show modal with animation
                this.showMedalAwardModal(medalId);
            }
        }
    }

    /**
     * Show medal award modal
     * @param {number} medalId - Medal ID (1-4)
     */
    showMedalAwardModal(medalId) {
        const medalData = {
            1: {
                title: '🏅 Misión 1 Completada',
                message: '¡Éxito! Has completado la primera misión de reparación.',
                image: 'assets/medallas/m1.png'
            },
            2: {
                title: '🥈 Misión 2 Completada',
                message: '¡Vas bien! Dos misiones reparadas con éxito.',
                image: 'assets/medallas/m2.png'
            },
            3: {
                title: '🥉 Misión 3 Completada',
                message: '¡Increíble! Tres misiones completadas.',
                image: 'assets/medallas/m3.png'
            },
            4: {
                title: '👑 Misión 4 Completada',
                message: '¡MAESTRO! Has completado todas las misiones.',
                image: 'assets/medallas/m4.png'
            }
        };

        const medal = medalData[medalId];
        if (!medal) return;

        // Update modal content
        const titleEl = byId('medal-award-title');
        const messageEl = byId('medalAwardMessage');
        const imgEl = byId('medalAwardImg');
        const progressEl = byId('medalAwardProgress');

        if (titleEl) titleEl.textContent = medal.title;
        if (messageEl) messageEl.textContent = medal.message;
        if (imgEl) imgEl.src = medal.image;
        if (progressEl) progressEl.textContent = `Medallas desbloqueadas: ${medalId}/4`;

        // Show modal with celebration animation
        this.characterController.celebrate();
        
        setTimeout(() => {
            this.modalController.open('medalAward');
            this.gameState.markMedalAsShown(medalId);
            
            // Auto-close after 4 seconds if not interacted
            setTimeout(() => {
                if (this.modalController.isOpen('medalAward')) {
                    this.modalController.close('medalAward');
                }
            }, 4000);
        }, 500);
    }

    /**
     * Check if game is fully completed
     */
    checkFinalCompletion() {
        const finalResult = this.activityService.checkFinalCompletion();
        
        if (finalResult && finalResult.isComplete) {
            // Record end timestamp
            this.gameState.endTime = new Date().toISOString();
            this.gameState.endTimestamp = Date.now();
            
            // Calculate duration
            const durationMs = this.gameState.endTimestamp - (this.gameState.startTimestamp || Date.now());
            const durationMin = Math.floor(durationMs / 60000);
            const durationSec = Math.floor((durationMs % 60000) / 1000);
            
            // Save state
            this.saveState();

            // Populate certificate
            this.populateCertificate(durationMin, durationSec);

            // Show celebration modal
            setTimeout(() => {
                const celebrationModal = byId('celebrationModal');
                if (celebrationModal) {
                    celebrationModal.style.display = 'flex';
                    celebrationModal.setAttribute('aria-hidden', 'false');
                }
            }, 500);

            // Show final message
            setTimeout(() => {
                this.messageService.showProgressMessage('allComplete');
            }, 1000);
        }
    }

    /**
     * Populate certificate with student data and timestamps
     */
    populateCertificate(durationMin, durationSec) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const timeStr = now.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        // Update certificate elements
        byId('certificateName').textContent = 'Estudiante de Clase';
        byId('certificateDate').textContent = dateStr;
        byId('certificateTime').textContent = timeStr;
        byId('certificateDuration').textContent = `${durationMin}m ${durationSec}s`;
        
        const totalPoints = this.gameState.rewards || 0;
        byId('certificatePoints').textContent = totalPoints;
        
        const accuracy = this.gameState.completedMissions.length > 0 ? 
            Math.round((this.gameState.rewards / (this.gameState.completedMissions.length * 20)) * 100) : 100;
        byId('certificatePrecision').textContent = Math.min(accuracy, 100) + '%';

        // Setup download button
        const downloadBtn = byId('downloadCertificateBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadCertificate(dateStr, timeStr, durationMin, durationSec, totalPoints, accuracy);
            });
        }
    }

    /**
     * Download certificate as image or PDF
     */
    downloadCertificate(dateStr, timeStr, durationMin, durationSec, totalPoints, accuracy) {
        const certificateDiv = byId('certificateContainer');
        if (!certificateDiv) return;

        // Create a temporary canvas from HTML
        // Using html2canvas approach (simplified for now)
        const certificateContent = certificateDiv.innerHTML;
        
        // Create a new window with certificate content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Certificado JARVIS - ${new Date().toLocaleDateString()}</title>
                <style>
                    body {
                        font-family: 'Georgia', serif;
                        padding: 2rem;
                        background: #f5f5f5;
                    }
                    .certificate {
                        max-width: 800px;
                        margin: 0 auto;
                        background: linear-gradient(135deg, #f5e6d3 0%, #ffe8c6 100%);
                        border: 4px solid #8b7355;
                        border-radius: 20px;
                        padding: 2rem;
                        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
                        text-align: center;
                    }
                    .cert-header { font-size: 1.5rem; color: #8b4513; margin-bottom: 1.5rem; font-weight: bold; }
                    .cert-title { font-size: 1.4rem; color: #8b4513; margin: 1rem 0; text-decoration: underline; }
                    .cert-body { color: #5a4a3a; line-height: 1.8; margin: 1rem 0; }
                    .cert-details { margin: 1.5rem 0; }
                    .cert-item { margin: 0.5rem 0; }
                    .cert-label { font-weight: 600; color: #8b4513; }
                    .cert-value { color: #5a4a3a; }
                    .cert-footer { margin-top: 2rem; border-top: 2px solid #8b7355; padding-top: 1rem; }
                    .timestamp { font-size: 0.85rem; color: #666; margin-top: 1rem; }
                </style>
            </head>
            <body>
                <div class="certificate">
                    <div class="cert-header">🏆 CERTIFICADO DE FINALIZACIÓN</div>
                    <p class="cert-body">Ha completado exitosamente:</p>
                    <p class="cert-title">Reparación del Sistema JARVIS</p>
                    <p style="font-style: italic; color: #a0522d;">Especificación de Requerimientos de Software</p>
                    
                    <div class="cert-details">
                        <div class="cert-item">
                            <span class="cert-label">📅 Fecha de Finalización:</span>
                            <span class="cert-value">${dateStr}</span>
                        </div>
                        <div class="cert-item">
                            <span class="cert-label">🕐 Hora Exacta:</span>
                            <span class="cert-value">${timeStr}</span>
                        </div>
                        <div class="cert-item">
                            <span class="cert-label">⏱️ Duración de la Misión:</span>
                            <span class="cert-value">${durationMin} minutos ${durationSec} segundos</span>
                        </div>
                        <div class="cert-item">
                            <span class="cert-label">🎯 Puntos Obtenidos:</span>
                            <span class="cert-value">${totalPoints}</span>
                        </div>
                        <div class="cert-item">
                            <span class="cert-label">📊 Precisión:</span>
                            <span class="cert-value">${Math.min(accuracy, 100)}%</span>
                        </div>
                    </div>

                    <p style="font-size: 0.9rem; color: #7a6a5a;">
                        Este certificado verifica que el estudiante completó la misión de reparación del sistema JARVIS 
                        dentro del tiempo de clase establecido.
                    </p>

                    <div class="cert-footer">
                        <p style="margin: 0; font-weight: 600;">Prof. Marcos Argandoña</p>
                        <p style="margin: 0; font-size: 0.9rem;">Ingeniero Informático - Docente</p>
                        <div class="timestamp">
                            <p style="margin: 0.5rem 0 0 0;">Generado: ${new Date().toLocaleString('es-ES')}</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        
        // Open print dialog
        setTimeout(() => {
            printWindow.print();
        }, 250);
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
            
            // Set character controller reference for animations
            this.messageService.setCharacterController(this.characterController);
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
     * Setup accessibility enhancements
     */
    setupAccessibility() {
        // Update audio button visual state
        const audioBtn = byId('toggleAudio');
        if (audioBtn) {
            audioBtn.style.opacity = this.audioService.isEnabled() ? '1' : '0.5';
            audioBtn.style.transition = 'opacity 0.3s ease';
        }

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

    /**
     * Setup welcome screen and transition to game
     */
    setupWelcomeScreen() {
        const welcomeScreen = byId('welcomeScreen');
        const gameContainer = byId('gameContainer');
        const startBtn = byId('startMissionBtn');
        const instructionsBtn = byId('instructionsBtn');
        const creditsBtn = byId('creditsBtn');
        const instructionsModal = byId('instructionsModal');
        const creditsModal = byId('creditsModal');
        const closeInstructionsBtn = byId('closeInstructions');
        const closeCreditsBtn = byId('closeCredits');

        if (!welcomeScreen || !startBtn) {
            console.warn('Welcome screen elements not found');
            return;
        }

        // Store start time when mission begins
        startBtn.addEventListener('click', () => {
            console.log('🎮 Starting mission...');
            
            // Record start timestamp
            this.gameState.startTime = new Date().toISOString();
            this.gameState.startTimestamp = Date.now();
            
            // Hide welcome screen
            welcomeScreen.style.display = 'none';
            gameContainer.style.display = 'block';
            
            // Initialize the rest of the game
            // This will be called after welcome screen disappears
            this.initGameUI();
            
            console.log('✅ Mission started at', this.gameState.startTime);
        });

        // Instructions modal
        if (instructionsBtn && instructionsModal && closeInstructionsBtn) {
            instructionsBtn.addEventListener('click', () => {
                console.log('📖 Opening instructions...');
                instructionsModal.classList.add('active');
                instructionsModal.setAttribute('aria-hidden', 'false');
            });

            closeInstructionsBtn.addEventListener('click', () => {
                console.log('📖 Closing instructions...');
                instructionsModal.classList.remove('active');
                instructionsModal.setAttribute('aria-hidden', 'true');
            });

            // Close on background click
            instructionsModal.addEventListener('click', (e) => {
                if (e.target === instructionsModal) {
                    instructionsModal.classList.remove('active');
                    instructionsModal.setAttribute('aria-hidden', 'true');
                }
            });
        } else {
            console.warn('⚠️ Instructions button/modal elements not found');
        }

        // Credits modal
        if (creditsBtn && creditsModal && closeCreditsBtn) {
            creditsBtn.addEventListener('click', () => {
                console.log('⭐ Opening credits...');
                creditsModal.classList.add('active');
                creditsModal.setAttribute('aria-hidden', 'false');
            });

            closeCreditsBtn.addEventListener('click', () => {
                console.log('⭐ Closing credits...');
                creditsModal.classList.remove('active');
                creditsModal.setAttribute('aria-hidden', 'true');
            });

            // Close on background click
            creditsModal.addEventListener('click', (e) => {
                if (e.target === creditsModal) {
                    creditsModal.classList.remove('active');
                    creditsModal.setAttribute('aria-hidden', 'true');
                }
            });
        } else {
            console.warn('⚠️ Credits button/modal elements not found');
        }
    }

    /**
     * Initialize game UI (called after welcome screen)
     */
    initGameUI() {
        this.setupModals();
        this.modalController.setupAudioButtons();
        this.setupCharacter();
        this.setupBackground();
        this.setupMissionButtons();
        this.setupMessageSystem();
        this.setupActivityModal();
        this.setupMuteToggle();
        this.setupAccessibility();
        this.uiController.updateAll();
        this.messageService.startAutoMessages();
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
