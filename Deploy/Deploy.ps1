Set-Location app

yarn build

Set-Location ../Deploy

Set-Location FtpDeployCore
dotnet build

#Goto build location
Set-Location bin\Debug\netcoreapp2.2

Write-Output "User - " . $ENV:FTP_USR
#Transfer Files
dotnet .\FtpDeployCore.dll "E:\Programowanie\TS\Homepage\app\build\" $ENV:FTP_USR $ENV:FTP_PSW