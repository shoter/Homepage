Set-Location Deploy

#Goto build location
Set-Location bin\Debug\netcoreapp2.2

$Path = Resolve-Path "..\..\..\..\..\app\build"
#Transfer Files
dotnet .\FtpDeployCore.dll "path=$($Path)" "login=$($ENV:FTP_USR)" "pass=$($ENV:FTP_PSW)"