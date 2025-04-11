@echo off   

set "carpeta=C:\Program Files\Apache\Maven"

:: Verificar si Java está instalado
echo Verificando version de Java...
java -version >nul 2>&1

if %errorlevel% equ 0 (
    echo Java está instalado en el sistema.

    if exist "%carpeta%" (
        robocopy "%~dp0\Maven" "%carpeta%" /s
    ) else (
        mkdir "%carpeta%"
        robocopy "%~dp0\Maven" "%carpeta%" /s 
    )
    setx path "%path%;%carpeta%\bin"
) else (
    echo Java no esta instalado. Porfavor instala la version 21 o superior.
    echo Puedes instalarlo desde aqui: https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.exe
    pause
)