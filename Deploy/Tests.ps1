Set-Location app

# Test react solution
($env:CI = "true") -and (yarn test)

Set-Location ../Deploy

Set-Location FtpDeployCore.Tests
dotnet test

