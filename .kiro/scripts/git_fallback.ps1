param (
    [string]$GitCommand
)

# PowerShell script to handle Git commands and avoid Kiro terminal hangs
# Usage: .\.kiro\scripts\git_fallback.ps1 "log --oneline -5"

$startTime = Get-Date

try {
    # Execute Git command with error handling
    $output = & git $GitCommand.Split(' ') 2>&1
    $exitCode = $LASTEXITCODE
    $status = if ($exitCode -eq 0) { "success" } else { "error" }
    
    # Calculate execution time
    $endTime = Get-Date
    $executionTime = ($endTime - $startTime).TotalMilliseconds
    
    # Create log entry
    $logEntry = @{
        timestamp = Get-Date -Format "o"
        command = "git $GitCommand"
        output = $output -join "`n"
        exit_code = $exitCode
        status = $status
        execution_time_ms = $executionTime
        executed_via = "PowerShell_Fallback"
    } | ConvertTo-Json -Compress
    
    # Append to debug log
    Add-Content -Path ".kiro/debug.log" -Value ""
    Add-Content -Path ".kiro/debug.log" -Value "[$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ')] Git command executed via PowerShell fallback"
    Add-Content -Path ".kiro/debug.log" -Value $logEntry
    
    # Output result
    Write-Output $output
    
    if ($exitCode -ne 0) {
        Write-Error "Git command failed with exit code: $exitCode"
        exit $exitCode
    }
}
catch {
    # Handle any PowerShell errors
    $errorLog = @{
        timestamp = Get-Date -Format "o"
        command = "git $GitCommand"
        error = $_.Exception.Message
        status = "powershell_error"
        executed_via = "PowerShell_Fallback"
    } | ConvertTo-Json -Compress
    
    Add-Content -Path ".kiro/debug.log" -Value ""
    Add-Content -Path ".kiro/debug.log" -Value "[$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ')] Git command failed in PowerShell"
    Add-Content -Path ".kiro/debug.log" -Value $errorLog
    
    Write-Error "PowerShell Git fallback failed: $($_.Exception.Message)"
    exit 1
}