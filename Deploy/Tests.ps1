Set-Location app

echo Get-Location
echo "Starting tests for react"
# Test react solution
($env:CI = "true") -and (yarn test)

Set-Location ../Deploy


Set-Location FtpDeployCore.Tests

echo Get-Location
echo "Starting tests for C#"

dotnet test

