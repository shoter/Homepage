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

echo "Folder - " . $additonalFolder;
echo "Branch - " . $branch;

exit

$Path = Resolve-Path "..\..\..\..\..\app\build"
#Transfer Files
dotnet .\FtpDeployCore.dll "path=$($Path)" "login=$($ENV:FTP_USR)" "pass=$($ENV:FTP_PSW)"