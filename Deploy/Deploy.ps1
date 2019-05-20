Set-Location app

# Test react solution
($env:CI = "true") -and (yarn test)

yarn build

Set-Location ../Deploy

Set-Location FtpDeployCore.Tests
dotnet test
Set-Location ..

# Build FtpDeployCore

Set-Location FtpDeployCore
dotnet build

#Goto build location
Set-Location bin\Debug\netcoreapp2.2

#Transfer Files
dotnet .\FtpDeployCore.dll "E:\Programowanie\TS\Homepage\app\build" $FTP_USR $FTP_PSW