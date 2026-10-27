#!/usr/bin/env pwsh
# Script to create desktop shortcuts for installed Steam games
# Steam is expected at: M:\Applications\Steam
# Creates shortcuts to the game's executable .exe files

$steamPath = "M:\Applications\Steam\steamapps\common"
$desktop = (Get-Item "$env:USERPROFILE\Desktop")
$shell = New-Object -ComObject WScript.Shell

$games = Get-ChildItem -Path $steamPath

foreach ($game in $games) {
    # Skip non-directory entries (like .acf files)
    if (-not $game.PSIsContainer) {
        continue
    }
    
    $shortcutPath = Join-Path $desktop.FullName ($game.Name + ".lnk")
    
    # Check if shortcut already exists
    if (Test-Path $shortcutPath) {
        Write-Host "Shortcut already exists for: $($game.Name)"
        continue
    }
    
    # Find the .exe file within the game folder
    $exeFiles = Get-ChildItem -Path $game.FullName -Filter "*.exe" -Recurse
    
    if ($exeFiles.Count -eq 0) {
        Write-Host "No .exe found for: $($game.Name), using folder shortcut"
        # Fall back to folder shortcut
        $shortcut = $shell.CreateShortcut($shortcutPath)
        $shortcut.TargetPath = $game.FullName
        $shortcut.WorkingDirectory = $game.FullName
        $shortcut.Save()
    } elseif ($exeFiles.Count -eq 1) {
        # Create shortcut to the single .exe found
        $shortcut = $shell.CreateShortcut($shortcutPath)
        $shortcut.TargetPath = $exeFiles.FullName
        $shortcut.WorkingDirectory = $game.FullName
        $shortcut.Save()
        Write-Host "Created shortcut for: $($game.Name) -> $($exeFiles.Name)"
    } else {
        # Create shortcut to the first .exe (usually the main game launcher)
        $shortcut = $shell.CreateShortcut($shortcutPath)
        $shortcut.TargetPath = $exeFiles[0].FullName
        $shortcut.WorkingDirectory = $game.FullName
        $shortcut.Save()
        Write-Host "Created shortcut for: $($game.Name) -> $($exeFiles[0].Name) (selected from $($exeFiles.Count) exe(s))"
    }
}

Write-Host "Done! Steam game shortcuts created on desktop."