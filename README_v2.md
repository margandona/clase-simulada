# JARVIS v2 - Arquitectura Modular de Referencia

## Qué es este archivo

Este documento describe la versión modular en la carpeta `js/`.

Estado actual:
- Está alineada con la narrativa JARVIS.
- Está alineada con la estructura oficial de 4 misiones.
- No es la versión que carga `index.html` hoy.

---

## Cuándo usar esta versión

Usa la arquitectura modular cuando quieras:
- refactorizar `script.js`
- migrar el runtime principal a módulos ES
- separar datos, estado, servicios y UI
- trabajar con GPT en una migración ordenada

---

## Estructura

```text
js/
  app.js
  data/
    messages.js
    missions.js
  models/
    GameState.js
  services/
    ActivityService.js
    AudioService.js
    MessageService.js
    StorageService.js
  ui/
    ActivityRenderer.js
    BackgroundController.js
    CharacterController.js
    ModalController.js
    UIController.js
  utils/
    dom.js
    helpers.js
```

---

## Modelo pedagógico alineado

La referencia modular asume:
- narrativa JARVIS / Stark Industries
- 4 misiones
- progreso por actividades completadas
- diferenciación entre funciones y condiciones
- persistencia local del estado

---

## Relación con el runtime activo

Hoy el proyecto convive en dos capas:

1. Runtime activo:
- `index.html`
- `styles.css`
- `script.js`

2. Runtime modular de referencia:
- `js/`

La recomendación es tomar siempre el runtime activo como fuente de verdad para cambios funcionales inmediatos.

Si el objetivo es reestructurar el proyecto, entonces usa la documentación de arquitectura y la carpeta `js/` como base de trabajo.
