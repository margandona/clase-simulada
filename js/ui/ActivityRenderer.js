/**
 * @file ActivityRenderer.js
 * @description Renders different types of activities in the modal
 * @module ui/ActivityRenderer
 */

import GameState from '../models/GameState.js';

/**
 * ActivityRenderer class - Handles activity UI rendering
 * @class
 */
class ActivityRenderer {
    /**
     * Constructor
     * @param {AudioService} audioService - Audio service for TTS
     */
    constructor(audioService = null) {
        this.gameState = GameState.getInstance();
        this.audioService = audioService;
    }

    /**
     * Render activity content based on type
     * @param {Object} submission - Submission data
     * @param {HTMLElement} container - Container element
     * @param {Object} callbacks - Callback functions (onValidate, onComplete)
     */
    render(submission, container, callbacks = {}) {
        container.innerHTML = '';

        const renderers = {
            'quiz': this.renderQuiz.bind(this),
            'classification': this.renderClassification.bind(this),
            'checklist': this.renderChecklist.bind(this),
            'padlet': this.renderPadlet.bind(this),
            'confirmation': this.renderConfirmation.bind(this),
            'verification': this.renderVerification.bind(this),
            'action': this.renderAction.bind(this),
            'celebration': this.renderCelebration.bind(this)
        };

        const renderer = renderers[submission.toolType];
        if (renderer) {
            renderer(submission, container, callbacks);
        } else {
            container.innerHTML = '<p>Actividad en desarrollo.</p>';
        }
    }

    /**
     * Render quiz activity
     * @private
     */
    renderQuiz(submission, container, callbacks) {
        const audioBtn = this.audioService ? `<button class="audio-play-btn" type="button" title="Escuchar pregunta">🔊</button>` : '';

        const html = `
            <div class="activity-quiz">
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <p class="activity-question" style="flex: 1;"><strong>${submission.question}</strong></p>
                    ${audioBtn}
                </div>
                <div class="quiz-options" id="quizOptions">
                    ${submission.options.map((opt, i) => `
                        <label class="quiz-option">
                            <input type="radio" name="quiz-answer" value="${i}" data-correct="${opt.correct}">
                            <span>${opt.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;

        // Setup audio button
        if (this.audioService) {
            const audioBtn = container.querySelector('.audio-play-btn');
            if (audioBtn) {
                audioBtn.addEventListener('click', () => {
                    const text = submission.question;
                    if (this.audioService.isPlaying_status()) {
                        this.audioService.stop();
                        audioBtn.textContent = '🔊';
                    } else {
                        this.audioService.speak(text, () => {
                            audioBtn.textContent = '🔊';
                        });
                        audioBtn.textContent = '⏹️';
                    }
                });
            }
        }

        // Setup event listeners
        const options = container.querySelectorAll('input[type="radio"]');
        options.forEach(opt => {
            opt.addEventListener('change', () => {
                this.gameState.trackInteraction(this.gameState.get('currentActivity'), 'selected-option');
                if (callbacks.onSelectionChange) {
                    callbacks.onSelectionChange();
                }
            });
        });
    }

    /**
     * Render classification activity
     * @private
     */
    renderClassification(submission, container, callbacks) {
        const audioBtn = this.audioService ? `<button class="audio-play-btn" type="button" title="Escuchar pregunta">🔊</button>` : '';

        const html = `
            <div class="activity-classification">
                <div class="classification-example">
                    <p><strong>📌 Ejemplo:</strong></p>
                    <blockquote>${submission.example}</blockquote>
                </div>
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <p class="activity-question" style="flex: 1;"><strong>${submission.question}</strong></p>
                    ${audioBtn}
                </div>
                ${submission.hint ? `<p class="classification-hint">💡 ${submission.hint}</p>` : ''}
                <div class="classification-options">
                    <button class="classification-btn" data-answer="function" type="button">
                        🔧 FUNCIÓN<br><small>(lo que hace)</small>
                    </button>
                    <button class="classification-btn" data-answer="condition" type="button">
                        📋 CONDICIÓN<br><small>(lo que necesita)</small>
                    </button>
                </div>
            </div>
        `;
        container.innerHTML = html;

        // Setup audio button
        if (this.audioService) {
            const audioBtnEl = container.querySelector('.audio-play-btn');
            if (audioBtnEl) {
                audioBtnEl.addEventListener('click', () => {
                    const text = submission.question;
                    if (this.audioService.isPlaying_status()) {
                        this.audioService.stop();
                        audioBtnEl.textContent = '🔊';
                    } else {
                        this.audioService.speak(text, () => {
                            audioBtnEl.textContent = '🔊';
                        });
                        audioBtnEl.textContent = '⏹️';
                    }
                });
            }
        }

        // Setup event listeners
        const buttons = container.querySelectorAll('.classification-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.gameState.trackInteraction(this.gameState.get('currentActivity'), 'classified');
                if (callbacks.onSelectionChange) {
                    callbacks.onSelectionChange();
                }
            });
        });
    }

    /**
     * Render checklist activity
     * @private
     */
    renderChecklist(submission, container, callbacks) {
        const html = `
            <div class="activity-checklist">
                <p class="activity-question"><strong>${submission.question}</strong></p>
                <div class="checklist-items">
                    ${submission.checklistItems.map((item, i) => `
                        <label class="checklist-item">
                            <input type="checkbox" value="${item.value}" data-index="${i}">
                            <span>${item.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;

        // Setup event listeners
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                this.gameState.trackInteraction(this.gameState.get('currentActivity'), 'checked-item');
                if (callbacks.onSelectionChange) {
                    callbacks.onSelectionChange();
                }
            });
        });
    }

    /**
     * Render Padlet activity
     * @private
     */
    renderPadlet(submission, container, callbacks) {
        const isProd = submission.embedUrl && !submission.embedUrl.includes('DOCENTE');

        const html = `
            <div class="activity-padlet">
                ${submission.instructions ? `
                    <div class="padlet-instructions">
                        <h4>📝 Instrucciones:</h4>
                        <ul>
                            ${submission.instructions.map(inst => `<li>${inst}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${isProd ? `
                    <div class="padlet-embed">
                        <iframe src="${submission.embedUrl}" width="100%" height="400" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
                    </div>
                ` : `
                    <div class="padlet-placeholder">
                        <p><strong>🔧 Configuración para Docente:</strong></p>
                        <p>Pega tu URL de Padlet en <code>js/data/missions.js</code>, línea correspondiente a la misión 5a.</p>
                        <p><em>Mientras tanto, se abrirá en nueva ventana.</em></p>
                        <a href="https://padlet.com" target="_blank" class="padlet-link-btn" id="openPadletBtn">
                            🌐 Abrir Padlet
                        </a>
                    </div>
                `}
            </div>
        `;
        container.innerHTML = html;

        // Setup event listeners
        const openBtn = container.querySelector('#openPadletBtn');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                this.gameState.trackInteraction(this.gameState.get('currentActivity'), 'opened-padlet');
                setTimeout(() => {
                    if (callbacks.onComplete) {
                        callbacks.onComplete();
                    }
                }, 2000);
            });
        } else if (isProd) {
            // If embedded, enable after 5 seconds
            setTimeout(() => {
                if (callbacks.onComplete) {
                    callbacks.onComplete();
                }
            }, 5000);
        }
    }

    /**
     * Render confirmation activity
     * @private
     */
    renderConfirmation(submission, container, callbacks) {
        const html = `
            <div class="activity-confirmation">
                <p class="activity-question"><strong>${submission.question}</strong></p>
                <button class="confirm-btn" id="confirmActionBtn" type="button">
                    ✅ ${submission.confirmText}
                </button>
            </div>
        `;
        container.innerHTML = html;

        container.querySelector('#confirmActionBtn').addEventListener('click', () => {
            this.gameState.trackInteraction(this.gameState.get('currentActivity'), 'confirmed');
            if (callbacks.onComplete) {
                callbacks.onComplete();
            }
            if (callbacks.onFeedback) {
                callbacks.onFeedback('correct', submission.feedback.correct);
            }
        });
    }

    /**
     * Render verification activity
     * @private
     */
    renderVerification(submission, container, callbacks) {
        const html = `
            <div class="activity-verification">
                <p class="activity-question"><strong>${submission.question}</strong></p>
                <button class="verify-btn" id="verifyBtn" type="button">
                    ✓ Sí, verifico
                </button>
            </div>
        `;
        container.innerHTML = html;

        container.querySelector('#verifyBtn').addEventListener('click', () => {
            this.gameState.trackInteraction(this.gameState.get('currentActivity'), 'verified');
            if (callbacks.onComplete) {
                callbacks.onComplete();
            }
            if (callbacks.onFeedback) {
                callbacks.onFeedback('correct', submission.feedback.correct);
            }
        });
    }

    /**
     * Render action activity
     * @private
     */
    renderAction(submission, container, callbacks) {
        let canProceed = true;
        if (submission.requiresPrevious) {
            canProceed = this.gameState.isMissionCompleted(submission.requiresPrevious);
        }

        const html = `
            <div class="activity-action">
                <p class="activity-question"><strong>${submission.question}</strong></p>
                ${!canProceed ? `
                    <p class="action-warning">⚠️ Completa la actividad anterior primero (Verificar sistema)</p>
                ` : ''}
                <button class="action-btn ${!canProceed ? 'disabled' : ''}" id="actionBtn" type="button" ${!canProceed ? 'disabled' : ''}>
                    ${submission.actionLabel}
                </button>
            </div>
        `;
        container.innerHTML = html;

        if (canProceed) {
            container.querySelector('#actionBtn').addEventListener('click', () => {
                this.gameState.trackInteraction(this.gameState.get('currentActivity'), 'action-executed');
                if (callbacks.onComplete) {
                    callbacks.onComplete();
                }
                if (callbacks.onFeedback) {
                    callbacks.onFeedback('correct', submission.feedback.correct);
                }
            });
        }
    }

    /**
     * Render celebration activity
     * @private
     */
    renderCelebration(submission, container, callbacks) {
        const html = `
            <div class="activity-celebration">
                <div class="celebration-content">
                    <div class="celebration-emoji">🎉</div>
                    <h3>¡Misión Cumplida!</h3>
                    <p>Has completado todas las actividades.</p>
                    <p><strong>🏆 Puntos totales: ${this.gameState.getRewards() + 10}</strong></p>
                    <p>💭 NOVA: "${submission.novaMessage}"</p>
                </div>
            </div>
        `;
        container.innerHTML = html;

        // Auto-enable complete button
        setTimeout(() => {
            if (callbacks.onComplete) {
                callbacks.onComplete();
            }
        }, 1000);
    }
}

export default ActivityRenderer;
