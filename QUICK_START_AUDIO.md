# ⚡ Quick Start: Audio en NOVA

## Para Estudiantes

### 1. Abre NOVA
```
https://tu-sitio.com/gamificación
```

### 2. Busca el botón 🔊
- Esquina inferior derecha
- Tócalo para activar/desactivar

### 3. Escucha
- **Historia:** 📖 → 🔊 Escuchar
- **Conceptos:** 🧠 → 🔊 Escuchar  
- **Preguntas:** Cada pregunta tiene 🔊

### 4. Controla
- Volumen: Control del navegador
- Velocidad: Menu del navegador
- Pausa: Botón ⏹️

---

## Para Docentes

### Requisitos
- ✅ Navegador moderno (Chrome, Edge, Firefox, Safari)
- ✅ Audio: Speakers o auriculares
- ✅ Conexión internet (para cargar voces)

### Verificación Rápida
1. Abre NOVA
2. Di "Prueba de audio" en la consola (F12)
3. Deberías escuchar sintetizado

### Si no Funciona
1. Revisa volumen (🔊 en navegador)
2. Actualiza página (F5)
3. Intenta otro navegador
4. Revisa GUIA_AUDIO.md

### Activación en Clase
```javascript
// Abrir Historia
document.getElementById('storyBtn').click();

// Reproducir Historia
let btn = document.querySelector('.audio-btn-story');
btn.click();
```

---

## Para Desarrolladores

### Arquitectura
```
AudioService.js
├── Web Speech API (nativa)
├── localStorage (preferencias)
└── callbacks (control

ModalController.js
├── aria-hidden management
├── inert attribute
└── Focus restoration

MessageService.js
├── Auto-speak integration
└── Emoji cleaning

ActivityRenderer.js
└── Audio buttons por pregunta
```

### Inicialización
```javascript
import AudioService from './services/AudioService.js';

// En app.js
this.audioService = new AudioService();

// Pasar a otros servicios
this.modalController = new ModalController(this.audioService);
this.activityRenderer = new ActivityRenderer(this.audioService);
this.messageService.audioService = this.audioService;
```

### Agregar Audio a Nuevo Elemento

```javascript
// 1. Crear botón
const audioBtn = document.createElement('button');
audioBtn.className = 'audio-play-btn';
audioBtn.textContent = '🔊';

// 2. Listener
audioBtn.addEventListener('click', () => {
    const text = "Tu texto aquí";
    if (audioService.isPlaying_status()) {
        audioService.stop();
        audioBtn.textContent = '🔊';
    } else {
        audioService.speak(text, () => {
            audioBtn.textContent = '🔊';
        });
        audioBtn.textContent = '⏹️';
    }
});
```

### Métodos Principales
```javascript
// Reproducir
audioService.speak(text, callback);

// Control
audioService.pause();
audioService.resume();
audioService.stop();

// Preferencias
audioService.toggle();           // On/Off
audioService.setVolume(0-1);
audioService.setRate(0.5-2.0);
audioService.setPitch(0.5-2.0);

// Estatus
audioService.isEnabled();
audioService.isPlaying_status();
audioService.isSupported();
```

### Testing
```javascript
// En consola (F12)

// Test 1: ¿Funciona?
audioService.isSupported()  // true/false

// Test 2: ¿Activado?
audioService.isEnabled()    // true/false

// Test 3: Hablar
audioService.speak("Hola")

// Test 4: Preferencias
audioService.setRate(0.8);
audioService.speak("Más lento");
```

---

## Estructura de Archivos

```
js/
├── services/
│   ├── AudioService.js        ← NUEVO
│   ├── MessageService.js      ← ACTUALIZADO
│   └── ...
├── ui/
│   ├── ModalController.js     ← ACTUALIZADO
│   ├── ActivityRenderer.js    ← ACTUALIZADO
│   └── ...
└── app.js                      ← ACTUALIZADO

Documentación:
├── GUIA_AUDIO.md              ← Para estudiantes
├── GUIA_DOCENTE_AUDIO.md      ← Para docentes
└── QUICK_START_AUDIO.md       ← Este archivo
```

---

## Compatibilidad

| Navegador | Soporte | Notas |
|-----------|---------|-------|
| Chrome 25+ | ✅ Sí | Excelente |
| Edge 79+ | ✅ Sí | Excelente |
| Firefox 49+ | ✅ Sí | Muy Bien |
| Safari 14+ | ✅ Sí | Muy Bien |
| Opera | ✅ Sí | Muy Bien |
| IE 11 | ❌ No | Obsoleto - Usa otro |

---

## Próximas Características

- [ ] Velocidad configurable por docente
- [ ] Más idiomas
- [ ] Voz docente personalizada
- [ ] Análisis de engagement
- [ ] Export de transcripciones

---

## Soporte

| Pregunta | Respuesta |
|----------|-----------|
| ¿Costo? | Gratis - Web Speech API nativa |
| ¿Datos? | No se recolectan - Procesamiento local |
| ¿Offline? | No - Requiere internet para síntesis |
| ¿Privacidad? | Garantizada - Sin servidores terceros |
| ¿WCAG? | WCAG 2.1 AA Compliant |

---

**¿Listo? ¡Comienza a escuchar! 🎧**
