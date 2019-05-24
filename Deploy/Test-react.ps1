Set-Location app
Write-Output (Get-Location)

$env:CI = "true"
yarn run test --passWithNoTests`

if($? -eq $False) {
    exit 1
}
