Set-Location app

Write-Output (Get-Location)

echo "Starting tests for react"
# Test react solution
$env:CI = "true"
yarn run test

if($? -eq $False) {
    exit 1
}

Set-Location ../Deploy

Set-Location FtpDeployCore.Tests

Write-Output (Get-Location)
echo "Starting tests for C#"
echo $result

dotnet test

