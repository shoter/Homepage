Set-Location app
Write-Output (Get-Location)

$env:CI = "true"
yarn run test

if($? -eq $False) {
    exit 1
}
