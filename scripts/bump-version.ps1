$oldVersion = (Get-Content package.json) -join "`n" | ConvertFrom-Json | Select -ExpandProperty "version"
$oldDate = ($oldVersion -split "-")[0]
$oldPatch = [int]::Parse(($oldVersion -split "-")[1])

$newDate = Get-Date -Format yy.MM.dd
$newPatch = 0

if($oldDate -eq $newDate) {
    $newPatch = $oldPatch + 1
}

# Root

## package.json & package-lock.json

$oldVersionJson = "$oldDate-$oldPatch"
$newVersionJson = "$newDate-$newPatch"

(Get-Content package.json) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII package.json
(Get-Content package-lock.json) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII package-lock.json

git add package.json
git add package-lock.json

# Update SPA

## README.md

$oldVersionMd = "$oldDate--$oldPatch"
$newVersionMd = "$newDate--$newPatch"

(Get-Content text-snippets/ClientApp/README.md) -replace $oldVersionMd, $newVersionMd | Out-File -encoding ASCII text-snippets/ClientApp/README.md

git add text-snippets/ClientApp/README.md

## package.json & package-lock.json

(Get-Content text-snippets/ClientApp/package.json) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII text-snippets/ClientApp/package.json
(Get-Content text-snippets/ClientApp/package-lock.json) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII text-snippets/ClientApp/package-lock.json
(Get-Content text-snippets/ClientApp/tests/unit/app.spec.ts) -replace $oldVersionJson, $newVersionJson | Out-File -encoding ASCII text-snippets/ClientApp/tests/unit/app.spec.ts

git add text-snippets/ClientApp/package.json
git add text-snippets/ClientApp/package-lock.json
git add text-snippets/ClientApp/tests/unit/app.spec.ts

# Update API

## README.md

$oldVersionApi = "$oldDate.$oldPatch"
$newVersionApi = "$newDate.$newPatch"

(Get-Content text-snippets/README.md) -replace $oldVersionApi, $newVersionApi | Out-File -encoding ASCII text-snippets/README.md

git add text-snippets/README.md

## text-snippets.csproj

(Get-Content text-snippets/text-snippets.csproj) -replace $oldVersionApi, $newVersionApi | Out-File -encoding ASCII text-snippets/text-snippets.csproj

git add text-snippets/text-snippets.csproj

# Update API.Test

## text-snippets.Test.csproj

(Get-Content text-snippets.Test/text-snippets.Test.csproj) -replace $oldVersionApi, $newVersionApi | Out-File -encoding ASCII text-snippets.Test/text-snippets.Test.csproj

git add text-snippets.Test/text-snippets.Test.csproj

# Commit

git commit -m "chore: bumps version to $newVersionApi"
