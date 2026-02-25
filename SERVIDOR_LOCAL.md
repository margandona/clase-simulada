# 🌐 Cómo Usar Servidor Local

## ¿Por qué necesito esto?

Los módulos ES6 (`js/app.js`, `js/services/*`, etc.) **NO funcionan** abriendo el HTML directamente por seguridad del navegador. Necesitas un servidor local.

## 🚀 Método 1: Python (Más Simple)

### Si tienes Python 3.x:
```bash
cd "c:\Users\marga\Desktop\clase sto tomas\gamificación"
python -m http.server 8000
```

### Si tienes Python 2.x:
```bash
cd "c:\Users\marga\Desktop\clase sto tomas\gamificación"
python -m SimpleHTTPServer 8000
```

**Luego abre:** http://localhost:8000

---

## 🟢 Método 2: Node.js con serve

### Instalar serve (solo una vez):
```bash
npm install -g serve
```

### Usar:
```bash
cd "c:\Users\marga\Desktop\clase sto tomas\gamificación"
serve -p 8000
```

**Luego abre:** http://localhost:8000

---

## 🔵 Método 3: Live Server (VS Code Extension)

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"
4. Se abre automáticamente en el navegador

---

## 📝 Cambiar entre versiones

### Para usar MÓDULOS ES6 (arquitectura nueva):
En `index.html`, línea final debe ser:
```html
<script type="module" src="js/app.js"></script>
```
**Requiere servidor local** ⚠️

### Para usar SCRIPT ORIGINAL (sin servidor):
En `index.html`, línea final debe ser:
```html
<script src="script.js"></script>
```
**Funciona abriendo directamente** ✅

---

## ✅ Estado Actual

**AHORA MISMO** el proyecto está configurado con `script.js` (versión original) para que funcione sin servidor.

Si quieres usar la arquitectura modular nueva, cambia a `js/app.js` y usa uno de los métodos de servidor local arriba.
