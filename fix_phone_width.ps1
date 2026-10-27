$content = Get-Content 'src/app/login/page.tsx'
$output = foreach ($line in $content) {
    if ($line -match 'pl-4 pr-4 py-3\.5') {
        $line -replace 'pl-4 pr-4 py-3\.5', 'w-full pl-4 pr-4 py-3.5'
    } else {
        $line
    }
}
$output | Set-Content 'src/app/login/page.tsx'