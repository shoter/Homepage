Set-Location app

Write-Output (Get-Location)

echo "Starting tests for react"
# Test react solution
yarn
($env:CI = "true") -and (yarn test)

Set-Location ../Deploy


Set-Location FtpDeployCore.Tests

Write-Output (Get-Location)
echo "Starting tests for C#"

dotnet test

