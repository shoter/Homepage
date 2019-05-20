Set-Location app

yarn build

Set-Location ../Deploy

Set-Location FtpDeployCore
dotnet build

#Goto build location
Set-Location bin\Debug\netcoreapp2.2

$Path = Resolve-Path "..\..\..\..\..\app\build\"
Write-Output "User - $($ENV:FTP_USR)"
Write-Output "Path - $($Path)"
#Transfer Files
dotnet .\FtpDeployCore.dll $Path $ENV:FTP_USR $ENV:FTP_PSW