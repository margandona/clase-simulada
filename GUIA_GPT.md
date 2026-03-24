# Guía para Trabajar Esta App con GPT

## Resumen listo para pegar

```text
Tengo una app web educativa gamificada hecha con HTML, CSS y JavaScript vanilla.

Nombre del proyecto:
JARVIS - Misión de Reparación Stark Industries

Propósito pedagógico:
Enseña requerimientos de software, especialmente la diferencia entre:
- Función: lo que el sistema hace
- Condición: lo que el sistema necesita para funcionar

Narrativa:
Tony Stark recluta al estudiante para reparar JARVIS. Hace 6 meses una actualización borró los requerimientos del sistema. JARVIS tiene todas sus funciones pero le faltan las CONDICIONES necesarias para ejecutarlas juntas. El estudiante completa 4 misiones (Activación → Exploración → Aplicar Conceptos → Reparar Sistema) para restaurar la Torre Stark. Al finalizar la misión 4, JARVIS se restaura al 100% y aparece la pantalla de celebración.

Documentación narrativa completa:
El archivo HISTORIA_JARVIS_Y_ACTIVIDAD.md documenta el arco completo: historia, voz de JARVIS por actividad, evolución por fase, tipos de actividad y mensajes del panel lateral.

Estructura oficial:
- 4 misiones
- 12 actividades
- tipos de actividad usados: quiz, padlet, checklist, classification
- progreso, medallas y trofeo final
- persistencia en localStorage

Runtime principal real:
- index.html
- styles.css
- script.js

Arquitectura adicional:
- existe una versión modular de referencia en /js
- está alineada con la misma narrativa y 4 misiones
- no es la que carga index.html hoy

Importante:
- trabaja primero sobre la versión activa del runtime
- no cambies el enfoque pedagógico de funciones vs condiciones
- mantén la narrativa JARVIS
- conserva la estructura de 4 misiones salvo que indiques una migración completa
- la clave de localStorage usada por compatibilidad es novaGameState

Necesito que me ayudes a: [AQUÍ VA MI PEDIDO]
```

---

## Qué debe saber GPT

### Fuente principal de verdad

Si GPT tiene que entender cómo funciona realmente la app, debe usar primero:
- `index.html`
- `script.js`
- `styles.css`

### Fuente narrativa y pedagógica

Si GPT necesita entender la historia, la voz de JARVIS, el arco por misión o los mensajes de cada actividad:
- `HISTORIA_JARVIS_Y_ACTIVIDAD.md`

### Fuente secundaria

Si el trabajo es de arquitectura, refactor o migración, agrega además:
- `ARQUITECTURA.md`
- `DOCUMENTACION.md`
- `js/app.js`
- `js/data/missions.js`

---

## Prompt recomendado

```text
Estoy trabajando en una app web educativa gamificada en HTML, CSS y JavaScript vanilla.

Proyecto:
JARVIS - Misión de Reparación Stark Industries

Archivos principales activos:
- index.html
- styles.css
- script.js

Objetivo pedagógico:
Enseñar requerimientos de software, especialmente la diferencia entre funciones y condiciones.

Narrativa:
Hace 6 meses una actualización borró los requerimientos de JARVIS. El hardware funciona; el problema es que el sistema tiene todos sus módulos funcionales pero perdió las CONDICIONES necesarias para coordinarlos. El estudiante completa 4 misiones (Activación, Exploración del Problema, Aplicar Conceptos, Reparar Sistema) para restaurar la Torre Stark. Cada misión desbloquea una medalla; completar la misión 4 desbloquea el trofeo final.

Arco narrativo por fase:
- activation: el estudiante conoce a JARVIS y entiende la crisis
- exploration: analiza por qué un sistema sin reqs queda paralizado
- understanding: aprende a clasificar funciones vs condiciones
- application: clasifica casos reales de Stark Industries

Referencia narrativa completa: HISTORIA_JARVIS_Y_ACTIVIDAD.md

Estructura oficial actual:
- 4 misiones
- 12 actividades
- tipos: quiz, padlet, checklist, classification
- progreso con medallas y trofeo final
- persistencia en localStorage

También existe una arquitectura modular de referencia en /js, pero el index principal no la usa todavía.

Necesito que me ayudes a: [AQUÍ VA EL PEDIDO]

Quiero que tu respuesta:
1. explique brevemente la solución
2. diga qué archivos tocar
3. entregue cambios concretos o código listo para aplicar
4. mantenga la narrativa JARVIS y el enfoque pedagógico
```

---

## Prompts útiles por caso

### 1. Agregar contenido a una misión existente

```text
Quiero mejorar una misión existente de mi app JARVIS.

La app tiene 4 misiones y enseña funciones vs condiciones.
Necesito mejorar la misión [NÚMERO] sin romper la estructura actual.

Quiero que propongas:
- mejores textos pedagógicos
- mejores preguntas
- feedback más claro
- mensajes de JARVIS más coherentes

Trabaja sobre el runtime principal: index.html, styles.css y script.js.
```

### 2. Mejorar UX

```text
Quiero mejorar la experiencia visual y de uso de mi app educativa JARVIS.

No quiero cambiar la lógica pedagógica ni la estructura de 4 misiones.
Solo quiero mejorar:
- jerarquía visual
- claridad de botones
- feedback
- lectura en clase
- experiencia móvil

Indica exactamente qué cambiar en HTML, CSS y JavaScript.
```

### 3. Refactorizar

```text
Quiero refactorizar esta app sin usar frameworks.

Actualmente el runtime principal está en index.html + script.js, pero también existe una arquitectura modular en /js ya alineada al mismo modelo de 4 misiones.

Necesito un plan por etapas para:
- reducir tamaño de script.js
- mover responsabilidades a módulos
- mantener el comportamiento actual
- minimizar riesgos
```

### 5. Preguntas sobre la narrativa, la historia o la voz de JARVIS

```text
Necesito trabajar con la narrativa de mi app educativa JARVIS.

La historia completa y la voz de JARVIS por actividad está documentada en HISTORIA_JARVIS_Y_ACTIVIDAD.md.

Me basaré en ese archivo para hacerte este pedido: [AQUÍ VA EL PEDIDO]

No cambies el arco narrativo (Activación → Exploración → Aplicar Conceptos → Reparar Sistema) ni el final (JARVIS restaurado al 100%).
```

### 4. Crear una nueva guía docente o técnica

```text
Necesito que redactes una guía clara para docentes o desarrolladores a partir de esta app JARVIS.

La estructura oficial es:
- 4 misiones
- 12 actividades
- enfoque en funciones vs condiciones
- narrativa Stark / JARVIS

Quiero un documento breve, ordenado y consistente con el runtime actual.
```

---

## Qué archivos darle a GPT

### Mínimo recomendado

Comparte estos 4:
- `GUIA_GPT.md`
- `index.html`
- `script.js`
- `styles.css`

### Si el pedido involucra narrativa, historia o contenido de actividades

Agrega también:
- `HISTORIA_JARVIS_Y_ACTIVIDAD.md`

### Si el pedido es técnico

Agrega también:
- `README.md`
- `DOCUMENTACION.md`
- `ARQUITECTURA.md`

### Si el pedido es de refactor o migración

Agrega además:
- `js/app.js`
- `js/data/missions.js`
- `js/models/GameState.js`
- `js/services/ActivityService.js`

---

## Resumen ejecutivo de una línea

```text
Actividad gamificada de 80 minutos para clase universitaria: JARVIS (IA de Stark Industries) perdió sus requerimientos en una actualización; los estudiantes completan 4 misiones (12 actividades: quiz, padlet, checklist, classification) para restaurarlo, aprendiendo a distinguir funciones (lo que el sistema HACE) de condiciones (lo que NECESITA para funcionar). Runtime activo: index.html + styles.css + script.js. Narrativa completa en HISTORIA_JARVIS_Y_ACTIVIDAD.md.
```
