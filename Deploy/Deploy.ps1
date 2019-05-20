Set-Location app

yarn build

Set-Location ../Deploy

Set-Location FtpDeployCore
dotnet build

#Goto build location
Set-Location bin\Debug\netcoreapp2.2

Write-Output "User - $($ENV:FTP_USR)"
$Path = Resolve-Path "..\..\..\..\..\app\build\"
#Transfer Files
dotnet .\FtpDeployCore.dll $Path $ENV:FTP_USR $ENV:FTP_PSW