# RESUMEN DE LA GAMIFICACION NOVA

## 1) Que es NOVA
NOVA es una experiencia web gamificada para ensenar requerimientos de software (funciones vs condiciones) a estudiantes de primer ano. El estudiante ayuda a una IA varada en orbita terrestre a completar su sistema de requerimientos mediante 6 misiones y 18 actividades.

## 2) Historia (Narrativa)
NOVA era una IA avanzada que fue actualizada sin requerimientos criticos. La nave funciona, pero el sistema central no puede iniciarse. El estudiante debe identificar funciones y condiciones para reconstruir el sistema y permitir el despegue.

## 3) Mecanicas de juego
- Progreso por misiones: 6 misiones, cada una con 3 actividades.
- Puntos: +10 por actividad completada.
- Badges: cada mision muestra un check al completar sus 3 actividades.
- Porcentaje del sistema: progreso global visible en el header.
- Mensajes de NOVA: mensajes contextuales por fase y por actividad.
- Modal de actividades: las actividades se resuelven en un modal reutilizable.
- Persistencia: el estado se guarda en localStorage para continuar despues.
- Responsive: interfaz optimizada para movil y escritorio.
- Accesibilidad: botones grandes, lenguaje claro, UI simple.

## 4) Glosario rapido
- Requerimiento: enunciado que define lo que el sistema debe hacer o cumplir.
- Funcion: accion que el sistema realiza (lo que HACE).
- Condicion: requisito necesario para operar (lo que NECESITA).
- Mision: conjunto de 3 actividades con un objetivo pedagogico.
- Actividad: tarea concreta (quiz, clasificacion, checklist, padlet, etc.).
- Feedback: mensaje inmediato de acierto o error.
- Padlet: muro colaborativo externo para participar con ideas.
- Fase: etapa pedagogica (activacion, exploracion, comprension, aplicacion, colaboracion, cierre).

## 5) Flujo general de uso
1. El docente muestra la historia de NOVA.
2. El estudiante elige una mision y entra a una actividad.
3. Resuelve la actividad en el modal.
4. Recibe feedback y puede marcarla como completada.
5. El progreso se guarda y el sistema avanza de fase.
6. Al completar la mision 6 se dispara la celebracion final.

## 6) Misiones y actividades (detalle funcional)

### Mision 1: Activacion (fase: activation)
Objetivo: conocer a NOVA y activar el sistema.
1. 1a - Quiz: "Quien es NOVA?"
   - Tipo: quiz
   - Accion: seleccionar respuesta correcta.
2. 1b - Activacion en Padlet
   - Tipo: padlet
   - Accion: abrir o interactuar con el Padlet de activacion.
   - Mensaje NOVA al abrir: "Estoy aprendiendo como funcionan los sistemas humanos..."
   - Completar solo despues de interaccion.
3. 1c - Quiz: "Que necesita NOVA?"
   - Tipo: quiz
   - Accion: seleccionar respuesta correcta.

### Mision 2: Explorar Problema (fase: exploration)
Objetivo: identificar el problema del sistema.
1. 2a - Quiz: sistema incompleto
2. 2b - Checklist: tipos de requerimientos faltantes
3. 2c - Quiz: consecuencias de requisitos mal definidos

### Mision 3: Aplicar Conceptos (fase: understanding)
Objetivo: diferenciar funcion vs condicion.
1. 3a - Clasificacion: enviar senales (funcion)
2. 3b - Clasificacion: requerir energia (condicion)
3. 3c - Quiz: diferencia clave entre funcion y condicion

### Mision 4: Reparar Sistema (fase: application)
Objetivo: aplicar clasificacion en casos reales.
1. 4a - Clasificacion: calcular rutas (funcion)
2. 4b - Clasificacion: combustible disponible (condicion)
3. 4c - Clasificacion: transmitir datos (funcion)

### Mision 5: Colaborar (fase: collaborative)
Objetivo: trabajo en equipo y cierre operativo.
1. 5a - Padlet Colaborativo
   - Tipo: padlet
   - Accion: abrir o interactuar con el Padlet colaborativo.
   - Mensaje NOVA al abrir: "Tu idea puede ser la pieza que falta para despegar."
   - Completar solo despues de interaccion.
2. 5b - Checklist: verificacion pre-lanzamiento
3. 5c - Confirmacion: autorizacion de lanzamiento

### Mision 6: Despegar (fase: closure)
Objetivo: confirmar sistema y celebrar.
1. 6a - Verificacion: sistema al 100%
2. 6b - Accion: iniciar despegue (requiere 6a)
3. 6c - Celebracion: cierre automatico

## 7) Padlets y reglas de completado
- Los Padlets se muestran dentro del modal de actividad.
- Se habilita "Marcar como Completada" solo despues de:
  - hacer clic en "Abrir Padlet", o
  - interactuar con el iframe.
- Si el iframe no carga, aparece el boton "Abrir Padlet en nueva ventana".
- La interaccion se guarda en localStorage para no repetir el requisito.

## 8) Donde se configura
- Misiones y actividades: js/data/missions.js (version modular) y script.js (version actual del index).
- Modal reutilizable: index.html
- Logica de actividades: script.js y js/ui/ActivityRenderer.js
- Estilos responsive: styles.css
