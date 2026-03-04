# 🔧 PLAN DE SOLUCIONES - Implementación

---

## SOLUCIÓN 1: Actualizar badges cuando se completa la misión

### Cambio en: `js/ui/UIController.js`

**Problema:** El badge se actualiza pero sin visibilidad clara ni animación

**Solución:** 
1. Agregar animación CSS
2. Asegurar que el badge se vea claramente como completado
3. Forzar re-render del DOM

```javascript
// REEMPLAZAR método updateMissionBadges()
updateMissionBadges() {
    const completedByType = {};
    const completedMissions = this.gameState.get('completedMissions');

    completedMissions.forEach(subId => {
        const type = subId.charAt(0);
        completedByType[type] = (completedByType[type] || 0) + 1;
    });

    for (let i = 1; i <= 6; i++) {
        const badge = document.getElementById(`badge-${i}`);
        if (!badge) continue;

        if (completedByType[i] && completedByType[i] === 3) {
            // Actualizar contenido
            badge.textContent = '✓';
            badge.classList.add('completed');
            
            // Forzar re-render y agregar animación
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'badgePulse 0.6s ease-out';
            }, 10);
            
            // Actualizar aria-label para accesibilidad
            badge.parentElement.setAttribute('aria-label', `Misión ${i} completada`);
        }
    }
}
```

### CSS a agregar en `styles.css`

```css
/* Badge completion animation */
@keyframes badgePulse {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Ensure badge is visually clear when completed */
.mission-badge.completed {
    background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.4);
}

.mission-badge.completed em {
    display: none;
}
```

---

## SOLUCIÓN 2: Mostrar check en submenu automáticamente

### Cambio en: `js/ui/UIController.js`

**Problema:** El selector querySelector falla cuando el elemento no está visible

**Solución:** 
1. Re-renderizar el submenu actual después de completar
2. O actualizar el elemento de forma más robusta
3. Garantizar que el submenu esté actualizado

```javascript
// REEMPLAZAR método updateActivityInSubmenu()
updateActivityInSubmenu(submissionId) {
    const submenuItems = document.getElementById('submenuItems');
    if (!submenuItems) return;

    // Find the item with matching submission ID
    const item = submenuItems.querySelector(`[data-submission-id="${submissionId}"]`);
    
    // Si el elemento no existe, re-renderizar todo el submenu
    if (!item) {
        // El submenu no está visible o fue cerrado, re-renderizar si hay misión activa
        if (this.currentMission && this.currentMissionData) {
            this._renderSubmenu();
        }
        return;
    }

    // Update the item with animation
    item.classList.add('completed');
    
    const titleDiv = item.querySelector('.submenu-item-title');
    const descDiv = item.querySelector('.submenu-item-desc');
    
    if (titleDiv) {
        // Remover checkmark anterior si existe
        titleDiv.textContent = titleDiv.textContent.replace(' ✅', '');
        // Agregar checkmark nuevo
        titleDiv.textContent += ' ✅';
    }
    
    if (descDiv) {
        descDiv.textContent = 'Completada';
    }

    // Agregar animación visual
    item.style.animation = 'slideIn 0.4s ease-out';
    
    // Highlight temporal para feedback visual
    item.style.backgroundColor = 'rgba(74, 222, 128, 0.2)';
    setTimeout(() => {
        item.style.backgroundColor = '';
    }, 2000);
}
```

### CSS adicional en `styles.css`

```css
/* Animation for completed items */
@keyframes slideIn {
    0% {
        opacity: 0.7;
        transform: translateX(-5px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.submenu-item.completed {
    opacity: 0.75;
    background: rgba(74, 222, 128, 0.05);
}

.submenu-item.completed .submenu-item-desc {
    color: #4ade80;
    font-weight: 500;
}
```

---

## SOLUCIÓN 3: Implementar sistema de medallas

### Cambios en: `js/models/GameState.js`

Agregar variables para rastrear medallas:

```javascript
// En el constructor, agregar a this.state:
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
    readingMode: false,
    startTime: null,
    startTimestamp: null,
    endTime: null,
    endTimestamp: null,
    // 🆕 AGREGAR ESTO:
    earnedMedals: [],           // [1, 2, 3, 4] - medallas conseguidas
    medalDates: {},             // { '1': timestamp, '2': timestamp, ... }
    medalsShown: []             // Medallas cuyo modal ya se mostró
};

// Agregar método para reportar medalla ganada:
/**
 * Add earned medal
 * @param {number} medalId - Medal ID (1-4)
 */
addEarnedMedal(medalId) {
    if (!this.state.earnedMedals.includes(medalId)) {
        this.state.earnedMedals.push(medalId);
        this.state.medalDates[medalId] = Date.now();
    }
}

/**
 * Check if medal earned
 * @param {number} medalId - Medal ID
 * @returns {boolean}
 */
hasMedal(medalId) {
    return this.state.earnedMedals.includes(medalId);
}

/**
 * Mark medal as shown
 * @param {number} medalId - Medal ID
 */
markMedalAsShown(medalId) {
    if (!this.state.medalsShown.includes(medalId)) {
        this.state.medalsShown.push(medalId);
    }
}

/**
 * Check if medal's modal was already shown
 * @param {number} medalId - Medal ID
 * @returns {boolean}
 */
isMedalModalShown(medalId) {
    return this.state.medalsShown.includes(medalId);
}
```

### Cambios en: `js/ui/ModalController.js`

Registrar el modal de medallas:

```javascript
// En el método init (debe ser llamado después de setupModals en app.js):
register('medalAward', byId('medalAwardModal'), byId('closeMedalAward'));
```

### Cambios en: `js/app.js`

Abrir el modal cuando se gane medalla:

```javascript
// EN handleActivityComplete(), después de updateActivityInSubmenu():

// Nuevo: Check if medal earned (every 3 completed activities)
this.checkAndShowMedalModal();

// ...resto del código...
```

Agregar nuevo método a la clase NOVAGame:

```javascript
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
```

### Cambio en setupModals() en `js/app.js`

Agregar registro del modal de medallas:

```javascript
setupModals() {
    // ... código existente ...

    // Agregar NUEVA línea:
    this.modalController.register(
        'medalAward',
        byId('medalAwardModal'),
        byId('closeMedalAward')
    );

    // ... resto del código ...
}
```

---

## ORDEN DE IMPLEMENTACIÓN

1. ✅ Actualizar `GameState.js` - agregar variables de medallas
2. ✅ Actualizar `ModalController.js` - registrar modal de medallas
3. ✅ Actualizar `UIController.js` - mejorar updateMissionBadges() y updateActivityInSubmenu()
4. ✅ Actualizar `app.js` - agregar checkAndShowMedalModal() y showMedalAwardModal()
5. ✅ Actualizar `styles.css` - agregar animaciones
6. ✅ Actualizar setupModals() en `app.js` - registrar modal de medallas

---

## TESTING

Después de implementar, verificar:

1. **Problema 1:** Completar 3 actividades de una misión → El badge debe mostrar ✓ con animación
2. **Problema 2:** Completar una actividad → El check debe aparecer inmediatamente en el submenu
3. **Problema 3:** Completar 3 actividades (1 medalla) → Debe aparecer modal de medalla con:
   - Título correcto
   - Imagen de medalla
   - Mensaje de felicitación
   - Contador de medallas (1/4, 2/4, etc)

