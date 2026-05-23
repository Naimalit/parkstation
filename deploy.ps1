#!/usr/bin/env pwsh
# Push ndryshimet ne GitHub dhe Vercel automatikisht
# Perdorimi: .\deploy.ps1 "pershkrimi i ndryshimit"

param(
    [Parameter(Mandatory = $false)]
    [string]$Message = "Update Park Station website"
)

$ErrorActionPreference = "Stop"
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"

Set-Location $PSScriptRoot

Write-Host ">> Duke kontrolluar ndryshimet..." -ForegroundColor Cyan
$status = git status --porcelain
if (-not $status) {
    Write-Host ">> Nuk ka ndryshime per te deploy-uar." -ForegroundColor Yellow
    exit 0
}

Write-Host ">> Duke bere commit..." -ForegroundColor Cyan
git add .
$env:GIT_AUTHOR_NAME = "Arif"
$env:GIT_AUTHOR_EMAIL = "arif@parkstation.local"
$env:GIT_COMMITTER_NAME = "Arif"
$env:GIT_COMMITTER_EMAIL = "arif@parkstation.local"
git commit -m $Message

Write-Host ">> Duke bere push ne GitHub..." -ForegroundColor Cyan
git push origin master

Write-Host ">> Duke deploy-uar ne Vercel..." -ForegroundColor Cyan
vercel deploy --prod --yes

Write-Host ""
Write-Host ">> U krye!" -ForegroundColor Green
Write-Host "   GitHub: https://github.com/Naimalit/parkstation"
Write-Host "   Live:   https://parkstation.vercel.app"
