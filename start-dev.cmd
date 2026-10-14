@echo off
chcp 65001 >nul
setlocal
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo Starting development server...
echo Open http://localhost:3000
node "node_modules\next\dist\bin\next" dev
endlocal