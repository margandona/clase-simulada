@echo off
echo ====================================
echo    NOVA - Servidor Local
echo ====================================
echo.
echo Iniciando servidor en puerto 8000...
echo Abre tu navegador en: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo ====================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause
