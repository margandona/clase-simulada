# JARVIS - Misión de Reparación Stark Industries

## Resumen

Esta app es una experiencia educativa gamificada para enseñar requerimientos de software a estudiantes de primer año.

Tema central:
- Función: lo que el sistema hace
- Condición: lo que el sistema necesita para funcionar

Narrativa:
- Tony Stark recluta al estudiante para reparar JARVIS.
- JARVIS conserva sus módulos, pero perdió requerimientos clave.
- El estudiante avanza completando 4 misiones y restaura el sistema.

Duración estimada:
- 20 minutos

Estructura oficial:
- 4 misiones
- 12 actividades
- 4 medallas
- 1 trofeo final

---

## Runtime oficial

La versión principal que hoy corre es:
- index.html
- styles.css
- script.js

Importante:
- `index.html` carga `script.js` directamente.
- La carpeta `js/` contiene una arquitectura modular alineada con JARVIS y 4 misiones, pero no es el runtime activo del index principal.

---

## Misiones

| Misión | Fase | Objetivo |
|---|---|---|
| 1. Activación | activation | Conocer a JARVIS y entender la crisis |
| 2. Exploración del Problema | exploration | Detectar por qué un sistema sin requerimientos falla |
| 3. Aplicar Conceptos | understanding | Diferenciar función vs condición |
| 4. Reparar Sistema | application | Clasificar casos y restaurar JARVIS |

---

## Tipos de actividad usados

La experiencia oficial usa estos tipos:
- quiz
- padlet
- checklist
- classification

---

## Inicio rápido

### Abrir localmente

Abre `index.html` en el navegador.

### Servidor local opcional

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

---

## Persistencia

El progreso se guarda en `localStorage` con la clave:

```text
novaGameState
```

Nota:
- El nombre de la clave es legacy.
- Se mantiene para no romper progreso guardado previamente.

---

## Archivos importantes

- `index.html`: estructura visual principal
- `styles.css`: diseño y responsive
- `script.js`: lógica activa del juego
- `GUIA_GPT.md`: resumen y prompt listo para trabajar con GPT
- `DOCUMENTACION.md`: documentación técnica y pedagógica del runtime actual
- `ARQUITECTURA.md`: relación entre runtime activo y versión modular
- `CUSTOMIZATION_GUIDE.md`: cambios frecuentes para docentes

---

## Documentos recomendados para GPT

Si quieres que GPT entienda la app sin perder contexto, comparte estos archivos:
- `GUIA_GPT.md`
- `index.html`
- `script.js`
- `styles.css`

Si además le vas a pedir refactor o arquitectura, agrega:
- `DOCUMENTACION.md`
- `ARQUITECTURA.md`
- `js/app.js`
- `js/data/missions.js`
