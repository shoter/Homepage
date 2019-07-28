param (
    [Parameter(Mandatory=$true)]
    [string] $branch
)

$additonalFolder = "";

if ($branch -eq "dev") {
    $additonalFolder = "test";
}

Set-Location Deploy
Set-Location FtpDeployCore

#Goto build location
Set-Location bin\Debug\netcoreapp2.2

$Path = Resolve-Path "..\..\..\..\..\app\build"
$RssFile = Resolve-Path "..\..\..\..\..\rss\feed.xml"
#Transfer Files
dotnet .\FtpDeployCore.dll "path=$($Path)" "login=$($ENV:FTP_USR)" "pass=$($ENV:FTP_PSW)" "folder=$($additonalFolder)" "rss=$($RssFile)"