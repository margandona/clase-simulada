/**
 * @file scroll-memory.js
 * @description Sistema global de memoria de posición de scroll para todas las páginas
 * Guarda y restaura automáticamente la posición de scroll en cada página
 * @version 1.0
 */

(function() {
    'use strict';

    const CONFIG = {
        STORAGE_KEY: 'pageScrollPosition',
        SAVE_INTERVAL: 500, // milisegundos
        RESTORE_DELAY: 100, // milisegundos
        DEBUG: true
    };

    let isRestoringScroll = false;

    /**
     * Registrar mensaje en consola si DEBUG está activado
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo: 'info', 'success', 'warning', 'error'
     */
    function log(message, type = 'info') {
        if (!CONFIG.DEBUG) return;
        
        const icons = {
            info: '📍',
            success: '✅',
            warning: '⚠️',
            error: '❌',
            save: '💾'
        };
        
        const icon = icons[type] || '•';
        console.log(`${icon} [ScrollMemory] ${message}`);
    }

    /**
     * Restaurar la posición de scroll guardada
     */
    function restoreScrollPosition() {
        isRestoringScroll = true;
        
        const saved = sessionStorage.getItem(CONFIG.STORAGE_KEY);
        if (saved) {
            const position = parseInt(saved, 10);
            log(`Restaurando scroll a posición: ${position}px`, 'info');
            
            // Restaurar en varios momentos para garantizar que funcione
            setTimeout(() => {
                window.scrollTo(0, position);
                log(`Scroll restaurado correctamente a: ${window.scrollY}px`, 'success');
            }, CONFIG.RESTORE_DELAY);
        } else {
            log('No hay posición guardada previamente', 'warning');
        }
        
        isRestoringScroll = false;
    }

    /**
     * Guardar la posición actual de scroll
     */
    function saveScrollPosition() {
        if (!isRestoringScroll) {
            const position = window.scrollY;
            sessionStorage.setItem(CONFIG.STORAGE_KEY, position.toString());
        }
    }

    /**
     * Inicializar el sistema
     */
    function init() {
        log('Inicializando sistema de memoria de posición...', 'info');

        // Guardar posición periodicamente
        setInterval(saveScrollPosition, CONFIG.SAVE_INTERVAL);

        // Guardar posición antes de salir
        window.addEventListener('beforeunload', () => {
            const position = window.scrollY;
            sessionStorage.setItem(CONFIG.STORAGE_KEY, position.toString());
            log(`Posición guardada antes de salir: ${position}px`, 'save');
        });

        // Guardar posición al hacer click en links internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                const position = window.scrollY;
                sessionStorage.setItem(CONFIG.STORAGE_KEY, position.toString());
                log(`Posición guardada antes de navegar: ${position}px`, 'save');
            }
        });

        // Restaurar al cargar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', restoreScrollPosition);
        } else {
            restoreScrollPosition();
        }

        log('Sistema de Memoria de Posición Activado', 'success');
    }

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exponer API global si es necesario
    window.ScrollMemory = {
        save: saveScrollPosition,
        restore: restoreScrollPosition,
        clear: () => {
            sessionStorage.removeItem(CONFIG.STORAGE_KEY);
            log('Memoria de posición borrada', 'warning');
        },
        get: () => sessionStorage.getItem(CONFIG.STORAGE_KEY),
        setDebug: (value) => {
            CONFIG.DEBUG = value;
            log(`Debug ${value ? 'activado' : 'desactivado'}`, 'info');
        }
    };

})();
