@echo off

set carpeta=C:\Program Files\Apache\Maven

if exist "%carpeta%" (
    robocopy /s "%~dp0\Maven" "%carpeta%"
) else (
    mkdir "%carpeta%"
    robocopy /s "%~dp0\Maven" "%carpeta%"
)
setx path "%path%;%carpeta%\bin" /M