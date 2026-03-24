# JARVIS - Documentación Técnica y Pedagógica

## Descripción general

JARVIS es una app web educativa gamificada para enseñar requerimientos de software.

Objetivo de aprendizaje:
- comprender qué es una función
- comprender qué es una condición
- distinguir ambos conceptos en ejemplos concretos

Contexto narrativo:
- JARVIS, la IA de Stark Industries, quedó incompleta por pérdida de requerimientos.
- El estudiante actúa como especialista convocado por Tony Stark.
- Cada misión restaura una parte del sistema.

---

## Versión oficial actual

La versión oficial actual usa:
- `index.html`
- `styles.css`
- `script.js`

Esta es la fuente principal para:
- comportamiento real
- experiencia del usuario
- flujo pedagógico
- pruebas manuales

---

## Flujo de la app

### 1. Bienvenida

La app abre con:
- introducción narrativa
- botón para comenzar
- botón de instrucciones
- botón de créditos
- estadísticas rápidas de la sesión

### 2. Tablero principal

Al iniciar, el estudiante ve:
- encabezado con progreso
- personaje JARVIS animado
- bandeja de mensajes
- acceso a historia
- acceso a conceptos clave
- 4 misiones desplegables

### 3. Actividades

Cada misión contiene 3 actividades.

Tipos oficiales usados:
- `quiz`
- `padlet`
- `checklist`
- `classification`

### 4. Cierre

Al completar las 4 misiones:
- se actualizan medallas y trofeo
- se muestra la celebración final
- queda registrado el progreso final

---

## Misiones oficiales

### Misión 1: Activación

Propósito:
- identificar quién es JARVIS
- entender la crisis inicial

### Misión 2: Exploración del Problema

Propósito:
- analizar por qué el sistema falla sin requerimientos
- reconocer tipos de requerimientos faltantes

### Misión 3: Aplicar Conceptos

Propósito:
- distinguir función versus condición
- consolidar el patrón conceptual

### Misión 4: Reparar Sistema

Propósito:
- clasificar casos reales
- cerrar la restauración del sistema

---

## Estado y persistencia

La app mantiene un objeto de estado con datos como:
- actividades completadas
- recompensas
- fase actual
- interacciones de actividad
- medallas obtenidas
- trofeo final

Persistencia:

```text
localStorage key: novaGameState
```

Nota técnica:
- la clave sigue llamándose `novaGameState` por compatibilidad histórica
- el contenido actual pertenece a la versión JARVIS

---

## Gamificación

Mecánicas principales:
- puntos por actividad completada
- badges por misión completada
- medallas por hitos
- trofeo al cerrar las 4 misiones
- mensajes contextuales del personaje
- feedback inmediato en cada validación

---

## Audio y accesibilidad

La app incluye:
- soporte de lectura con Web Speech API
- estructura simple para aula presencial
- navegación directa
- lenguaje breve y guiado
- ayudas visuales y mensajes contextuales

---

## Qué modificar según objetivo

### Si quieres cambiar contenido pedagógico

Edita:
- `script.js`

### Si quieres cambiar estructura visual

Edita:
- `index.html`
- `styles.css`

### Si quieres refactorizar arquitectura

Revisa además:
- `ARQUITECTURA.md`
- `js/`

---

## Estado de coherencia del proyecto

La referencia oficial ya quedó unificada en:
- narrativa JARVIS
- estructura de 4 misiones
- documentación principal consistente

Los documentos históricos de cambios y análisis se conservan como registro, pero no deben tomarse como fuente funcional primaria.
