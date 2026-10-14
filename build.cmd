@echo off
chcp 65001 >nul
setlocal
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo Building for production...
node "node_modules\next\dist\bin\next" build
echo Build complete.
endlocal